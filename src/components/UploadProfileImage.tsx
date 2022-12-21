import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUploadProfileImageMutation } from "../services/employeeApiSlice";
import { errorToast, successToast } from "../utils/toastify";

let profileImageType: File;

function UploadProfileImage({ employeeId }: { employeeId: string }) {
  const [profileImage, setProfileImage] = useState(profileImageType);
  const [
    uploadProfileImage,
    { isSuccess: profileUploaded, isError: profileUploadError },
  ] = useUploadProfileImageMutation();

  const handleProfileImageSelection = (event: any) => {
    setProfileImage(event.target.files[0]);
  };

  const handleProfileImageSubmit = async (event: any) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("file", profileImage);

    try {
      await uploadProfileImage({
        id: employeeId,
        file: fd,
      }).unwrap();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (profileUploaded) {
      successToast("Profile uploaded successfully");
    }

    if (profileUploadError) {
      errorToast("Profile upload error");
    }
  }, [profileUploaded, profileUploadError]);

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleProfileImageSubmit}
      marginY={3}
      className="flex justify-center gap-1"
    >
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        onChange={handleProfileImageSelection}
      />

      <Button size="small" variant="contained" color="secondary" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default UploadProfileImage;
