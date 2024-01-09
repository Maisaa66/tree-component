

/* eslint-disable @typescript-eslint/no-explicit-any */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

import { darkTheme } from "../../theme";
import { useState, useRef, useEffect } from "react";

type ListProps = {
  value: string;
  style?: {
    comboboxSx?: object;
    adornmentSx?: object;
  };
  validValues: string[];
  handleUpdate: (value: any, id: any) => void;
  id: number;
  showAdornment?: boolean;
  loadedValue?: any;
};

const List = (props: ListProps) => {
  const {
    value,
    style,
    validValues,
    handleUpdate,
    id,
    showAdornment,
    loadedValue,
  } = props;
  const [fieldValue, setFieldValue] = useState(
    loadedValue ? loadedValue : value
  );
  const [androment, setAndroment] = useState("(Preset)");

  const defaultValue = useRef<string>(value);

  const handleValueChange = (event: SelectChangeEvent<typeof fieldValue>) => {
    const newValue = event.target.value;
    setFieldValue(newValue);
  };

  useEffect(() => {
    if (fieldValue !== defaultValue.current) {
      setAndroment("(Custom)");
    } else {
      setAndroment("(Preset)");
    }

    handleUpdate(fieldValue, id);
  }, [fieldValue, loadedValue, handleUpdate, id]);

  useEffect(() => {
    if (loadedValue !== undefined) {
      setFieldValue(loadedValue);
    }
  }, [loadedValue]);

  const theme = darkTheme;
  return (
    <>
      <FormControl
        variant="standard"
        sx={{
          width: "100%",

          "& .MuiInputBase-input": {
            backgroundColor: theme.palette.common.darkElevation0,
            color: theme.palette.common.deepBlue10,
            height: "auto",
            padding: "3px",
          },
          "& .MuiSelect-select": {
            "&:focus": {
              backgroundColor: theme.palette.common.darkElevation0,
            },
          },

          "& .MuiInputBase-root": {
            borderRadius: "0px",
            fontSize: "12px",

            "&::before, &::after": {
              borderBottom: `2px solid ${theme.palette.common.darkElevation2}`,
            },
          },

          "& .MuiSvgIcon-root": {
            color: theme.palette.common.deepBlue55,
          },

          ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input:focus ":
            {
              backgroundColor: theme.palette.common.darkElevation0,
            },
          ...style?.comboboxSx,
        }}
      >
        <Select
          key={id}
          value={fieldValue}
          onChange={handleValueChange}
          endAdornment={
            showAdornment && (
              <InputAdornment position="end">{androment}</InputAdornment>
            )
          }
          sx={{
            "& .MuiInputAdornment-root": {
              marginLeft: 0,
              color: "#fff",
              "& > p": {
                color: darkTheme.palette.common.deepBlue40,
                backgroundColor: darkTheme.palette.common.darkElevation0,
                padding: "24px",
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              },
            },
            ...style?.adornmentSx,
          }}
        >
          {validValues.map((val) => (
            <MenuItem value={val} key={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default List;
