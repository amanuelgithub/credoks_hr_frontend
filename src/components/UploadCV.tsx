import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUploadCVMutation } from "../services/employeeApiSlice";
import { errorToast, successToast } from "../utils/toastify";

let cvType: File;

function UploadCV({ employeeId }: { employeeId: string }) {
  const [cv, setCV] = useState(cvType);
  const [uploadCV, { isSuccess: cvUploaded, isError: cvUploadError }] =
    useUploadCVMutation();

  const handleCVSelection = (event: any) => {
    setCV(event.target.files[0]);
  };

  const handleCVUpload = async (event: any) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("file", cv);

    try {
      await uploadCV({
        id: employeeId,
        file: fd,
      }).unwrap();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (cvUploaded) {
      successToast("CV uploaded successfully");
    }

    if (cvUploadError) {
      errorToast("CV upload error");
    }
  }, [cvUploaded, cvUploadError]);

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleCVUpload}
      marginY={3}
      className="flex justify-between gap-1"
    >
      <input type="file" id="cv" name="cv" onChange={handleCVSelection} />

      <Button size="small" variant="contained" color="secondary" type="submit">
        Upload CV
      </Button>
    </Box>
  );
}

export default UploadCV;
