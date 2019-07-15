import React, { Component, Fragment } from "react";



class SingleTextArea extends Component {

callback = (e) => {
  e.preventDefault()
  const value = e;
  this.props.controlFunc(e.target.value, this.props.name)
}

    render() {
        return (
          <Fragment>
    <div className="loginEmail">
          <label htmlFor={this.props.name}>{this.props.label}</label>
<textarea rows="3" name={this.props.name} onChange={this.callback} />
    </div>

          </Fragment>
        );
    }
}

export default SingleTextArea
