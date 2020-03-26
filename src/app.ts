import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from './components/main'

window.onload = () => {
    ReactDOM.render(
        React.createElement(Main),
        document.getElementById('container')
      );    
};