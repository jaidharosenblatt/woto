import { Row, Col } from 'antd';
import React from "react";
import Mobile from "./components/NavBar/Mobile";


const SplashPage = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Mobile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default SplashPage
