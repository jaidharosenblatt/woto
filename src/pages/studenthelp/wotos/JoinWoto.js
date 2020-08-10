import React, { useContext } from "react";
import { Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";

const JoinWoto = ({ relevantDiscussions, filterValue, handleFind }) => {
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
            working on {filterValue}. Try joining one of them while you wait for
            your turn with a TA
          </p>
        ) : (
          <p>
            There is another student working on {filterValue}. Try joining them
            one you wait for your turn with a TA
          </p>
        )}

        <Button
          block
          onClick={handleFind}
          loading={state.loading}
          type="primary"
        >
          Find a Woto Room
        </Button>
      </Space>
    </Card>
  );
};

export default JoinWoto;
