import React, { useState } from "react";
import { Select } from "antd";
import TrieSearch from "trie-search";

/**
 * Render a select field that allows searching of items and additional options
 * It's a shame that Ant.design doesn't support this already...
 * @param {Array} options list of options to render
 * @param {Object} propsWithoutOptions any other props passed in
 */
export default function SelectWithAdd(props) {
  const { options, ...propsWithoutOptions } = props;
  const [optionsWithSearch, setOptionsWithSearch] = useState(options);

  // use a trie package to get quick checks for prefixes
  const optionsTree = new TrieSearch("value");
  optionsTree.addAll(
    options.map((option) => {
      return { value: option };
    })
  );

  // add the current search value to options if it doesn't already exist
  const handleSearch = (search) => {
    const existsInOptions = optionsTree.get(search).length > 0;
    if (!existsInOptions && search?.length > 0) {
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
