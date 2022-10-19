import React from "react";
import { MdClose } from "react-icons/md";

function DetailEmployee({
  showOpenDetail,
  employeeId,
}: {
  showOpenDetail: any;
  employeeId: string;
}) {
  return (
    <div className="bg-white my-5 px-4 py-8">
      <div className="flex justify-between items-start ">
        <h1 className="my-8 text-lg font-bold ">
          Employee Detail for ID ={" "}
          <span className="underline">{employeeId}0987654</span>
        </h1>
        <button
          onClick={() => showOpenDetail(false)}
          className="rounded-full border border-gray-300 p-2 hover:border-yellow-900"
        >
          <MdClose />
        </button>
      </div>
      <div>
        <span>First Name: {"Amanuel"}</span>
      </div>
    </div>
  );
}

export default DetailEmployee;
