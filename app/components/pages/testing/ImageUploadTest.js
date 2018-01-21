import React, { Component } from 'react';
import ImageUploader from "react-images-upload";
import MessageBox from "../shared/MessageBox";

export default React.createClass(  {

   getInitialState() {
    return {
      id: this.props.params.id,
      name: "",
      password: "",
      role: "",
      loginFailCount: "",
      expectedKcal: "",
      message: ""
    }
  },

  onDrop(picture) {
    this.setState({
	pictures: this.state.pictures.concat(picture),
    });
  },

  render() {
    return (
	<ImageUploader
    withIcon={true}
    buttonText='Choose images'
    onChange={this.onDrop}
    imgExtension={['.jpg', '.gif', '.png']}
    maxFileSize={5242880}
    />
    );
  }
});
