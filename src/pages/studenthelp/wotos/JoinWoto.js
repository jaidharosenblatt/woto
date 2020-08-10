import React, { useContext } from "react";
import { Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";

const JoinWoto = ({ relevantDiscussions, helpKey }) => {
  const { state } = useContext(HelpContext);

  return (
    <Card
      loading={state.loading}
      headStyle={{ padding: "14px 16px" }}
      title={<h2>Find a Woto Room</h2>}
    >
      <Space direction="vertical">
        {relevantDiscussions.length > 1 ? (
          <p>
            There are already{" "}
            <strong> {relevantDiscussions.length} Woto Rooms </strong>
            working on {state.description[helpKey]}. Try joining one of them
            while you wait for your turn with a TA
          </p>
        ) : (
          <p>
            There is another student working on {state.description[helpKey]}.
            Try joining them one you wait for your turn with a TA
          </p>
        )}

        <Button loading={state.loading} type="primary">
          Find a Woto Room
        </Button>
      </Space>
    </Card>
  );
};

export default JoinWoto;
