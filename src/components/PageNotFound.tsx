import React from "react";
import Button from "./ui/Button/Button";

function PageNotFound() {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div>
        <div className="flex justify-center gap-10">
          <h1 className="text-6xl font-bold text-yellow-600 py-3">404</h1>
          <div className="border-r-2 border-gray-200"></div>
          <div>
            <p className="text-6xl font-bold text-yellow-600 py-3">
              Page Not Found
            </p>
            <p className="py-3">
              Please check the URL in the address bar and try again
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <div></div>
          <Button>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
