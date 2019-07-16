import React, { Component, Fragment } from "react";
import AddNewResource from "./AddNewResource";
import AddNewRelated from "./AddNewRelated";
import SingleInput from "./SingleInput";
import SingleTextArea from "./SingleTextArea";
import GeneratedLink from "./GeneratedLink";
import "./Login.css";

class AddNewTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      generatedLink: null
    };

    super(props);

    this.handleSingle = this.handleSingle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = this.state.formData;
    const reqBody = {
      term: formData.term,
      definition: formData.definition,
      code_example: formData.code_example,
      topic: formData.topic,
      resources: Object.values(formData.resources),
      related_terms: Object.values(formData.related),
      term_slug: this.createSlug(formData.term),
      topic_slug: this.createSlug(formData.topic)
    };
    console.log(reqBody);
    this.sendFetch(reqBody);
  };

  sendFetch(obj) {
    return fetch("http://localhost:3000/api/addterm", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log(response);
        this.setState({
          generatedLink: [response.topic_slug, response.term_slug]
        });
      });
  }

  createSlug = input => {
    const output = input.toLowerCase();
    return output.replace(/\W/g, "");
  };

  handleSingle = (value, name) => {
    this.setState(prevState => ({
      formData: {
        // object that we want to update
        ...prevState.formData, // keep all other key-value pairs
        [name]: value // update the value of specific key
      }
    }));
  };

  handleMultiple = (value, name, index) => {
    this.setState(prevState => ({
      formData: {
        // object that we want to update
        ...prevState.formData, // keep all other key-value pairs
        [name]: { ...prevState.formData[name], [index]: value }
      }
    }));
  };

  render() {
    return (
      <Fragment>
        <div className="container justify-content-center">
          <h1 className="add-new-heading">Add New Term</h1>

          <form onSubmit={this.handleSubmit} id="addNew">
            <div className="add-new-wrapper">
              <SingleInput
                label="Term"
                placeholder="Term"
                type="text"
                name="term"
                controlFunc={this.handleSingle}
              />
              <SingleTextArea
                name="definition"
                label="Definition"
                controlFunc={this.handleSingle}
              />
              <SingleInput
                label="Code Example URL"
                placeholder="Code Example URL"
                type="url"
                name="code_example"
                controlFunc={this.handleSingle}
              />
              <SingleInput
                label="Topic"
                placeholder="Topic"
                type="text"
                name="topic"
                controlFunc={this.handleSingle}
              />
              <AddNewResource
                controlFunc={this.handleMultiple}
                name="resources"
              />
              <AddNewRelated controlFunc={this.handleMultiple} name="related" />
              <button
                type="submit"
                form="addNew"
                value="Submit"
                className="submit-new"
              >
                Submit
              </button>
            </div>
          </form>
          {this.state.generatedLink === null ? null : (
            <GeneratedLink
              topic={this.state.generatedLink[0]}
              term={this.state.generatedLink[1]}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default AddNewTerm;
