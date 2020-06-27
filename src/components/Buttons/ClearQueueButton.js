import React from "react";
import {Button } from "antd";


class ClearQueueButton extends React.Component {
    constructor(props){
        super(props);
        this.exportFunction = this.exportFunction.bind(this);
    }

    exportFunction() {
        console.log("hello");
    }

    render(){
        const title = this.props.title
        return(
            <Button onClick={() => this.props.clearFunc}>
                {title}
            </Button>
        );
    }
}
export default ClearQueueButton;


/*
   <ClearQueueButton
                  title="Clear Queue"
                  clearFunc={this.clearQueue}
                />
*/