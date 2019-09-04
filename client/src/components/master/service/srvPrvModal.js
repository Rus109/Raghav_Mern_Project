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

export default class SrvPrdModal extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      providername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: "",
      modal: false
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      providername: this.state.providername,
      contactperson: this.state.contactperson,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      email: this.state.email,
      fax: this.state.fax,
      address: this.state.address
    };
    axios
      .post("http://localhost:4000/api/serviceprovider/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      providername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: ""
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
            Add To Service Provider
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div className="row">
                  <div className="col-6">
                    <Label>Provider Name: </Label>
                    <Input
                      type="text"
                      name="providername"
                      value={this.state.providername}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Contact Person: </Label>
                    <Input
                      type="text"
                      name="contactperson"
                      value={this.state.contactperson}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Label>Contact Number: </Label>
                    <Input
                      type="text"
                      name="contactno"
                      value={this.state.contactno}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Alternate Contact Number</Label>
                    <Input
                      type="text"
                      name="alternatecontactno"
                      value={this.state.alternatecontactno}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Fax</Label>
                    <Input
                      type="text"
                      name="fax"
                      value={this.state.fax}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <Label>Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block >
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
