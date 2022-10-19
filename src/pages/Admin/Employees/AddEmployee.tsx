import React from "react";
import DataPicker from "../../../components/form/DatePicker/DataPicker";
import Input from "../../../components/form/Input/Input";
import Radio from "../../../components/form/Radio/Radio";
import Select from "../../../components/form/Select/Select";
import Button from "../../../components/ui/Button/Button";

function AddEmployee() {
  return (
    <div>
      <div className="flex justify-evenly gap-36 px-5">
        <div>
          <div className="px-5 py-12 font-bold text-lg">
            <h1 className="underline">Add Employee</h1>
            <h3>
              Step 1. <span>Basic Informations:</span>
            </h3>
          </div>
          <Input type="text" label="First Name" placeholder="First Name" />
          <Input type="text" label="Last Name" placeholder="Last Name" />
          <Input type="email" label="Email" placeholder="Email" />
          <Input type="phone" label="Phone" placeholder="Phone" />

          <div>
            <Input type="password" label="Password" placeholder="Password" />
            <div className="flex justify-between">
              <Button>Generate Password</Button>
              <p>afka24343!@#4</p>
            </div>
          </div>

          <div className="mb-3 xl:w-96">
            <label
              htmlFor="exampleFormControlInput4"
              className="form-label inline-block mb-2 text-gray-700 text-sm"
            >
              Gender
            </label>
            <div>
              <Radio
                id={"male"}
                name={"gender"}
                label={"Male"}
                checked={true}
              />
              <Radio
                id={"female"}
                name={"gender"}
                label={"Female"}
                checked={true}
              />
            </div>
          </div>

          <DataPicker label="Select Date of Joining" />

          <Select label="Select Employee Status">
            <option selected value="1">
              Permanent
            </option>
            <option value="2">Contaract</option>
            <option value="3">Manual</option>
          </Select>

          <DataPicker label="Confirmation Date" />

          <Input type="text" label="Father Name" placeholder="Father Name" />
          <Input type="text" label="Spouse Name" placeholder="Spouse Name" />
        </div>
        <div>
          <div className="px-5 py-16 font-bold text-lg">
            <h3 className="py-2">
              Step 2. <span>Payment Method:</span>
            </h3>
          </div>

          <Select label="Select Payment Method">
            <option selected value="1">
              Bank Transfer
            </option>
            <option value="2">Cash</option>
          </Select>
          <Input
            type="number"
            label="Accound Number"
            placeholder="Accound Number"
          />
          <Input type="number" label="TIN Number" placeholder="TIN Number" />
          <Button>Add Employee</Button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
