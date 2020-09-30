import React, { useEffect } from "react";
import { Card, Row } from "antd";
const { Meta } = Card;

const DisplayCards = ({ people }) => {
  var renderedCards = [];

  const description = (description) =>  {
    return description ? (
      <div className="describe">
          <p>{description}</p>
      </div>
    ) : (
      null
    );
  };

  people.forEach((person, key) => {
    renderedCards.push(
      <div key={key} className="card-wrapper">
        <Card bordered={false} className="person" cover={<img alt="example" src={person.image} />}>
          <Meta title={person.name} description={person.title} />
        </Card>
        {description(person.description)}
      </div>
    );
  });

  return <Row justify="center">{renderedCards} </Row>;
};

export default DisplayCards;
