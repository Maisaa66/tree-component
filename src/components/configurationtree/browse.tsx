

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ReactComponent as FileIcon } from "../../assets/icons/fileicon.svg";
import { darkTheme } from "../../theme";
import Box from "@mui/material/Box/Box";
import { InputAdornment, TextField } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type BrowseFileProps = {
  value: File | null | string;
  style?: {
    buttonSx?: object;
    icon?: any;
    boxSx?: object;
    iconSx?: object;
    textFieldSx?: object;
    adornmentSx?: object;
  };
  pattern?: string;
  handleUpdate: (value: any, id: any) => void;
  id: number;
  showAdornment?: boolean;
  loadedValue?: any;
};
export default function BrowseFile(props: BrowseFileProps) {
  const { value, style, handleUpdate, id, showAdornment, loadedValue } = props;
  const [file, setFile] = useState(loadedValue ? loadedValue : value);
  const [androment, setAndroment] = useState("(Preset)");

  const defaultValue = useRef(value);

  const Icon = style?.icon || FileIcon;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile?.name);
    }
  };

  React.useEffect(() => {
    if (file !== defaultValue.current) {
      setAndroment("(Custom)");
    } else {
      setAndroment("(Preset)");
    }

    handleUpdate(file, id);
  }, [file, handleUpdate, id]);

  React.useEffect(() => {
    if (loadedValue !== undefined) {
      setFile(loadedValue);
    }
  }, [loadedValue]);

  const theme = darkTheme;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...style?.boxSx,
      }}
    >
      <TextField
        value={file.toString()}
        size="small"
        variant="standard"
        onChange={handleValueChange}
        InputProps={{
          endAdornment: showAdornment && (
            <InputAdornment position="end">{androment}</InputAdornment>
          ),
        }}
        fullWidth
        placeholder={defaultValue.current?.toString() ?? ""}
        sx={{
          "& .MuiInputBase-input": {
            height: "auto",
            color: theme.palette.common.deepBlue10,
            backgroundColor: theme.palette.common.darkElevation0,
            padding: "3px",
            fontSize: "12px",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          },
          "& .MuiInputBase-root": {
            borderRadius: "0px",

            "&::before": {
              borderBottom: `${`2px solid ${theme.palette.common.darkElevation2}`}`,
            },
            "&::after": {
              borderBottom: `${`2px solid ${theme.palette.common.darkElevation2}`}`,
            },
          },

          "& .MuiInputAdornment-root": {
            marginLeft: 0,
            color: "#fff",
            height: "100%",

            "& > p": {
              color: darkTheme.palette.common.deepBlue40,
              backgroundColor: darkTheme.palette.common.darkElevation0,
              padding: "2.5px 11px",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              ...style?.adornmentSx,
            },
          },

          ...style?.textFieldSx,
        }}
      />
      <Button
        component="label"
        variant="contained"
        sx={{
          color: theme.palette.common.deepBlue30,
          backgroundColor: theme.palette.common.deepBlue70,
          height: "24px",
          "&:hover": {
            color: theme.palette.common.deepBlue30,
            backgroundColor: theme.palette.common.deepBlue70,
          },
          fontSize: "12px",
          fontFamily: "Barlow",
          fontWeight: "bold",
          border: `1px solid ${theme.palette.common.darkElevation0}`,
          alignSelf: "end",
          minWidth: "max-content",
          marginLeft: "5px",
          ...style?.buttonSx,
        }}
      >
        <Icon style={{ ...style?.iconSx }} />
        <VisuallyHiddenInput type="file" onChange={handleValueChange} />
      </Button>
    </Box>
  );
}
