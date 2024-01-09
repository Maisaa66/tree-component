

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ExpandableTreeTable from "../ExpandableTreeTable";
import data from "./dl_config_constants.json";
import userEvent from "@testing-library/user-event";
import { FileOpen, FileCopyOutlined, TimeToLeave } from "@mui/icons-material";
import loadedData from "./loadedConfig.json";
import 'jest';
import '@testing-library/jest-dom';


test("Make Sure That Columns Name is rendered Correctly", () => {
  render(<ExpandableTreeTable data={data} />);
  const defaultCloumnsName = ["Properties", "Values", "Description", "Actions"];
  defaultCloumnsName.map((name) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test("Make Sure That Columns Name passed to the component is rendered Correctly", () => {
  const defaultCloumnsName = {properties:"Properties", values:"Values", description:"Description", actions:"Actions"}

  render(<ExpandableTreeTable data={data} columnsName={defaultCloumnsName} />);
  Object.values(defaultCloumnsName).map((name) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test("expands the row when clicking on the icon", () => {
  render(<ExpandableTreeTable data={data} />);

  // Assuming the icon has a specific test ID
  const icon = screen.getByTestId("Produce-13-icon-container"); // Replace with the actual test ID

  // Ensure that the icon is found
  expect(icon).toBeInTheDocument();

  // Get the parent row element
  const row = icon.closest("[data-table-library_tr-body]");

  // Ensure that the row is found
  expect(row).toBeInTheDocument();

  // Ensure that the row does not initially have the expanded class
  expect(row).not.toHaveClass("row-tree-expanded");

  // Simulate a click event on the icon
  fireEvent.click(icon);

  // Ensure that the row now has the expanded class after the click
  expect(row).toHaveClass("row-tree-expanded");
});

test("tooltip appears on hovering on the description", async () => {
  render(<ExpandableTreeTable data={data} showToolTip />);

  const icon = screen.getByTestId("Produce-13-icon-container");
  expect(icon).toBeInTheDocument();
  fireEvent.click(icon);

  const child = screen.getByText("Fruits");
  expect(child).toBeInTheDocument();
  const childIcon = screen.getByTestId("Fruits-14-icon-container");
  fireEvent.click(childIcon);

  const childNode = screen.getByText("Apple Options");
  expect(childNode).toBeInTheDocument();


  const description = screen.getByText("Toggle to include apples in the basket");
  // console.log(description);
  expect(description).toBeInTheDocument();

  userEvent.hover(description);

  await waitFor(() => {
    expect(screen.getByRole("tooltip", { hidden: true })).toBeVisible();
  });
});

test("Actions Icons is appears on hovering", async () => {
  render(<ExpandableTreeTable data={data} showToolTip />);

  const node = screen.getByText("Produce");
  fireEvent.mouseEnter(node);
  const actionsIcon = await screen.findByTestId("Produce-13-actions-container");
  expect(actionsIcon).toBeInTheDocument();
});


describe("Test the Expand and Collapse Icons", () => {
  test("Expand and collapsable icons passed probably or not", () => {
    render(
      <ExpandableTreeTable
        data={data}
        expandIcon={FileOpen }
        collapseIcon={FileCopyOutlined}
      />
    );
  
    const expandIcon = screen.getAllByTestId("FileOpenIcon");
    expect(expandIcon.length).toBeGreaterThan(0);
    
    // expand node to check collapse icon
    const icon = screen.getByTestId("Produce-13-icon-container");
    fireEvent.click(icon);
    const collapseIcon = screen.getAllByTestId("FileCopyOutlinedIcon");
    expect(collapseIcon.length).toBe(1);
  });


  test("Expand icon only", ()=>{
    render(<ExpandableTreeTable data={data} expandIcon={FileOpen} />);

    const expandIcon = screen.getAllByTestId("FileOpenIcon");
    expect(expandIcon.length).toBeGreaterThan(0);

    // expand node to check expand icon
    const icon = screen.getByTestId("Produce-13-icon-container");
    fireEvent.click(icon);
    const expandableIcon = screen.getAllByTestId("arrowDownIcon");
    expect(expandableIcon.length).toBe(1);
  });

  test("Collapse icon only", ()=>{
    render(<ExpandableTreeTable data={data} collapseIcon={FileCopyOutlined} />);

    const expandIcon = screen.getAllByTestId("arrowRightIcon");
    expect(expandIcon.length).toBeGreaterThan(0);

    // expand node to check collapse icon
    const icon = screen.getByTestId("Produce-13-icon-container");
    console.log(icon);
    fireEvent.click(icon);
    const collapseIcon = screen.getAllByTestId("FileCopyOutlinedIcon");
    expect(collapseIcon.length).toBe(1);
  })
});

test("showAndronment prop Testing", ()=>{

  render(<ExpandableTreeTable data={data} showAdornment/>);

  const node = screen.getByTestId("Meat-22-icon-container");
  expect(node).toBeInTheDocument();

  fireEvent.click(node);

  const child = screen.getByText("Beef Options");
  expect(child).toBeInTheDocument();

  const andronments = screen.getAllByText(/(Preset)|(Custom)/i);
  expect(andronments.length).toBeGreaterThan(0);


});

test("Delete Icon Testing", ()=>{
  render(<ExpandableTreeTable data={data} />);

  const node = screen.getByText("Produce");
  expect(node).toBeInTheDocument();

  fireEvent.mouseEnter(node);

  const deleteIcon = screen.getByTestId("Produce-13-deleteIcon");
  expect(deleteIcon).toBeInTheDocument();

  fireEvent.click(deleteIcon);
  expect(node).not.toBeInTheDocument();

});

describe("Test the Actions Props",()=>{
  test("Actions Add Props Testing", ()=>{
    const handleAddMock = jest.fn();
    render(<ExpandableTreeTable data={data} actions={[{name:"add", icon:FileOpen, handler:handleAddMock}]} />);
    
    const node = screen.getByText("Produce");
    expect(node).toBeInTheDocument();
  
    fireEvent.mouseEnter(node);
  
    const addIcon = screen.getByTestId("MuiActionIcon-Produce-13-add");
    expect(addIcon).toBeInTheDocument();
    const deleteIcon = screen.getByTestId("Produce-13-deleteIcon");
    expect(deleteIcon).toBeInTheDocument();
    const duplicateIcon = screen.getByTestId("Produce-13-duplicateIcon");
    expect(duplicateIcon).toBeInTheDocument();
    
  
    fireEvent.click(addIcon);
    expect(handleAddMock).toHaveBeenCalledTimes(1);
  });

  test("Duplicate Action Icon",()=>{
    const handleDuplicateMock = jest.fn();

    render(<ExpandableTreeTable data={data} actions={[{name:"duplicate", icon:FileOpen, handler:handleDuplicateMock}]}/>);
    
    const node = screen.getByText("Produce");
    expect(node).toBeInTheDocument();
  
    fireEvent.mouseEnter(node);
  
    const addIcon = screen.getByTestId("Produce-13-addIcon");
    expect(addIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("Produce-13-deleteIcon");
    expect(deleteIcon).toBeInTheDocument();

    const duplicateIcon = screen.getByTestId("MuiActionIcon-Produce-13-duplicate");
    expect(duplicateIcon).toBeInTheDocument();
    
    fireEvent.click(duplicateIcon);
    expect(node).toBeInTheDocument();
  });

  test("Delete Action Icon",()=>{

    const handleDeleteMock = jest.fn();

    render(<ExpandableTreeTable data={data} actions={[{name:"delete", icon:FileOpen, handler:handleDeleteMock}]}/>);
    
    const node = screen.getByText("Produce");
    expect(node).toBeInTheDocument();
  
    fireEvent.mouseEnter(node);
  
    const addIcon = screen.getByTestId("Produce-13-addIcon");
    expect(addIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("MuiActionIcon-Produce-13-delete");
    expect(deleteIcon).toBeInTheDocument();

    const duplicateIcon = screen.getByTestId("Produce-13-duplicateIcon");
    expect(duplicateIcon).toBeInTheDocument();
    
    fireEvent.click(deleteIcon);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);



  });

  test("Add, Duplicate and Delete Action Icon",()=>{
    const handleAddMock = jest.fn();
    const handleDuplicateMock = jest.fn();
    const handleDeleteMock = jest.fn();

    render(<ExpandableTreeTable data={data} actions={[{name:"add", icon:FileOpen, handler:handleAddMock}, {name:"duplicate", icon:FileCopyOutlined, handler:handleDuplicateMock}, {name:"delete", icon:TimeToLeave, handler:handleDeleteMock}]}/>);
    
    const node = screen.getByText("Produce");
    expect(node).toBeInTheDocument();
  
    fireEvent.mouseEnter(node);
  
    const addIcon = screen.getByTestId("MuiActionIcon-Produce-13-add");
    expect(addIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("MuiActionIcon-Produce-13-delete");
    expect(deleteIcon).toBeInTheDocument();

    const duplicateIcon = screen.getByTestId("MuiActionIcon-Produce-13-duplicate");
    expect(duplicateIcon).toBeInTheDocument();
    
    fireEvent.click(addIcon);
    expect(handleAddMock).toHaveBeenCalledTimes(1);

    fireEvent.click(duplicateIcon);
    expect(handleDuplicateMock).toHaveBeenCalledTimes(1);

    fireEvent.click(deleteIcon);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  });

  //test the actions without sending the icon
  test("Add, Duplicate and Delete Action Icon without sending the icon",()=>{
    const handleAddMock = jest.fn();
    const handleDuplicateMock = jest.fn();
    const handleDeleteMock = jest.fn();

    render(<ExpandableTreeTable data={data} actions={[{name:"add", handler:handleAddMock}, {name:"duplicate", handler:handleDuplicateMock}, {name:"delete", handler:handleDeleteMock}]}/>);
    
    const node = screen.getByText("Produce");
    expect(node).toBeInTheDocument();
  
    fireEvent.mouseEnter(node);
  
    const addIcon = screen.getByTestId("Produce-13-addIcon");
    expect(addIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("Produce-13-deleteIcon");
    expect(deleteIcon).toBeInTheDocument();

    const duplicateIcon = screen.getByTestId("Produce-13-duplicateIcon");
    expect(duplicateIcon).toBeInTheDocument();
    
    fireEvent.click(addIcon);
    expect(handleAddMock).toHaveBeenCalledTimes(1);

    fireEvent.click(duplicateIcon);
    expect(handleDuplicateMock).toHaveBeenCalledTimes(1);

    fireEvent.click(deleteIcon);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  })
});

describe("Test the loaded data", ()=>{
  test("Loaded data textField", ()=>{
    render(<ExpandableTreeTable data={data} loadedData={loadedData} />);

    const node = screen.getByText("Meat");
    expect(node).toBeInTheDocument();

    const Icon = screen.getByTestId("Meat-22-icon-container");

    fireEvent.click(Icon);

    const child = screen.getByText("Beef Options");
    expect(child).toBeInTheDocument();

    // const switchElement = screen.getByRole('checkbox', { checked: false });
    // expect(switchElement).toBeInTheDocument();

    const childNodeValue = screen.getByDisplayValue("rare");
    expect(childNodeValue).toBeInTheDocument();


  });

  test("Loaded data switch",async ()=>{
    render(<ExpandableTreeTable data={data} loadedData={loadedData} />);

    const node = screen.getByText("Meat");
    expect(node).toBeInTheDocument();

    const Icon = screen.getByTestId("Meat-22-icon-container");

    fireEvent.click(Icon);

    const child = screen.getByText("Beef Options");
    expect(child).toBeInTheDocument();

    // const switchElement = screen.getByRole('checkbox', { checked: false });
    // expect(switchElement).toBeInTheDocument();

    const childNodeValue = screen.getByDisplayValue("rare");
    expect(childNodeValue).toBeInTheDocument();

    const combobox = screen.getAllByRole('button');
    expect(combobox.length).toBeGreaterThan(0);

    expect(combobox[0].textContent).toBe("rare");

    

    const targetComboBox = combobox[0];

    // Open the ComboBox dropdown
    userEvent.click(targetComboBox);
  
    // Wait for the dropdown to be visible
    await waitFor(() => {
      const dropdown = screen.getByRole('presentation');
      expect(dropdown).toBeInTheDocument();
    });
  
    // Wait for the options to be available
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
  
    // Find and click the option with text "nonCodeBook"
    const option = screen.getByText("welldone");
    userEvent.click(option);
  
    // Wait for the ComboBox to reflect the selected option
    await waitFor(() => {
      expect(targetComboBox).toHaveTextContent("welldone");
    });
  
  })
  

})

