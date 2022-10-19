import React from "react";
import AttachFiles from "../../../components/AttachFiles/AttachFiles";
import Input from "../../../components/form/Input/Input";
import Button from "../../../components/ui/Button/Button";

function AddCompany() {
  return (
    <div className="h-screen">
      <div className="flex justify-center gap-32 pt-10">
        <div>
          <div className="font-bold text-lg pb-10">
            <h1 className="underline">Add Company</h1>
          </div>
          <div>
            <Input type="text" label="Name" placeholder="Company Name" />
            <Input type="text" label="Location" placeholder="Name" />
            <Input type="text" label="Company Log" placeholder="Company Name" />

            <Button>Add Company</Button>
          </div>
        </div>

        <div className="py-16">
          <AttachFiles />
        </div>
      </div>
    </div>
  );
}

export default AddCompany;
