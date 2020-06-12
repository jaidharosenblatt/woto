import React from "react";
import { Form, Radio } from "antd";


/**
 * Segmented control with three options
 * @param name the name of the field to output
 * @param label the label of the radio group
 * @param onClick function to call on click
 * @param options, array of strings containing button options
 * @param values, array of strings containing button values, with indices
 *that correspond to the indices of options
 */

 const SegmentedControlD = ({
   name,
   label,
   onChange,
   options=[],
   values=[]
 }) => {

   return (
     <Form.Item name={name} label ={label}>
       <Radio.Group
         defaultValue ="Student"
         buttonStyle="solid"
         className="SegmentedController"
         onChange={onChange}
         name={name}>
            {options.map(function(option, index){
              return <Radio.Button value = {values[index]}> {option} </Radio.Button>;
            })}

       </Radio.Group>
     </Form.Item>
   );
 };

 export default SegmentedControlD;
