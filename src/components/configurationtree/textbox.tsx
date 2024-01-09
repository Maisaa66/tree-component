

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect } from "react";
import { darkTheme } from "../../theme";
import InputAdornment from "@mui/material/InputAdornment";

type LongTextProp = {
  value: string | number;
  // size?:string
  style?: {
    textbox?: object;
    adornmentSx?: object;
  };
  pattern?: string;
  handleUpdate: (value: any, id: any) => void;
  id: number;
  showAdornment?:boolean;
  range?:string;
  loadedValue?: any;
};
const LongText = (props: LongTextProp) => {
  const { value, style, pattern, handleUpdate, id, range, showAdornment, loadedValue } = props;
  const [fieldValue, setFieldValue] = useState(loadedValue ? loadedValue :value);
  const [min, max] = range ? range.split(",") : [undefined, undefined];

  const defaultValue = useRef<string|number>(value);

  const [androment, setAndroment] = useState("(Preset)");
  const [error, setError] = useState(false);
  const checkError = React.useCallback((val:any)=>{
    const regexPattern = pattern && new RegExp(pattern);

    if (regexPattern) {
      setError(!regexPattern.test(val));
    } if (range) {
      const numericValue = Number(val);
      setError(numericValue < Number(min) || numericValue > Number(max));
    }
  },[pattern, range, min, max])


  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  useEffect(() => {
    if (fieldValue !== defaultValue.current) {
      setAndroment("(Custom)");
    } else {
      setAndroment("(Preset)");
    }


    checkError(fieldValue);
    handleUpdate(fieldValue, id);

  }, [fieldValue, checkError, handleUpdate, id]);

  useEffect(() => {
    if (loadedValue !== undefined) {
      setFieldValue(loadedValue);
    }
  }, [loadedValue]);

  const inputProps = {
    pattern: pattern,
    "data-testid": "long-text-input",
  };
  const theme = darkTheme;
  return (
    <TextField
      // error={true}
      value={fieldValue}
      size="small"
      variant="standard"
      onChange={handleValueChange}
      inputProps={inputProps}
      InputProps={{
        endAdornment: showAdornment && (
          <InputAdornment position="end">{androment}</InputAdornment>
        ),
      }}
      fullWidth
      placeholder={defaultValue.current.toString()}
      sx={{
        "& .MuiInputBase-input": {
          height: "auto",
          color: darkTheme.palette.common.deepBlue10,
          backgroundColor:  darkTheme.palette.common.darkElevation0,
          padding: "3px",
          fontSize:  "12px",
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        },
        "& .MuiInputBase-root": {
          borderRadius:  "0px",

          "&::before": {
            borderBottom: `${
              error
                ? "2px solid red"
                : `2px solid ${theme.palette.common.darkElevation2}`
            }`,
          },
          "&::after": {
            borderBottom: `${
              error
                ? "2px solid red"
                : `2px solid ${theme.palette.common.darkElevation2}`
            }`,
          },
        },

        "& .MuiInputAdornment-root": {
          marginLeft: 0,
          color: "#fff",

          "& > p": {
            color:  darkTheme.palette.common.deepBlue40,
            backgroundColor:  darkTheme.palette.common.darkElevation0,
            padding: "24px",
            fontSize:  "12px",
            fontWeight: "bold",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            ...style?.adornmentSx
          },
        },
        ...style?.textbox
      }}
    />
  );
};

export default LongText;
