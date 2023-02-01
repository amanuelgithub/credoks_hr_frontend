import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="px-2 py-1 my-1 text-sm bg-white rounded-full">
      {/* <div>{useBreadCrumb.map(({ breadcrumb }) => breadcrumb)}</div> */}
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <span key={match.pathname}>
          <NavLink
            to={match.pathname}
            className="text-yellow-800 hover:underline"
          >
            <ArrowForwardIosIcon
              sx={{ width: 14, height: 14, color: "secondary.main" }}
            />

            {breadcrumb}
          </NavLink>
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
