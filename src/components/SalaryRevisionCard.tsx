import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { useGetEmployeeQuery } from "../services/employeeApiSlice";
import { ISalaryRevision } from "../models/ISalaryRevision";

type Props = {
  salaryRevision: ISalaryRevision | undefined;
  onCloseSalaryRevisionCard: () => void;
};

function RevisionFieldRow({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className={"font-semibold text-gray-600 mt-1"}>{title}</p>
      <p className={"text-xs my-1"}>{value}</p>
    </div>
  );
}

export default function SalaryRevisionCard(props: Props) {
  const { data: employee, isSuccess } = useGetEmployeeQuery(
    props.salaryRevision?.employeeId
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("Employee: ", employee);
    }
  }, [isSuccess]);

  return (
    <>
      {props.salaryRevision && (
        <div className={`p-2 `}>
          <div className={"flex justify-between items-center mb-8"}>
            <h2 className={"text-lg font-semibold underline"}>
              Salary Revision Info
            </h2>

            <IconButton
              size="small"
              sx={{ border: "1px solid gray" }}
              onClick={props.onCloseSalaryRevisionCard}
            >
              <CloseIcon sx={{ fontSize: 12, color: "gray" }} />
            </IconButton>
          </div>

          <Divider sx={{ my: 2 }} />

          <div>
            <RevisionFieldRow
              title={"# Salary Revision ID"}
              value={`${props?.salaryRevision?.id}`}
            />
            <RevisionFieldRow
              title={"# Employee ID"}
              value={`${props?.salaryRevision?.employeeId}`}
            />
            <RevisionFieldRow
              title={"# Maker Employee ID"}
              value={`${props?.salaryRevision?.makerEmployeeId}`}
            />

            <RevisionFieldRow
              title={"# Checker Employee ID"}
              value={`${props?.salaryRevision?.checkerEmployeeId}`}
            />
            <RevisionFieldRow
              title={"# Revision Salary Amount"}
              value={`${props?.salaryRevision?.newSalary} Birr`}
            />

            <div className={"border border-gray-300 p-1 my-1"}>
              <p className={"font-semibold text-gray-600 mt-1"}>
                # Reason For Revision
              </p>

              <Divider sx={{ mb: 2 }} />

              <p className={"text-xs my-1"}>
                {props?.salaryRevision?.reasonForRevision}
              </p>
            </div>

            <div className={"border border-gray-300 p-1 my-1"}>
              <p className={"font-semibold text-gray-600 mt-1"}>
                # Other Comments
              </p>

              <Divider sx={{ mb: 2 }} />

              <p className={"text-xs my-1"}>
                {props?.salaryRevision?.comments}
              </p>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />
          {/*  Employee related information */}
          {employee && (
            <div>
              <RevisionFieldRow
                title={"Name: "}
                value={`${employee.firstName} ${employee.fatherName}`}
              />
              <RevisionFieldRow title={"Email: "} value={`${employee.email}`} />

              <RevisionFieldRow title={"Phone: "} value={`${employee.phone}`} />
              <RevisionFieldRow
                title={"Name: "}
                value={`${employee.firstName} ${employee.fatherName}`}
              />
              <RevisionFieldRow
                title={"Current Salary Amount: "}
                value={`${employee.salary} Birr`}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
