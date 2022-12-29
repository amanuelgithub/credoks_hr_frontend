import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";
import { errorToast, successToast } from "../../../utils/toastify";
import Button from "@mui/material/Button";
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";
import { ICompany } from "../../../models/ICompany";
import { ILocation } from "../../../models/ILocation";
import {
  useGetLocationQuery,
  useUpdateLocationMutation,
} from "../../../services/locationApiSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { countryList } from "../../../data/countryList";
import { ethiopianCitiesList } from "../../../data/ethiopianCitiesList";
import { regionList } from "../../../data/regionLists";

let initialCompanies: ICompany[] = [];

const validationSchema = yup.object({
  city: yup.string().required(),
  country: yup.string().required(),
  specificLocationName: yup.string().required(),
  companyId: yup.string().required(),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function EditLocation({
  id,
  openModal,
  handleCloseModal,
}: {
  id: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const { data: location } = useGetLocationQuery(id);
  const [updateLocation, { isSuccess, isError }] = useUpdateLocationMutation();

  const [companies, setCompanies] = useState(initialCompanies);
  const { data: fetchedCompanies } = useGetCompaniesQuery();

  const handleSubmit = async (values: ILocation) => {
    try {
      await updateLocation(values).unwrap();
      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (fetchedCompanies !== undefined) {
      let companies = fetchedCompanies !== undefined ? fetchedCompanies : [];
      setCompanies(companies);
    }

    return () => {
      setCompanies(initialCompanies);
    };
  }, [fetchedCompanies]);

  useEffect(() => {
    if (isSuccess) successToast("Successfully Updated Department.");
    else if (isError) errorToast("Error in updating Department.");
  }, [isSuccess, isError]);

  return (
    <>
      {location && (
        <>
          <ToastContainer />

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box className="flex justify-between mb-10">
                <Box />
                <Typography variant="h5" className="underline">
                  Edit Location
                </Typography>
                <IconButton size="small" onClick={handleCloseModal}>
                  <CloseIcon sx={{ color: "gray" }} />
                </IconButton>
              </Box>
              <Formik
                initialValues={location}
                validationSchema={validationSchema}
                onSubmit={(values: ILocation, { setSubmitting }) => {
                  setSubmitting(true);
                  handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box>
                      <Divider sx={{ my: 3 }} />

                      {/* region List */}
                      <Autocomplete
                        options={regionList}
                        defaultValue={(() => {
                          const val = regionList.find(
                            (region) => region === values.region
                          );
                          return val !== undefined ? val : "";
                        })()}
                        onChange={(e, value) => {
                          console.log(value);

                          setFieldValue(
                            "region",
                            value !== null ? value : location.region
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin="normal"
                            name="region"
                            label="Region"
                            {...params}
                          />
                        )}
                      />

                      {/* Ethiopian Cities List */}
                      <Autocomplete
                        options={ethiopianCitiesList}
                        defaultValue={(() => {
                          const val = ethiopianCitiesList.find(
                            (city) => city === values.city
                          );
                          return val;
                        })()}
                        onChange={(e, value) => {
                          console.log(value);
                          setFieldValue(
                            "city",
                            value !== null ? value : location.city
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin="normal"
                            name="city"
                            label="City"
                            {...params}
                          />
                        )}
                      />

                      {/* woreda */}
                      <Field
                        name="woreda"
                        margin="dense"
                        fullWidth
                        label="Woreda"
                        type="text"
                        size="small"
                        as={TextField}
                        error={touched.woreda && Boolean(errors.woreda)}
                        helperText={touched.woreda && errors.woreda}
                      />

                      {/* Specific Location Name */}
                      <Field
                        name="specificLocationName"
                        margin="dense"
                        fullWidth
                        label="Specific Location Name"
                        type="text"
                        size="small"
                        as={TextField}
                        error={
                          touched.specificLocationName &&
                          Boolean(errors.specificLocationName)
                        }
                        helperText={
                          touched.specificLocationName &&
                          errors.specificLocationName
                        }
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        size="small"
                      >
                        Edit Location
                      </Button>

                      {/* <div>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                      </div> */}
                    </Box>
                  </Box>
                )}
              </Formik>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditLocation;
