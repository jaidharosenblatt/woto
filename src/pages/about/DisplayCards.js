import React from "react";
import { Card, Row } from "antd";
const { Meta } = Card;

const DisplayCards = ({ people }) => {
  var renderedCards = [];

  people.forEach((person, key) => {
    renderedCards.push(
      <Card key={key} cover={<img alt="example" src={person.image} />}>
        <Meta title={person.name} description={person.title} />
      </Card>
    );
  });

  return <Row>{renderedCards} </Row>;
};

export default DisplayCards;
