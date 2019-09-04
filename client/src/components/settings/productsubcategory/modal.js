import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

export default class ProSubModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      category: "",
      description: "",
      modal: false
    };
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      category: this.state.category,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/productcategory/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      category: "",
      description: ""
    });
    // Close modal
    this.toggle();
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          <i className="fas fa-plus" />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add To Product Category
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Add Category"
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                />
                <br />
                <Label for="item">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Add Description"
                  col="15"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
