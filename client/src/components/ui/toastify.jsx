import React, { Component } from 'react';
import { toast } from 'react-toastify';

let settings = {
  type: "success", // AS DEFAULT
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

const ShowToaster = (type, message) => {
  settings.type = type;
  toast(<>{message}</>, settings);

};

class Toaster extends Component {
  success(message) {
    ShowToaster("success", message);
  }
  info(message) {
    ShowToaster("info", message);
  }
  warn(message) {
    ShowToaster("warning", message);
  }
  error(message) {
    ShowToaster("error", message);
  }
}

export default new Toaster();
