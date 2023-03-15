import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownToggle,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarItem
} from "@patternfly/react-core";
import { InputGroup, DropdownItem } from "@patternfly/react-core";
import { ChipGroup, Chip } from "@patternfly/react-core";
import ParseLogic from "./ParseLogic";
import ApplyLogic from "./ApplyLogic";

export default function FilterIssues(props) {
  const issues = props.issues;
  const setFilteredIssues = props.setFilteredIssues;

  const isNotButtonRef = useRef(null);

  const [filters, setFilters] = useState(() => {
    return [];
  });

  const [inputFilterText, setInputFilterText] = useState(() => {
    return "";
  });

  const [filtersIsExpanded, setFiltersIsExpanded] = useState(() => {
    return false;
  });

  const [filterIsNot, setFilterIsNot] = useState(() => {
    return false;
  });

  const [dropdownLabel, setDropdownLabel] = useState(() => {
    return "Target";
  });

  const [filterSelectionItems, setFilterSelectionItems] = useState(() => {
    return [];
  });

  const [selectedFilter, setSelectedFilter] = useState(() => {
    return "";
  });

  const [logicString, setLogicString] = useState(() => {
    return "";
  });

  const [logicTree, setLogicTree] = useState(() => {
    return [];
  });

  const clearAllFilters = () => {
    notImplYet();
  };

  const notImplYet = () => {
    console.log("Not implemented yet");
  };

  const onFiltersToggle = () => {
    setFiltersIsExpanded((current) => !current);
  };

  const onChangeFilterText = (value) => {
    setInputFilterText(value);
  };

  // const applyFilter = () => {
  //     setFilteredIssues([]);

  //     if (selectedFilter &&
  //         inputFilterText) {
  //         setFilters(state => [...state, { target: selectedFilter.trim(), isNot: filterIsNot, filter: inputFilterText }])

  //         resetInput();
  //     }
  // };

  const applyFilter = () => {
    setLogicString(inputFilterText);

    resetInput();
  };

  const resetInput = () => {
    setSelectedFilter(null);

    setDropdownLabel("Target");

    setInputFilterText("");

    setFilterIsNot(false);
  };

  const isNotToggle = () => {
    setFilterIsNot((current) => !current);

    isNotButtonRef.current.blur();
  };

  const onDropdownSelect = (event, selection) => {
    const filter = event.target.text;

    setSelectedFilter(filter);

    setDropdownLabel(filter);

    onFiltersToggle();
  };

  const extractKeys = (object) => {
    return Object.keys(props.issues[0]);
  };

  useEffect(() => {
    if (props.issues[0]) {
      console.log(props.issues);

      const keys = extractKeys(props.issues[0]);

      if (keys) {
        setFilterSelectionItems(
          keys.map((column) => (
            <DropdownItem key={column}> {column} </DropdownItem>
          ))
        );
      }
    }
  }, [props.issues]);

  useEffect(() => {
    filters.map((filter) => {
      const fIssues = issues.filter(
        (obj) => obj[filter.target] == filter.filter
      );

      setFilteredIssues((current) => [...current, ...fIssues]);
    });
  }, [filters]);

  return (
    <React.Fragment>
      <InputGroup>
        <Dropdown
          onSelect={onDropdownSelect}
          toggle={
            <DropdownToggle onToggle={onFiltersToggle}>
              {dropdownLabel}
            </DropdownToggle>
          }
          isOpen={filtersIsExpanded}
          dropdownItems={filterSelectionItems}
        />
        <Button
          id="filterIsNotButton"
          variant="control"
          onClick={isNotToggle}
          isActive={filterIsNot}
          ref={isNotButtonRef}
        >
          not
        </Button>
        <TextInput
          id="textInput-with-dropdown"
          aria-label="input with dropdown and button"
          value={inputFilterText}
          onChange={onChangeFilterText}
        />
        <Button id="applyFilterButton" variant="control" onClick={applyFilter}>
          Apply filter
        </Button>
      </InputGroup>
      <ChipGroup categoryName="Category one" isClosable>
        {filters.map((filter) => (
          <Chip key={filter.target}>
            {filter.target + ":" + filter.isNot + ":" + filter.filter}
          </Chip>
        ))}
      </ChipGroup>
      <ParseLogic logicString={logicString} setLogicTree={setLogicTree} />
      <ApplyLogic
        logicTree={logicTree}
        issues={issues}
        setFilteredIssues={setFilteredIssues}
      />
    </React.Fragment>
  );
}
