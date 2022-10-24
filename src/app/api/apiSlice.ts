import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";
import { RootState } from "../store";

/** base query with Authorization Bearer token using the `access_token` */
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;

    if (access_token) headers.set("Authorization", `Bearer ${access_token}`);

    return headers;
  },
});

/** base query with Authorization Bearer token using the `refresh_token` */
const baseQueryForRefresh = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const refresh_token = (getState() as RootState).auth.refresh_token;

    if (refresh_token) headers.set("Authorization", `Bearer ${refresh_token}`);

    return headers;
  },
});

/**
 * This method request for a new {access_token and refresh_token} when the `access_token` expires.
 * And remove the {access_token and refresh_token} when the `refresh_token` time expires.
 */
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQueryForRefresh(
      { ...args, url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    console.log("refresh token result: ", refreshResult);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.access_token;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// This is the base apiSlice that will be extended by other api-service-slices.
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["Company"],
});
