import React from "react";
import { Tag, Button } from "antd";
import CardTableTA from "./CardTableTA";

/*
@TommyTilton
This is really a data loading page. The TA_COLUMNS constant is 
array of columns and how they should be formatted. Pass the data to
 CardTableTA Component which will format the rest of the card.
*/
class TaTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: null, data: null, columns: null };
  }
  //Set state data, columns, status variables
  componentDidMount() {
    this.setState({ status: this.props.status });
    this.setState({ data: TA_DATA });
    if (this.props.status === "false") {
      this.setState({ columns: TA_Enabled_COLUMNS });
    } else {
      this.setState({ columns: TA_Disabled_COLUMNS });
    }
  }
  /*
when TA changes screen to helping student, status changes and table changes. 
Need to use a different collumn set.
*/
  /*
 static getDerivedStateFromProps(props, state) {
   if (props.title !== state.title) {
     return{
       title: props.title,
       stateData: this.state.stateData,
       stateColumns: props.columns,
     };
   }
 }
*/

  static getDerivedStateFromProps(props, state) {
    if (props.status !== state.status) {
      if (props.status === false) {
        return {
          status: props.status,
          data: state.data,
          columns: TA_Enabled_COLUMNS,
        };
      } else {
        return {
          status: props.status,
          data: state.data,
          columns: TA_Disabled_COLUMNS,
        };
      }
    }
    return null;
  }
  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.state.status) {
      this.setState({ status: nextProps.status });
      if (nextProps.status === false) {
        this.setState({ columns: TA_Enabled_COLUMNS });
      } else {
        this.setState({ columns: TA_Disabled_COLUMNS });
      }
    }
    console.log(this.state.columns);
  }
  */
  //Function to determine which table to return
  content = (status) => {
    if (status === false) {
      return (
        <CardTableTA
          data={TA_DATA}
          columns={TA_Enabled_COLUMNS}
          title="Help Students"
          description=""
        />
      );
    } else {
      return (
        <CardTableTA
          data={TA_DATA}
          columns={TA_Disabled_COLUMNS}
          title="Students Waiting"
          description="Disabled when you are helping a student"
        />
      );
    }
  };
  //Return table
  render() {
    return (
      <div className="past interactions main">
        {this.content(this.props.status)}
      </div>
    );
  }
}

export default TaTable;

//All the code below is for formatting columns and preparing data

//Assign color to Stage tag
const createTag = (stage) => {
  if (stage === "Just Started") {
    return (
      <Tag
        style={{ borderRadius: "20px" }}
        color="green"
        key={stage}
      >{`${stage}`}</Tag>
    );
  } else if (stage === "Debugging Solution") {
    return (
      <Tag
        style={{ borderRadius: "20px" }}
        color="volcano"
        key={stage}
      >{`${stage}`}</Tag>
    );
  } else {
    return (
      <Tag
        style={{ borderRadius: "20px" }}
        color="purple"
        key={stage}
      >{`${stage}`}</Tag>
    );
  }
};

//Collumn Setup for HELP STUDENTS COLUMNS (BUTTONS ENABLED)

const TA_Enabled_COLUMNS = [
  {
    title: "Group Lead",
    key: "fullName",
    render: (text, record) => (
      <h4>{`${record.firstname} ${record.lastname}`}</h4>
    ),
    fixed: "left",
    width: 50,
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "HW #",
    dataIndex: "hwNumber",
    key: "hwNumber",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "Problem #",
    dataIndex: "problemNumber",
    key: "problemNumber",
    width: 60,
    //responsive: ['sm'],
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
    render: (stage) => <>{createTag(stage)}</>,
    width: 80,
  },
  {
    title: "",
    dataIndex: "link",
    key: "link",
    fixed: "right",
    width: 50,
    render: (link) => (
      <Button type="primary" href={link} target="_blank">
        Help
      </Button>
    ),
  },
];

//Collumn Setup for STUDENTS WAITING COLUMNS (HELP BUTTON DISABLED)
const TA_Disabled_COLUMNS = [
  {
    title: "Group Lead",
    key: "fullName",
    render: (text, record) => (
      <h4>{`${record.firstname} ${record.lastname}`}</h4>
    ),
    fixed: "left",
    width: 50,
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "HW #",
    dataIndex: "hwNumber",
    key: "hwNumber",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "Problem #",
    dataIndex: "problemNumber",
    key: "problemNumber",
    width: 60,
    //responsive: ['sm'],
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
    render: (stage) => <>{createTag(stage)}</>,
    width: 80,
  },
  {
    title: "",
    dataIndex: "link",
    key: "linkDisable",
    fixed: "center",
    width: 50,
    render: (link) => (
      <Button type="primary" href={link} target="_blank" disabled>
        Help
      </Button>
    ),
  },
];

//Student info setup

const TA_DATA = [
  {
    key: "1",
    firstname: "Rptj",
    lastname: "Karpel",
    size: "1",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    link: "https://zoom.us/",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    size: "1",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    link: "https://zoom.us/",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    size: "2",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    link: "https://zoom.us/",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    size: "2",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    link: "https://zoom.us/",
  },
];
