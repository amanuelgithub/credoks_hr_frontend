import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AddIconButton } from "./ui/AddIconButton";

export default function ListCardHeader({
  headerText,
  handleClick,
}: {
  headerText: string;
  handleClick: any;
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "light", color: "gray" }}
          className="text-center md:text-start"
        >
          {headerText}
        </Typography>
      </Box>

      <Box position="absolute" top={6} right={6}>
        <AddIconButton onClick={handleClick} />
      </Box>
    </Box>
  );
}
