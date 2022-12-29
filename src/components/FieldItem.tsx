import Grid from "@mui/material/Grid";

function FieldItem({ title, value }: { title: any; value: any }) {
  return (
    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
      <Grid
        item
        xs={6}
        md={6}
        lg={6}
        sx={{ color: "#5e798d", fontWeight: "bold" }}
      >
        {title} :
      </Grid>
      <Grid item xs={6} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
        {value}
      </Grid>
    </Grid>
  );
}

export default FieldItem;
