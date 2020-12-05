import React from "react";
import {Button } from "antd";


class ImportCSVButton extends React.Component {
    constructor(props){
        super(props);
        this.import = this.importFunction.bind(this);
    }

    importFunction() {
        console.log("IMPORT FUNCTION")
    }

    render(){
        const title = this.props.title
        return(
            <Button onClick={this.importFunction}>
                {title}
            </Button>
        );
    }
}
export default ImportCSVButton;
