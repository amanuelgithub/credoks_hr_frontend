import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <div className="absolute top-1/3 left-1/2 z-50  py-2 px-4 rounded-full">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loading;
