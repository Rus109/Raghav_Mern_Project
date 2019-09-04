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

export default class CustomerTypeModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeCustomerType = this.onChangeCustomerType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customertype: "",
      description: "",
      modal: false
    };
  }
  onChangeCustomerType(e) {
    this.setState({
      customertype: e.target.value
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
      customertype: this.state.customertype,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/customertype/add", obj)
      .then(res => console.log(res.data));
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
          <ModalHeader toggle={this.toggle}>Add To Customer Type</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="customertype">Customer Type</Label>
                <Input
                  type="text"
                  name="customertype"
                  id="customertype"
                  placeholder="Add Customer Type"
                  value={this.state.customertype}
                  onChange={this.onChangeCustomerType}
                />
                <br />
                <Label for="description">Description</Label>
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
