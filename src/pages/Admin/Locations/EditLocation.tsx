import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Field, Formik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
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
import { countryList } from "../../../utils/constants/countryList";
import { ethiopianCitiesList } from "../../../utils/constants/ethiopianCitiesList";

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
  height: "95%",
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
  const [updateLocation, { isLoading, isSuccess, isError }] =
    useUpdateLocationMutation();

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
              <Box className="flex justify-end">
                <IconButton size="small" onClick={handleCloseModal}>
                  <CloseIcon sx={{ fontSize: "36px", color: "gray" }} />
                </IconButton>
              </Box>
              <Box className="flex flex-col items-center my-6">
                <Typography variant="h4" component="h4" className="underline">
                  Edit Location
                </Typography>
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
                  handleChange,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box>
                      <Divider sx={{ my: 3 }} />

                      {/* Country List */}
                      <Autocomplete
                        options={countryList}
                        defaultValue={(() => {
                          const val = countryList.find(
                            (country) => country === values.country
                          );
                          return val !== undefined ? val : "";
                        })()}
                        onChange={(e, value) => {
                          console.log(value);

                          setFieldValue(
                            "country",
                            value !== null ? value : location.country
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin="normal"
                            name="country"
                            label="Country"
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
