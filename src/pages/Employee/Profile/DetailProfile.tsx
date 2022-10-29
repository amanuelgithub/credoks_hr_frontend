import { Divider, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../../app/hooks";
import { useGetEmployeeQuery } from "../../../services/employeeApiSlice";

const Field = ({
  label,
  value,
  valueColor = false,
}: {
  label: string;
  value: string;
  valueColor?: boolean;
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={13} md={4} lg={2}>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={13} md={8} lg={8}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: "bold",
            my: 1,
            color: `${valueColor ? "secondary.main" : "inherit"}`,
          }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

function DetailProfile({
  editing,
  handleEditing,
}: {
  editing: boolean;
  handleEditing: (editing: boolean) => void;
}) {
  const id = useAppSelector((state) => state.auth.sub);
  const { data } = useGetEmployeeQuery(id);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={4} lg={3}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwJHG26g64Au5_oTq1cCIJEkkCqQEkrJNKHhgUDEVT38Uy9wUgeSAp5JoLYN1J1gbydM&usqp=CAU"
          alt="Live from space album cover"
        />

        <Divider sx={{ my: 2 }} />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ color: "gray", p: 2 }}>
        <Box className="flex justify-between items-center">
          <Box className="flex gap-2 items-baseline">
            <Box>
              <Typography
                sx={{ fontWeight: "bold", color: "gray", fontSize: 18 }}
              >
                {/* Amanuel Girma */}
                {data?.firstName ?? "Null"} {data?.lastName ?? "Null"}
              </Typography>
              <Typography sx={{ fontSize: 10, color: "secondary.main" }}>
                Software Developer
              </Typography>
            </Box>
            <Box>
              <Box
                className="flex items-baseline gap-1"
                sx={{ fontSize: 8, color: "lightgray" }}
              >
                <LocationOnIcon sx={{ fontSize: 14, color: "lightgray" }} />
                <Typography sx={{ fontSize: 10, color: "lightgray" }}>
                  Ethiopia, Addis Ababa.
                </Typography>
              </Box>
            </Box>
          </Box>

          <IconButton
            onClick={() => handleEditing(!editing)}
            sx={editing ? { display: "none" } : { display: "block" }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box className="mt-12 flex items-baseline gap-1">
          <Typography>Employment Status:</Typography>
          <Typography
            sx={{
              color: "success.main",
              bgcolor: "white",
              textAlign: "center",
              px: 0.5,
            }}
          >
            {/* Permanent */}
            {data?.status ?? "Null"}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ my: 6 }}>
          {/* Contact Information  */}
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: "bold",
                color: "lightgray",
                my: 1,
              }}
            >
              CONTACT INFORMATION
            </Typography>

            {/* phone */}
            <Field label="Phone" value={data?.phone ?? "Null"} valueColor />

            {/* email */}
            <Field label="Email" value={data?.email ?? "Null"} valueColor />
          </Box>

          {/* Basic Information */}
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: "bold",
                color: "lightgray",
                my: 1,
              }}
            >
              BASIC INFORMATION
            </Typography>

            <Box>
              <Field label="Gender" value={data?.gender ?? "Null"} />
              <Field
                label="Date of Birth"
                value={data?.dateOfBirth ?? "Null"}
              />
              <Field
                label="Emergency Contact Name"
                value={data?.emergencyContactName ?? "Null"}
              />
              <Field
                label="Emergency Contact Number"
                value={data?.emergencyContactNumber ?? "Null"}
              />
              <Field label="Spouse Name " value={data?.spouseName ?? "Null"} />
            </Box>
          </Box>

          {/* Payment Information */}
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: "bold",
                color: "lightgray",
                my: 1,
              }}
            >
              PAYMENT INFO
            </Typography>

            <Box>
              <Field label="Bank Name" value={data?.bankName ?? "Null"} />
              <Field
                label="Account Number"
                value={data?.accountNumber ?? "Null"}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailProfile;
