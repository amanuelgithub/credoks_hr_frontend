import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function NewStatsCard() {
  return (
    <Paper
      sx={{
        width: "390px",
        paddingY: 1,
        paddingX: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "14px" }}>New Employees</Typography>
        <Typography className="text-green-400">+10%</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "bolder", fontSize: "28px" }}>
          10
        </Typography>
        <div className="w-full h-1 bg-gray-400">
          <div className="w-28 h-1 bg-green-400"></div>
        </div>
      </Box>
      <Typography sx={{ fontSize: "14px", paddingY: 1 }}>
        Overall Employees 201
      </Typography>
    </Paper>
  );
}

export default NewStatsCard;
