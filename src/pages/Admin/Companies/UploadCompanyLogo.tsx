import React from "react";
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";

function UploadCompanyLogo() {
  const {
    data: companies,
    isLoading,
    isError,
    isSuccess,
  } = useGetCompaniesQuery();

  return (
    <div>
      <div>some</div>
    </div>
  );
}

export default UploadCompanyLogo;
