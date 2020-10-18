import React from "react";
import { Card, Space, Button } from "antd";

const JoinWoto = ({
  loading,
  studentCount,
  filterValue,
  handleFind,
  handleCreate,
}) => {
  return (
    <Card loading={loading} title={<h2>Find a Woto Room</h2>}>
      <Space direction="vertical">
        {studentCount > 1 ? (
          <p>
            There are already <strong> {studentCount} students </strong>
            working on {filterValue}. Try joining one of them while you wait for
            your turn with a TA
          </p>
        ) : (
          <p>
            There is another student working on {filterValue}. Try joining them
            while you wait for your turn with a TA
          </p>
        )}

        <Button block onClick={handleFind} loading={loading} type="primary">
          Find a Woto Room
        </Button>
        <p>
          Or, if you've done this before. Click{" "}
          <b onClick={handleCreate}>here</b> to create your own Woto Room
        </p>
      </Space>
    </Card>
  );
};

export default JoinWoto;
