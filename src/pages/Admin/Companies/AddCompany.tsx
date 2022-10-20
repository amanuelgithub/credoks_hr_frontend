import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AttachFiles from "../../../components/AttachFiles/AttachFiles";

function AddCompany() {
  return (
    // <div className="h-screen">
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box className="flex flex-col items-center my-6">
        <Typography variant="h4" component="h4" className="underline">
          Add Company
        </Typography>
      </Box>

      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={4} lg={5}>
          {/* Name */}
          <TextField
            margin="dense"
            fullWidth
            id="name"
            label="Name"
            size="small"
          />

          {/* status */}
          {/* <TextField
            margin="dense"
            fullWidth
            id="firstName"
            label="First Name"
            size="small"
          /> */}

          {/* Summary: Description */}
          <TextField
            margin="dense"
            fullWidth
            multiline
            rows={5}
            id="summary"
            label="Company Description"
            size="small"
          />
          <Button size="small" variant="contained">
            Create Company
          </Button>
        </Grid>

        <Grid item xs={12} md={8} lg={5}>
          <AttachFiles />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddCompany;
