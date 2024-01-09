
/* eslint-disable @typescript-eslint/no-explicit-any */

import Switch from "@mui/material/Switch";
import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React from "react";
import { darkTheme } from "../../theme";


type ToggleProps = {
  value: boolean | string;
  style?: {
    typographySx?: object;
    switchSx?: object;
  };
  handleUpdate: (value: any, id: any) => void;
  id: number;
  loadedValue?: any;
};

const Toggle = (props: ToggleProps) => {
  const { value, style, handleUpdate, id, loadedValue } = props;
  const [toggleValue, setToggleValue] = useState(loadedValue!==undefined ? loadedValue : !!Number(value));
  const defaultValue = useRef<boolean>(toggleValue);
  const [androment, setAndroment] = useState("(Preset)");


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleValue(event.target.checked);
  };

  useEffect(() => {
    if (toggleValue !== defaultValue.current) {
      setAndroment("(Custom)");
    } else {
      setAndroment("(Preset)");
    }
    handleUpdate(toggleValue, id);

  }, [toggleValue, handleUpdate, id]);

  useEffect(() => {
    if (loadedValue !== undefined) {
      setToggleValue(loadedValue);
    }
  }, [loadedValue]);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height:"24px",
        width:"100%"
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          color: darkTheme.palette.common.deepBlue30,
          fontFamily: "Barlow",
          ...style?.typographySx,
        }}
      >
        {toggleValue ? `Enabled ${androment}` : `Disabled ${androment}`}
      </Typography>

      <Switch
        sx={{
          "& .MuiSwitch-switchBase": {
            color:  darkTheme.palette.common.deepBlue55,
            opacity: 1,
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            color:  darkTheme.palette.common.deepBlue30,
            opacity: 1,
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor:  darkTheme.palette.common.softGreen,
            opacity: 1,
          },
          "& .MuiSwitch-track": {
            backgroundColor:  darkTheme.palette.common.darkElevation0,
            opacity: 1,
          },
          ...style?.switchSx,
        }}
        checked={toggleValue}
        onChange={handleChange}
        data-testid={`switch-${id}`}
      />
    </Box>
  );
};

export default Toggle;
