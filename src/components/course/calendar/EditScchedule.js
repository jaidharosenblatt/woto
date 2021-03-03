import React from 'react'
import {Table, Button,  Popconfirm, TimePicker, Select, Tag} from 'antd';
import moment from 'moment';
import  { useState } from 'react';


/**
 * Will allow Admins to edit schedule
 * @param {Object} evt temporary event object from schedule
 */

class EditSchedule extends React.Component{

constructor(){
    super()

    const format = 'HH:mm'
    // use name and id
    const options = [{ name: 'John Smith', _id:"1" }, { value: 'Nana Thomas',  _id:"2" }, { value: 'Alexander Wang',  _id:"3" }, { value: 'Darren Williams',  _id:"4" }];
    
     this.columns = [
        {title: '',
        dataIndex: 'sess_num',},
        {title: 'Start Time',
        dataIndex: 'start_time',
        render: (_, item) => (
        <TimePicker  defaultValue={moment('00:00', format)} format={format} />)},

        {title: 'End Time',
        dataIndex: 'end_time',
        render: (_, item) => (
        <TimePicker  defaultValue={moment('00:00', format)} format={format} />)},
              
        {title: 'Teaching Assistants',
        dataIndex: 'teach_assist',
        render: (_, item) => (
          <Select
          mode="multiple"
          showArrow
          tagRender={this.tagRender}
          
          style={{ width: '100%' }}
          options={options}
        />)},

        {title: '',
        dataIndex: 'delete',
        render: (_, item) => (
          <Popconfirm title="Are you sure you want to Delete?" onConfirm={() => this.handleDelete(item.key)}>
          <a>Delete Session</a>
          </Popconfirm>)}]

    this.state = {
         data: [
            {
                key: '1',
                sess_num: 'Session 1',
                
            }
        ],
        count: 2 
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

}


handleDelete = (key) => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  };

handleAdd = () => {
  const { count, data } = this.state;
  const newData = {
    key: count,
    sess_num: `Session ${count}`,  
  };
  this.setState({
    data: [...data, newData],
    count: count + 1,
  });
  };



   tagRender(props) {
    const { label, closable, onClose } = props;
    return (
      <Tag color={'blue'} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

render(){     
     return(
         <div>
           <Button onClick={this.handleAdd} type="primary" style={{right: "-89%", width: "10%",marginBottom: 16,}}> Add Session </Button>
            <Table title={() => 'Sunday'} dataSource={this.state.data} columns={this.columns} />
            <Button onClick = {this.props.saveDay} type="primary" style={{ left: "1%", width: "10%",marginBottom: 16,}}> Save </Button>       
         </div>
         ) 
    }
}


export default EditSchedule
