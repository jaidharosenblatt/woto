import React from "react";
import {Button } from "antd";
import { CSVLink } from 'react-csv';

class ExportCSVButton extends React.Component {
    constructor(props){
        super(props);
        this.exportFunction = this.exportFunction.bind(this);
    }

    exportFunction() {
        console.log(this.props.data)

    }

    render(){
        const title = this.props.title
        return(
            <Button onClick={this.exportFunction}>
                <CSVLink data={this.props.data} filename='RosterData'>
                    {title}
                </CSVLink>
            </Button>
        );
    }
}
export default ExportCSVButton;

/*
<Button onClick={this.exportFunction}>
                {title}
            </Button>
            */