import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function StatCard({
  amount,
  text,
  icon,
}: {
  amount: any;
  text: string;
  icon: any;
}) {
  return (
    <Paper
      sx={{
        width: "290px",
        paddingX: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ padding: 2, borderRadius: 50 }} className="bg-purple-200">
        {icon}
      </Box>
      <Box
        sx={{
          paddingY: 1,
          height: "inherit",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "space-between",
          gap: 2,
          textAlign: "end",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder", fontSize: 28 }}>
          {amount}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "normal" }}>
          {text}
        </Typography>
      </Box>
    </Paper>
  );
}

export default StatCard;
