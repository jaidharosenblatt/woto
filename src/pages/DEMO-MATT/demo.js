import React from 'react';
import { Row, Col} from 'antd';
import HelpReady from "../../components/Mattcomponents/helpready/HelpReady";
import TAInteraction from "../../components/Mattcomponents/tainteraction/TAInteraction";
import TimeSelector from "../opensession-ta/TimeSelector";

/**
 * @matthewsclar
 *Page for me to demo my components and develop/debug
 */


const Demo = () =>{
  return (<div>
    <Row >
        <Col xs={24} lg={14}>
          <HelpReady />
        </Col>
      </Row>
        <br/>
          <br/>
          <br/>
        <br/>

      <Row align="center">
        <Col xs={24} lg={18}>
          <TAInteraction />
        </Col>
     </Row>

     <br/>
       <br/>
       <br/>
     <br/>

     </div>
  )
}

export default Demo;
