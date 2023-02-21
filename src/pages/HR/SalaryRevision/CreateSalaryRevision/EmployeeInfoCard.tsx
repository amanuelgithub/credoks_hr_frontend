import { IEmployee } from "../../../../models/IEmployee";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import { Link } from "react-router-dom";
import React from "react";

export default function EmployeeInfoCard({
  employee,
}: {
  employee: IEmployee;
}) {
  return (
    <div className="bg-white p-8 my-4 sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-6">
        <ProfileAvatar
          profileImage={`${employee?.profileImage}`}
          width={60}
          height={60}
        />
        <h3>
          {employee?.firstName} {employee?.fatherName}
        </h3>
      </div>

      <p>
        <span className="font-bold">Phone: </span>
        {employee?.phone}
      </p>
      <p>
        <span className="font-bold">Email: </span>
        {employee?.email}
      </p>

      <Link
        to={`/hr-dashboard/salary-revision/${employee?.id}/salary-revisions`}
        className="text-blue-400 underline hover:text-blue-500 text-sm"
      >
        view salary revisions
      </Link>
    </div>
  );
}
