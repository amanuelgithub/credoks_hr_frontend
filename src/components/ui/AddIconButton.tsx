import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export const AddIconButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <AddIcon sx={{ color: "#8e8e8e" }} />
  </IconButton>
);
