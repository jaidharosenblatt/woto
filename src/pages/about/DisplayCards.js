import React from 'react';
import {Card, Row} from 'antd';
const { Meta } = Card;

const DisplayCards = ({people}) =>{
    var renderedCards = [];
    
    people.forEach((person) => {
        renderedCards.push(
        <Card style={{width:"200px"}} cover={<img alt="example" src= {person.image}/>} >
         <Meta title ={person.name} description={person.title} />
        </Card>);
      });
   
     return (<Row gutter={[20,20]}>{renderedCards} </Row>);
};
    
export default DisplayCards;