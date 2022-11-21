import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FieldAttributes, useField } from "formik";

/**
 * Mui Custom radio button with formik validaiton that also allow
 * embeeding form lable
 */
type CustomRadioProps = { label: string } & FieldAttributes<{}>;

export const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  ...props
}) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
