import React, { useState } from "react";
import { Select } from "antd";

export default function SelectWithAdd(props) {
  const { options, ...propsWithoutOptions } = props;
  const [optionsWithSearch, setOptionsWithSearch] = useState(options);

  const handleSearch = (search) => {
    if (search?.length > 0) {
      setOptionsWithSearch(options.concat(search));
    }
  };
  return (
    <Select {...propsWithoutOptions} showSearch onSearch={handleSearch}>
      {optionsWithSearch.map((option, i) => (
        <Select.Option key={i} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
}
