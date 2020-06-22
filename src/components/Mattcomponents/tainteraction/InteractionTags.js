import React from 'react';
import {Tag, Space} from 'antd';

/**
 * @matthewsclar Component that displays tags
 * @param {options} tag, the name of a tag associated with the interaction
 * Returns either mobile tags in a vertical line or dekstop tags in horizontal line
 * Must use CSS to set display of one to none.
 */

const InteractionTags = ({options}) => {

  const tags = [];
  options.forEach((option, key) => {
    tags.push(<Tag key> {option.tag} </Tag>
    );
  });

  return(<div>
    <div className ="MobileTags">
      <Space direction="vertical">
        <h2> Tags </h2>
        {tags}
      </Space>
    </div>
    <div className ="DesktopTags">
      <Space size="small">
        {tags}
      </Space>
    </div>
  </div>);
}

export default InteractionTags;
