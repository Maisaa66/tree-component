

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { Box, styled } from "@mui/system";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { useState, useRef, useEffect } from "react";
import { NumberInputRootSlotPropsOverrides } from "@mui/base/Unstable_NumberInput";
import { SlotComponentProps } from "@mui/base/utils";
import { Theme } from "@mui/material";

interface CustomStyles {
  inputAdornment?: React.CSSProperties;
  inputRoot?: React.CSSProperties;
  inputElement?: React.CSSProperties;
  button?: React.CSSProperties;
}

type numberInputProp = {
  value: string;
  pattern?: string;
  handleUpdate: (value: any, id: any) => void;
  id: number;
  style?: CustomStyles;
  range?: string;
  showAdornment?: boolean;
  loadedValue?: any;
  theme?: Theme;
};

type ExtendedNumberInputProps = NumberInputProps & {
  placeholder?: string;
  slotProps?: {
    root?: SlotComponentProps<
      "div",
      NumberInputRootSlotPropsOverrides & { error?: boolean },
      {
        // ... existing properties ...
      }
    >;
    // ... other slot props ...
  };
};

const InputAdornment = styled("div")(
  ({ theme, style }: { theme: any; style?: CustomStyles }) => `
  display: inline-flex;
  align-items: center;
  justify-content: end;
  color: ${theme.palette.common.deepBlue40};
  height: 24px;
  padding-right: 5px;
  font-size: 12px;
  font-weight: bold;
  ${style?.inputAdornment}
`
);

const InputRoot = styled("div")(
  ({
    theme,
    style,
    error,
  }: {
    theme: any;
    style?: CustomStyles;
    error: boolean;
  }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.common.deepBlue40};
    background: ${theme.palette.common.darkElevation0};
    display: grid;
    grid-template-columns: auto 1fr auto 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    height: 24px;
    width: 100%;
    &:focus-visible {
      outline: 0;
          }
    border-bottom: 2px solid ${
  error ? "red" : theme.palette.common.darkElevation2
};
    &:hover {
      border-bottom: 2px solid #fff;
    }


    ${style?.inputRoot}
  `
);

const InputElement = styled("input")(
  ({ style }: { style?: CustomStyles }) => `
  font-size: 12px;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-row: 1/2;
  color: white;
  background: inherit;
  border: none;
  padding: 3px;
  outline: 0;
  width:100%;
  height:24px;



  ${style?.inputElement}
`
);

const Button = styled("button")(
  ({ theme, style }: { theme: any; style?: CustomStyles }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 0.6rem;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  background: ${theme.palette.common.darkElevation0};
  border: 0;
  color: ${theme.palette.common.deepBlue40};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  &:hover {
    background: ${theme.palette.common.darkElevation0};
    border-color: ${theme.palette.common.deepBlue40};
    cursor: pointer;
  }
  &.${numberInputClasses.incrementButton} {
    grid-column: 4/5;
    grid-row: 1/2;
    background: ${theme.palette.common.darkElevation0};
    color: ${theme.palette.common.deepBlue40};
    &:hover {
      cursor: pointer;
      color: ${theme.palette.common.deepBlue40};
      background: ${theme.palette.common.darkElevation0};
      border-color: ${theme.palette.common.deepBlue10};
    }
  }
  &.${numberInputClasses.decrementButton} {
    grid-column: 4/5;
    grid-row: 2/2;
    transform: translateY(-14px);
    background: ${theme.palette.common.darkElevation0};
    color: ${theme.palette.common.deepBlue40};
    margin: 0;
    padding: 0;
    &:hover {
      cursor: pointer;
      color: ${theme.palette.common.deepBlue40};
      background: ${theme.palette.common.darkElevation0};
      border-color: ${theme.palette.common.deepBlue10};
    }
  }
  ${style?.button}

`
);

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: ExtendedNumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: InputRoot,
        input: InputElement,
        incrementButton: Button,
        decrementButton: Button,
      }}
      {...props}
      ref={ref}
    />
  );
});
export default function NumberInputAdornments(props: numberInputProp) {
  const {
    value,
    style,
    pattern,
    handleUpdate,
    id,
    range,
    showAdornment,
    loadedValue,
    theme,
  } = props;
  const [fieldValue, setFieldValue] = useState<number>(
    loadedValue ? +loadedValue : +value || 0
  );
  const defualtValue = useRef<number>(+value);
  const [androment, setAndroment] = useState("(Preset)");
  const [error, setError] = useState(false);
  const [min, max] = range ? range.split(",") : [undefined, undefined];
  const handleValueChange = (
      /* tslint:disable-next-line:no-unused-variable */
      _event:
        | React.FocusEvent<HTMLInputElement>
        | React.PointerEvent
        | React.KeyboardEvent,
      val: number | undefined
    ) => {
      if (val !== undefined) {
        setFieldValue(val);
      }
    };

  const checkError = React.useCallback(
    (val: any) => {
      const regexPattern = pattern && new RegExp(pattern);

      if (regexPattern) {
        setError(!regexPattern.test(val));
      }
      if (range) {
        const numericValue = Number(val);
        setError(numericValue < Number(min) || numericValue > Number(max));
      }
    },
    [pattern, range, min, max]
  );

  const handleInputChange = (e: any) => {
    setFieldValue(+e.target.value);
  };

  useEffect(() => {
    if (fieldValue !== defualtValue.current) {
      setAndroment("(Custom)");
    } else {
      setAndroment("(Preset)");
    }

    checkError(fieldValue);

    handleUpdate(fieldValue, id);
  }, [fieldValue, checkError, handleUpdate, id]);

  useEffect(() => {
    if (loadedValue !== undefined) {
      // loadedValueRef.current = loadedValue;
      setFieldValue(loadedValue);
    }
  }, [loadedValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        width: "100%",
      }}
    >
      <NumberInput
        slotProps={{
          root: {
            style: style?.inputRoot,
            error: error,
          },
          input: {
            style: style?.inputElement,
          },
          incrementButton: {
            style: style?.button,
            children: <span className="upArrow">▴</span>,
          },
          decrementButton: {
            style: style?.button,
            children: <span className="downArrow">▾</span>,
          },
        }}
        value={fieldValue}
        onChange={handleValueChange}
        onInputChange={handleInputChange}
        placeholder={defualtValue.current.toString()}
        endAdornment={
          showAdornment && (
            <InputAdornment theme={theme} style={style?.inputAdornment}>
              {androment}
            </InputAdornment>
          )
        }
        min={range ? Number(min) : undefined}
        max={range ? Number(max) : undefined}
        error={true}
        // step={0.01}
      />
    </Box>
  );
}
