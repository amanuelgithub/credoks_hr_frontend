import { Avatar, Button, Grid, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ICompany } from "../../../models/ICompany";
import {
  useGetCompaniesQuery,
  useUploadCompanyLogoMutation,
} from "../../../services/companyApiSlice";
import { successToast } from "../../../utils/toastify";

let logoImageType: File;

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function UploadCompanyLogo() {
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<
    ICompany | undefined
  >();

  const [logo, setLogo] = useState(logoImageType);
  const [logoFileURL, setLogoFileURL] = useState<string | ArrayBuffer>();

  const {
    data: companies,
    isLoading,
    isError,
    isSuccess,
  } = useGetCompaniesQuery();

  const [uploadCompanyLogo, { isSuccess: uploadSuccess }] =
    useUploadCompanyLogoMutation();

  useEffect(() => {
    const company =
      companies &&
      companies.find((company) => company.name === selectedCompanyName);

    setSelectedCompany(company);

    console.log("company name", selectedCompanyName);
  }, [selectedCompanyName]);

  useEffect(() => {
    console.log("company selected", selectedCompany);
  }, [selectedCompany]);

  useEffect(() => {
    console.log("logo: ", logo);

    let fileReader: FileReader;
    let isCancel = false;

    if (logo) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result && !isCancel) {
          setLogoFileURL(result);
        }
      };
      fileReader.readAsDataURL(logo);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [logo]);

  useEffect(() => {
    if (uploadSuccess) {
      successToast("Company Logo uploaded successfully");

      setLogo(logoImageType);
      setLogoFileURL("");
      setSelectedCompany(undefined);
      setSelectedCompanyName("");
    }
  }, [uploadSuccess]);

  const handleChangeLogoImageSelection = (event: any) => {
    const file = event.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }

    setLogo(event.target.files[0]);
  };

  const handleLogoSubmit = async (event: any) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("file", logo);
    // console.log("uploading....", fd);
    try {
      selectedCompany?.id &&
        (await uploadCompanyLogo({
          companyId: selectedCompany.id,
          file: fd,
        }).unwrap());
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ToastContainer />

      <Box>
        <Autocomplete
          freeSolo
          onChange={(event: any, value: any) =>
            setSelectedCompanyName(value || "")
          }
          disableClearable
          options={companies ? companies.map((option) => option.name) : []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search company"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />

        {selectedCompanyName !== "" && (
          <Grid container spacing={2} sx={{ marginY: 4 }}>
            <Grid item xs={10} md={6} lg={5}>
              <Box
                component="form"
                encType="multipart/form-data"
                onSubmit={handleLogoSubmit}
              >
                <input
                  type="file"
                  id="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChangeLogoImageSelection}
                />

                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={10}
              md={4}
              lg={5}
              sx={{
                padding: 2,
                border: "1px solid lightgrey",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {logoFileURL ? (
                <Avatar
                  src={logoFileURL.toString()}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar sx={{ width: 100, height: 100 }} />
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default UploadCompanyLogo;
