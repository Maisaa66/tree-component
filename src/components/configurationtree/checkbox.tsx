
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { darkTheme } from "../../theme";
type CheckBoxProps = {
  value: string | boolean;
  // size?:string
  style?: object;
  pattern?: string;
  handleUpdate: (value: any, id: any) => void;
  id: number;
  loadedValue?: any;
};
const CheckBox = (props: CheckBoxProps) => {
  const { value, style, handleUpdate, id, loadedValue } = props;
  const [checked, setChecked] = React.useState(
    loadedValue ? loadedValue : !!Number(value)
  );

  const theme = darkTheme;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    if (loadedValue !== undefined) {
      setChecked(loadedValue);
    }
    handleUpdate(checked, id);
  }, [loadedValue, handleUpdate, id, checked]);
  return (
    <Checkbox
      value={checked}
      onChange={handleChange}
      sx={{
        "& .MuiSvgIcon-root": {
          color: `${theme.palette.common.deepBlue30}`,
        },
        height: "24px",
        margin: "auto",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        ...style,
      }}
    />
  );
};

export default CheckBox;
