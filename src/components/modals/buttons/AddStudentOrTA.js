import React from "react";
import {Button } from "antd";


class AddStudentOrTA extends React.Component {
    constructor(props){
        super(props);
        this.exportFunction = this.exportFunction.bind(this);
    }

    exportFunction() {
        if(this.props.isStudent === "true"){
            console.log("StudentButton")
        } else {
            console.log("TA Button")
        }
    }

    render(){
        const title = this.props.title
        return(
            <Button onClick={this.exportFunction}>
                {title}
            </Button>
        );
    }
}
export default AddStudentOrTA;
