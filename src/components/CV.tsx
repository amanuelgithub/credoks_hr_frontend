import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import UploadCV from "./UploadCV";

function CV({
  employeeId,
  cv,
  to,
}: {
  employeeId: string | undefined;
  cv: string | undefined;
  to: string;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        position: "relative",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div className="pr-4 border-r-2 border-gray-400">
        <UploadCV employeeId={employeeId ?? ""} />
      </div>

      <div>
        {cv ? (
          <div className="flex justify-between items-center gap-16">
            <div>
              {cv.length > 15 ? (
                <div>
                  <div>{`${cv.slice(0, 15)}...pdf`}</div>
                </div>
              ) : (
                cv
              )}
            </div>
            <div className="bg-yellow-500 px-8 py-1 rounded-full border border-gray-300 text-white">
              <Link to={`${to}/${cv}`}>View CV</Link>
              {/* <Link to={`/hr-dashboard/employees/cv/${cv}`}>View CV</Link> */}
            </div>
          </div>
        ) : (
          "No CV"
        )}
      </div>
    </Paper>
  );
}

export default CV;
