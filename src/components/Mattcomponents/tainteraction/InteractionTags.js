import React from 'react';
import {Tag,Col, Space} from 'antd';

/**
 * @matthewsclar Component that displays tags
 * @param {options} tag, the name of a tag associated with the interaction
 */

const InteractionTags = ({options}) => {

  const tags = [];
  options.forEach((option) => {
    tags.push(<Tag> {option.tag} </Tag>
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
