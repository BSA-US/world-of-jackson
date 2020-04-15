import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from './components/main'

window.onload = () => {

    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    ReactDOM.render(
        React.createElement(Main),
        document.getElementById('container')
      );    
};