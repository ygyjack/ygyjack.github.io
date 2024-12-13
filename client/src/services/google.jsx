import React, { Component } from "react";
import * as queryString from 'query-string';
import Api from "./../api/api";

class AuthGoogle extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(props.location.search);


    console.log('An error occurred:',params);
    const token = Api.getAccessTokenFromCode(params.code);
    const result = Api.getGoogleDriveFiles(token);
    console.log(' =========== result =========== ',result);




    Api.getAccessTokenFromCode(params.code)
    .then(res => {
      console.log(' =========== getAccessTokenFromCode Yes =========== ',res);
      return Api.getGoogleDriveFiles(token);
    }, err => console.log(' =========== getAccessTokenFromCode No =========== ',err))
    .then(res => {
      console.log(' =========== getGoogleDriveFiles Yes =========== ',res);
    }, err => console.log(' =========== getGoogleDriveFiles No =========== ',err));





  }







  render() {
    return (
      <></>
    )
  }

  // const urlParams = queryString.parse(window.location.search);
  //
  // if (urlParams.error) {
  //   console.log(`An error occurred: ${urlParams.error}`);
  // } else {
  //   console.log(`The code is: ${urlParams.code}`);
  // }
}

export default AuthGoogle;
