import React, { useContext, useState, useEffect, useCallback } from "react";
import { loadCourses, loadSession } from "../../ducks/session";
import API from "../../api/API";
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import { AuthContext } from "../../contexts/AuthContext";

const ReduxTester = (props) => {
    const authContext = useContext(AuthContext);
    
    const testFunc = async () => {
        const courses = await API.getCourses();
        console.log(courses);
        const courseIDs = courses.map((course) => course._id);
        console.log(courseIDs);
        console.log(authContext.state.user._id);
        await props.loadCourses(courseIDs, authContext.state.user._id);
    };

    
    
    return (
        <Card>
          <Button onClick={testFunc}>loadCourses</Button>
        </Card>
    );

    
};

const mapStateToProps = state => {
    return {
        session: state.session
    };
};

export default connect(mapStateToProps, { loadCourses, loadSession })(ReduxTester);