import React from "react";

function Select({ label, children }: { label: any; children: any }) {
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor="exampleFormControlInput4"
        className="form-label inline-block mb-2 text-gray-700 text-sm"
      >
        {label}
      </label>
      <select
        className="form-select form-select-sm
    appearance-none
    block
    w-full
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label=".form-select-sm example"
      >
        {children}
        {/* <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}
      </select>
    </div>
  );
}

export default Select;
