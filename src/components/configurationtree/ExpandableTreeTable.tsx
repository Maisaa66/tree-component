
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useCallback, useEffect, useRef } from "react";
import TreeTable from "./treetable";
import { TableNode } from "@table-library/react-table-library/types/table";
import { darkTheme } from "../../theme";
import { ThemeProvider } from "@mui/material";

type ITableStylesProps = {
  cell?: CSSProperties;
  row?: CSSProperties;
  [key: string]: CSSProperties | undefined;
};

interface ActionProp {
  icon?: any;
  handler?: () => void;
  name: string;
}

interface IExpandableTreeTableProps {

  data: object;
  expandIcon?: any;
  collapseIcon?: any;
  valuesFields?: { [key: string]: (props: any) => JSX.Element };
  fieldsStyling?: { [key: string]: object };
  tableStyling?: {
    header?: ITableStylesProps;
    body?: ITableStylesProps;
    table?: CSSProperties;
  };
  textStyling?: object;
  showToolTip?: boolean;
  columnsName?: {properties?:string, valuesFields?: string, description?:string, actions?: string};
  buttonsPlaceHolder?: ((props: any) => JSX.Element)[];
  showAdornment?: boolean;
  actions?: ActionProp[];
  loadedData?: object;
  treeRef?: any;
  hiddenColumns?: {properties?:boolean , valuesFields?: boolean , description?:boolean, actions?: boolean};

}

function indicateDuplicates(array: TableNode[], name: string): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i].DisplayName === name) {
      return true;
    }
  }
  return false;
}

const ExpandableTreeTable = (props: IExpandableTreeTableProps) => {
  const {
    data,
    expandIcon,
    collapseIcon,
    valuesFields,
    fieldsStyling,
    tableStyling,
    textStyling,
    showToolTip = false,
    columnsName,
    buttonsPlaceHolder,
    showAdornment = false,
    actions,
    loadedData,
    treeRef,
    hiddenColumns
  } = props;

  const id = useRef<number>(13);
  const transformedData = useRef<TableNode[]>([]);
  const nameMapping = useRef<{ [key: string]: string }>({});

  const theme = darkTheme;
  const dataHandler = useCallback((tree: any, array: TableNode[]): void => {
    if (Object.keys(tree).includes("DisplayName")) {
      tree["id"] = id.current;
      if (indicateDuplicates(array, tree["DisplayName"])) {
        return;
      }
      array.push(tree);
      id.current++;
      return;
    }

    for (const item of Object.keys(tree)) {
      nameMapping.current[tree[item].DisplayName || item] = item;

      if (!Object.keys(tree[item]).includes("DisplayName")) {
        const node: TableNode = {
          id: "",
        };
        node["DisplayName"] = item;
        node["nodes"] = [];
        node["id"] = id.current;
        id.current++;
        dataHandler(tree[item], node["nodes"]);
        if (indicateDuplicates(array, item)) {
          return;
        }
        array.push(node);
      } else {
        dataHandler(tree[item], array);
      }
    }
  }, []);

  useEffect(() => {
    dataHandler(data, transformedData.current);
  }, [data, dataHandler]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TreeTable
          nodes={transformedData.current}
          expandIcon={expandIcon}
          collapseIcon={collapseIcon}
          valuesFields={valuesFields}
          fieldsStyling={fieldsStyling}
          tableStyling={tableStyling}
          nameMapping={nameMapping.current}
          textStyling={textStyling}
          showToolTip={showToolTip}
          columnsName={columnsName}
          buttonsPlaceHolder={buttonsPlaceHolder}
          showAdornment={showAdornment}
          actions={actions}
          loadedData={loadedData}
          ref={treeRef}
          hiddenColumns={hiddenColumns}
        />
      </ThemeProvider>
    </>
  );
};

export default ExpandableTreeTable;
