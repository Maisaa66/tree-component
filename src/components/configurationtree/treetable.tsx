
/* eslint-disable @typescript-eslint/no-explicit-any */

import Toggle from "./togglebutton";
import LongText from "./textbox";
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from "@table-library/react-table-library/table";
import { useTree, CellTree, TreeExpandClickTypes} from "@table-library/react-table-library/tree";
import { useTheme } from "@table-library/react-table-library/theme";
import { TableNode } from "@table-library/react-table-library/types/table";
import { Action, State } from "@table-library/react-table-library/types/common";
import Icon from "./iconalignment";
import { CSSProperties, forwardRef, useCallback, useImperativeHandle, useState,} from "react";
import List from "./list";
import { darkTheme } from "../../theme";
import React from "react";
import CheckBox from "./checkbox";
import BrowseFile from "./browse";
import { ThemeProvider, Tooltip, Typography } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../assets/icons/deleteactionicon.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/addactionicon.svg";
import { ReactComponent as DuplicatIcon } from "../../assets/icons/duplicatactionicon.svg";
import NumberInputAdornments from "./numberinput";

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
interface ITreeTableProps {
  columnsName?: {
    properties?: string;
    valuesFields?: string;
    description?: string;
    actions?: string;
  };
  nodes: TableNode[];
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

  nameMapping: { [key: string]: string };
  showToolTip?: boolean;
  buttonsPlaceHolder?: ((props: any) => JSX.Element)[];
  showAdornment?: boolean;
  actions?: ActionProp[];
  loadedData?: { [key: string]: any };
  hiddenColumns?: {
    properties?: boolean;
    valuesFields?: boolean;
    description?: boolean;
    actions?: boolean;
  };
}

type ItemState = {
  [itemName: string]: boolean;
};

const TreeTable = forwardRef((props: ITreeTableProps, ref) => {
  const {
    nodes,
    expandIcon,
    collapseIcon,
    valuesFields,
    fieldsStyling,
    tableStyling,
    columnsName,
    nameMapping,
    textStyling,
    showToolTip = false,
    buttonsPlaceHolder,
    showAdornment = false,
    actions,
    loadedData,
    hiddenColumns,
  } = props;

  const [data, setData] = useState(() => ({ nodes }));

  const [expandState, setExpandState] = useState<ItemState>({});

  const [showActionsIcons, setShowActionsIcons] = useState<ItemState>({});

  function onTreeChange(action: Action, state: State) {
    console.log(action, state);
  }

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
    }
  );

  const isLastChild = (node: TableNode) => {
    if (!node.ancestors || node.ancestors.length === 0) {
      // No ancestors or empty ancestors array, so the node is the root
      return true;
    }

    const parentNode = node.ancestors[0];

    if (!parentNode || !parentNode.nodes) {
      // Ensure that the parent node and its 'nodes' property exist
      return false;
    }

    const lastChild = parentNode.nodes[parentNode.nodes.length - 1];

    return node.id === lastChild?.id;
  };

  const handleExpand = (itemName: string) => {
    expandState[itemName] = !expandState[itemName];
    setExpandState({ ...expandState });
  };

  const handleShowActionIcons = (itemName: string, isMouseEnter: boolean) => {
    setShowActionsIcons((prevState) => ({
      ...prevState,
      [itemName]: isMouseEnter,
    }));
  };

  const handleDefaultComponent = (
    componentName: string
  ): React.ComponentType<any> | null => {
    switch (componentName) {
      case "longText":
      case "listOfNumbers":
      case "float":
        return LongText;
      case "toggle":
        return Toggle;
      case "number":
        return NumberInputAdornments;
      case "list":
        return List;
      case "checkbox":
        return CheckBox;
      case "browse":
        return BrowseFile;
      default:
        return null;
    }
  };
  const handleDefaultIcons = (
    iconName: string
  ): React.ComponentType<any> | null => {
    switch (iconName) {
      case "add":
        return AddIcon;
      case "delete":
        return DeleteIcon;
      case "duplicate":
        return DuplicatIcon;
      default:
        return null;
    }
  };
  const handleStyling = (componentName: string) => {
    if (componentName === "longText" || componentName === "float") {
      return fieldsStyling?.["longText"];
    } else {
      return fieldsStyling?.[componentName];
    }
  };

  const handleUpdateNodes = useCallback(
    (arrayNodes: TableNode[], value: any, id: number): TableNode[] => {
      return arrayNodes.map((node) => {
        if (node.id === id) {
          return { ...node, Value: value };
        } else if (node.nodes) {
          return { ...node, nodes: handleUpdateNodes(node.nodes, value, id) };
        } else {
          return node;
        }
      });
    },
    []
  );

  const handleUpdate = useCallback(
    (value: any, id: number) => {
      setData((prevData) => ({
        ...prevData,
        nodes: handleUpdateNodes(prevData.nodes, value, id),
      }));
    },
    [handleUpdateNodes]
  );

  // Convert the JSON object to CSS string
  const cssStringConverter = useCallback(
    (cssProperties: { [key: string]: any }) => {
      const cssString = Object.keys(cssProperties)
        .map((property) => {
          const propertyName = property
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase();
          const propertyValue = cssProperties[property];
          return `${propertyName}: ${propertyValue};`;
        })
        .join("\n");

      return cssString;
    },
    []
  );

  const theme = useTheme({
    Cell: `
    height: 24px;
    position: relative;
    text-align: left;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
    -moz-text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    &:not(:last-child){
      border-right: 1px solid ${darkTheme.palette.common.deepBlue30};
    }
    &:nth-of-type(1) {
      margin-left: 0px;
      padding-left: 8px;
      border-left: 4px solid ${darkTheme.palette.common.darkElevation0};
    }
    &:last-child{
      border-right: 4px solid ${darkTheme.palette.common.darkElevation0};
    }
    &:first-of-type div {
      height: 100%;
      display: inline-flex;
      align-items: center;
    }
    & .line-icon-container > * {
      position: relative;
      pointer-events: none;
    }
    ${
  tableStyling?.body?.cell &&
      cssStringConverter(tableStyling?.body?.cell).replace(/height:.*?;/, "")
}

  `,
    Row: `
    background-color: #262648;
    & p {
      color: #fff;
    }
    font-family: Barlow;
    font-size: 12px;
    &:hover .td {
      background-color: ${darkTheme.palette.common.deepBlue60};
    }
    ${tableStyling?.body?.row && cssStringConverter(tableStyling?.body?.row)}
  `,
    HeaderRow: `
    background-color: ${darkTheme.palette.common.darkElevation3};
    color: #B3B3BE;
    font-family: Barlow;
    font-size: 12px;
    border-bottom: 5px solid ${darkTheme.palette.common.darkElevation0};
    border-right: 4px solid ${darkTheme.palette.common.darkElevation3};
    border-left: 4px solid ${darkTheme.palette.common.darkElevation3};
    ${
  tableStyling?.header?.row && cssStringConverter(tableStyling?.header?.row)
}
  `,
    HeaderCell: `
    padding-left: 8px;
    padding-bottom: 5px;
    padding-top: 5px;
    &:not(:last-child) {
      border-right: 1px solid ${darkTheme.palette.common.deepBlue30};
    }
    
    ${
  tableStyling?.header?.cell &&
      cssStringConverter(tableStyling?.header?.cell)
}  `,
    Table: `
    max-height: 350px;
    overflow: auto;
    width: 100%;
    max-width: 100%;

    ${tableStyling?.table && cssStringConverter(tableStyling?.table)}
  `,
  });

  // Functions for creating styles with defaults

  const handleRecoverJSONData = useCallback(
    (transData: { [key: string]: any }, data: { [key: string]: any }) => {
      data.nodes.forEach((node: TableNode) => {
        const { DisplayName, Value } = node;
        const modifiedDisplayName: string = nameMapping[DisplayName];
        if (node.nodes) {
          transData[modifiedDisplayName] = {};
          handleRecoverJSONData(transData[modifiedDisplayName], node);
        } else {
          transData[modifiedDisplayName] = { Value };
        }
      });
    },
    [nameMapping]
  );

  const deleteNodesById = (
    nodes: TableNode[],
    idToDelete: string
  ): TableNode[] => {
    return nodes
      .map((node) => {
        if (node.id === idToDelete) {
          // If the node has the specified ID, don't include it in the result
          return null;
        } else if (node.nodes) {
          // Recursively process child nodes
          node.nodes = deleteNodesById(node.nodes, idToDelete);
        }
        return node;
      })
      .filter(Boolean) as TableNode[];
  };

  const handleDeleteAction = (id: any) => {
    setData((state) => ({
      ...state,
      nodes: deleteNodesById(state.nodes, id),
    }));
  };

  const defaultColumnsName = {
    properties: "Properties",
    valuesFields: "Values",
    description: "Description",
    actions: "Actions",
  };
  // the columns visibility initial state, if the user didn't pass any value to the component
  // the default value will be false for all columns
  const defaultColumnsHide = {
    properties: false,
    valuesFields: false,
    description: false,
    actions: false,
  };

  const mergedColumnsHide = { ...defaultColumnsHide, ...hiddenColumns };

  const handleExtractValues = useCallback(() => {
    const JSONDATA = {};
    handleRecoverJSONData(JSONDATA, data);
    const contentToWrite = JSON.stringify(JSONDATA);
    return contentToWrite;
  }, [data, handleRecoverJSONData]);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleExtractValues,
      };
    },
    [handleExtractValues]
  );

  return (
    <div style={{ maxHeight: "350px", overflow: "auto" }}>
      {buttonsPlaceHolder && (
        <div
          style={{
            display: "flex",
            backgroundColor: darkTheme.palette.common.darkElevation3,
            justifyContent: "space-between",
            padding: "5px 8px 5px 8px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {buttonsPlaceHolder?.map((Btn, index) => <Btn key={index} />)}
          </div>
        </div>
      )}

      <Table data={data} tree={tree} theme={theme}>
        {(tableList: TableNode[]) => {
          return (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell
                    resize={{
                      minWidth: 5,
                      resizerHighlight: "#B3B3BE",
                    }}
                    hide={mergedColumnsHide.properties}
                  >
                    {columnsName?.properties
                      ? columnsName?.properties
                      : defaultColumnsName.properties}
                  </HeaderCell>

                  <HeaderCell
                    resize={{
                      minWidth: 5,
                      resizerHighlight: "#B3B3BE",
                    }}
                    hide={mergedColumnsHide.valuesFields}
                  >
                    {columnsName?.valuesFields
                      ? columnsName?.valuesFields
                      : defaultColumnsName.valuesFields}
                  </HeaderCell>

                  <HeaderCell
                    resize={{
                      minWidth: 5,
                      resizerHighlight: "#B3B3BE",
                    }}
                    hide={mergedColumnsHide.description}
                  >
                    {columnsName?.description
                      ? columnsName?.description
                      : defaultColumnsName.description}
                  </HeaderCell>

                  <HeaderCell
                    resize={{
                      minWidth: 5,
                      resizerHighlight: "#B3B3BE",
                    }}
                    hide={mergedColumnsHide.actions}
                  >
                    {columnsName?.actions
                      ? columnsName?.actions
                      : defaultColumnsName.actions}
                  </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item: TableNode) => {
                  const FieldComponent: any =
                    item.ParamType &&
                    valuesFields &&
                    valuesFields[item.ParamType]
                      ? valuesFields[item.ParamType]
                      : handleDefaultComponent(item.ParamType) || null;

                  const combination =
                    item.ParamType &&
                    item.ancestors &&
                    item.ancestors.length > 1
                      ? item.ancestors
                        .slice(0, -1)
                        .reverse() // Reverse the order of ancestors
                        .map((acc: any) => nameMapping[acc.DisplayName])
                        .join("-")
                        .concat("-", nameMapping[item.DisplayName])
                      : null;

                  return (
                    <Row
                      key={item.id}
                      item={item}
                      onMouseEnter={() =>
                        handleShowActionIcons(item.DisplayName, true)
                      }
                      onMouseLeave={() =>
                        handleShowActionIcons(item.DisplayName, false)
                      }
                    >
                      <CellTree
                        hide={mergedColumnsHide.properties}
                        resize={{ minWidth: 25 }}
                        item={item}
                        treeIcon={{
                          iconDefault: (
                            <Icon
                              isLast={isLastChild(item)}
                              isExpand={expandState[item.DisplayName + item.id]}
                              treeXlevel={item.treeXLevel}
                              hasChildren={!!item.nodes}
                              expandIcon={expandIcon}
                              collapseIcon={collapseIcon}
                              isParentLastChild={
                                item.ancestors !== undefined &&
                                isLastChild(item.ancestors[0])
                              }
                              isGrandParentLastChild={
                                item.ancestors !== undefined &&
                                item.ancestors.length > 2 &&
                                isLastChild(
                                  item.ancestors[item.ancestors.length - 3]
                                )
                              }
                              onClick={() => {
                                const name = item.DisplayName + item.id;
                                if (item.nodes) {
                                  handleExpand(name);
                                }
                              }}
                              itemName={item.DisplayName}
                              id={item.id}
                            />
                          ),
                          iconDown: (
                            <Icon
                              isLast={isLastChild(item)}
                              isExpand={expandState[item.DisplayName + item.id]}
                              treeXlevel={item.treeXLevel}
                              hasChildren={!!item.nodes}
                              expandIcon={expandIcon}
                              collapseIcon={collapseIcon}
                              isParentLastChild={
                                item.ancestors !== undefined &&
                                isLastChild(item.ancestors[0])
                              }
                              isGrandParentLastChild={
                                item.ancestors !== undefined &&
                                item.ancestors.length > 2 &&
                                isLastChild(
                                  item.ancestors[item.ancestors.length - 3]
                                )
                              }
                              onClick={() => {
                                const name = item.DisplayName + item.id;
                                if (item.nodes) {
                                  handleExpand(name);
                                }
                              }}
                              itemName={item.DisplayName}
                              id={item.id}
                            />
                          ),
                          iconRight: (
                            <Icon
                              isLast={isLastChild(item)}
                              isExpand={expandState[item.DisplayName + item.id]}
                              treeXlevel={item.treeXLevel}
                              hasChildren={!!item.nodes}
                              expandIcon={expandIcon}
                              collapseIcon={collapseIcon}
                              isParentLastChild={
                                item.ancestors !== undefined &&
                                isLastChild(item.ancestors[0])
                              }
                              isGrandParentLastChild={
                                item.ancestors !== undefined &&
                                item.ancestors.length > 2 &&
                                isLastChild(
                                  item.ancestors[item.ancestors.length - 3]
                                )
                              }
                              onClick={() => {
                                const name = item.DisplayName + item.id;
                                if (item.nodes) {
                                  handleExpand(name);
                                }
                              }}
                              itemName={item.DisplayName}
                              id={item.id}
                            />
                          ),
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                            minWidth: "0",
                            maxWidth: "100%",
                            textOverflow: "ellipsis",
                            ...textStyling,
                          }}
                          textOverflow="ellipsis"
                        >
                          {item.DisplayName}
                        </Typography>
                      </CellTree>

                      <Cell hide={mergedColumnsHide.valuesFields}>
                        {item.ParamType && FieldComponent && (
                          <ThemeProvider theme={darkTheme}>
                            <FieldComponent
                              value={item.Value}
                              style={handleStyling(item.ParamType)}
                              pattern={item.Pattern || undefined}
                              validValues={item.ValidValues}
                              handleUpdate={handleUpdate}
                              id={item.id}
                              range={item.Range}
                              showAdornment={showAdornment}
                              loadedValue={
                                loadedData && loadedData[combination]
                              }
                            />
                          </ThemeProvider>
                        )}
                      </Cell>

                      <Cell hide={mergedColumnsHide.description}>
                        {showToolTip ? (
                          <Tooltip title={item.Description} arrow>
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: "12px",
                                minWidth: "0",
                                width: "0px",
                                maxWidth: "100%",
                                textOverflow: "ellipsis",
                                ...textStyling,
                              }}
                              textOverflow="ellipsis"
                            >
                              {item.Description}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "12px",
                              minWidth: "0",
                              width: "0px",
                              maxWidth: "100%",
                              textOverflow: "ellipsis",
                              ...textStyling,
                            }}
                            textOverflow="ellipsis"
                          >
                            {item.Description}
                          </Typography>
                        )}
                      </Cell>

                      <Cell hide={mergedColumnsHide.actions}>
                        {showActionsIcons[item.DisplayName] && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            data-testid={`${item.DisplayName}-${item.id}-actions-container`}
                          >
                            {actions ? (
                              <>
                                {actions.map((action) => {
                                  const Icon: any = action.icon
                                    ? action.icon
                                    : handleDefaultIcons(action.name);

                                  return (
                                    <Icon
                                      key={action.name}
                                      onClick={
                                        action.name === "delete"
                                          ? action.handler
                                            ? action.handler
                                            : () => handleDeleteAction(item.id)
                                          : action.handler
                                      }
                                      data-testid={
                                        !action.icon
                                          ? `${item.DisplayName}-${item.id}-${action.name}Icon`
                                          : `MuiActionIcon-${item.DisplayName}-${item.id}-${action.name}`
                                      }
                                    />
                                  );
                                })}

                                {!actions.some(
                                  (action) => action.name === "add"
                                ) && (
                                  <AddIcon
                                    data-testid={`${item.DisplayName}-${item.id}-addIcon`}
                                  />
                                )}

                                {!actions.some(
                                  (action) => action.name === "duplicate"
                                ) && (
                                  <DuplicatIcon
                                    data-testid={`${item.DisplayName}-${item.id}-duplicateIcon`}
                                  />
                                )}

                                {!actions.some(
                                  (action) => action.name === "delete"
                                ) && (
                                  <DeleteIcon
                                    onClick={() => handleDeleteAction(item.id)}
                                    data-testid={`${item.DisplayName}-${item.id}-deleteIcon`}
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                <AddIcon
                                  data-testid={`${item.DisplayName}-${item.id}-addIcon`}
                                />
                                <DuplicatIcon
                                  data-testid={`${item.DisplayName}-${item.id}-duplicateIcon`}
                                />
                                <DeleteIcon
                                  onClick={() => {
                                    handleDeleteAction(item.id);
                                  }}
                                  data-testid={`${item.DisplayName}-${item.id}-deleteIcon`}
                                />
                              </>
                            )}
                          </div>
                        )}
                      </Cell>
                    </Row>
                  );
                })}
              </Body>
            </>
          );
        }}
      </Table>
    </div>
  );
});

TreeTable.displayName = "TreeTable";
export default TreeTable;
