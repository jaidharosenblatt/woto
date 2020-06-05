import React from 'react';
import { Card } from 'antd';

//component should be passed an avatar, title, status, and taType prop
/**
 * @param {avatar} props the title passed in
 * @param {title} props the title passed in
 */
const TeachingStaff = (props) => {  

    return (
     <Card>
       {props.title}
     </Card>
)
}

export default TeachingStaff;