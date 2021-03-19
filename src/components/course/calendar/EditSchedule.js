import React from "react";
import { Table, Button, Popconfirm, Row } from "antd";
import AddScheduleSession from "./AddScheduleSession";
import EditScheduleSession from "./EditScheduleSession";

/**
 * Will allow Admins to edit schedule
 * @param {Object} evt temporary event object from schedule
 */

class EditSchedule extends React.Component {
  constructor() {
    super();

    this.columns = [
      {
        title: "Start Time",
        dataIndex: "start_time",
        key: "startTimeKey",
      },

      {
        title: "End Time",
        dataIndex: "end_time",
        key: "endTimeKey",
      },

      {
        title: "Teaching Assistants",
        dataIndex: "teach_assist",
      },
      {
        title: "",
        dataIndex: "edit",
        render: (_, item) => (
          <Popconfirm
            title="Are you sure you want to edit?"
            onConfirm={() => this.editSession(item.key)}
          >
            <a>Edit Session</a>
          </Popconfirm>
        ),
      },
      {
        title: "",
        dataIndex: "delete",
        render: (_, item) => (
          <Popconfirm
            title="Are you sure you want to Delete?"
            onConfirm={() => this.handleDelete(item.key)}
          >
            <a>Delete Session</a>
          </Popconfirm>
        ),
      },
    ];

    this.state = {
      data: [
        {
          start_time: "9am",
          end_time: "11am",
          teach_assist: "Jasmine Harris",
          key: "0",
        },
      ],
      count: 1,
      showAddSchedule: false,
      showEditSchedule: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addSession = this.addSession.bind(this);
    this.editSession = this.editSession.bind(this);
  }

  handleDelete = (key) => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  };

  handleAdd = (value) => {
    const { count, data } = this.state;
    const newData = {
      start_time: value.startTime,
      end_time: value.endTime,
      teach_assist: value.teach.map((ta) => <h4>{ta}</h4>),
      key: count,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
      showAddSchedule: false,
    });
  };

  addSession() {
    this.setState({
      showAddSchedule: true,
    });
  }

  editSession() {
    this.setState({
      showEditSchedule: true,
    });
  }

  render() {
    var sessionData = this.state.data;

    return (
      <div>
        {this.state.showAddSchedule ? (
          <AddScheduleSession onFinishAdd={this.handleAdd.bind(this)} />
        ) : null}

        {this.state.showEditSchedule
          ? this.state.data.map((item) => (
              <EditScheduleSession
                editKey={item.key}
                teachEdit={item.teach_assist}
                startEdit={item.start_time}
                endEdit={item.end_time}
                onFinishEdit={this.handleAdd.bind(this)}
              />
            ))
          : null}

        <div>
          <h2>{this.props.dayOfWeek}</h2>
          <Button
            onClick={this.addSession}
            type="primary"
            style={{ right: "-89%", width: "10%", marginBottom: 16 }}
          >
            Add Session
          </Button>

          <Table dataSource={this.state.data} columns={this.columns} />
          <Row
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "20%",
              }}
            >
              Save
            </Button>
          </Row>
        </div>
      </div>
    );
  }
}

export default EditSchedule;
