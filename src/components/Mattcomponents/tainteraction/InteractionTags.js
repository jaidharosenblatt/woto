import React from 'react';
import {Tag} from 'antd';

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 *
 */

const InteractionTags = ({tag1,tag2,tag3}) => {
  return(<div>
    <Tag> {tag1} </Tag>
    <Tag> {tag2} </Tag>
    <Tag> {tag3} </Tag>


      </div>);
}

export default InteractionTags;
