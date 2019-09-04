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

export default class CsdModal extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      customername: "",
      customertype: [],
      ctype: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: "",
      modal: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customertype")
      .then(response => {
        this.setState({ customertype: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeKey(e) {
    this.setState({
      ctype: e.target.value
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
      customername: this.state.customername,
      customertypeid: this.state.ctype,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      email: this.state.email,
      fax: this.state.fax,
      address: this.state.address
    };
    axios
      .post("http://localhost:4000/api/customer/add", obj)
      .then(res => console.log(res.data));
    this.toggle();
  }

  render() {
    const ctype = this.state.customertype.map((CT, i) => (
      <option key={i} value={CT._id}>
        {CT.customertype}
      </option>
    ));
    return (
      <div className="container">
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          <i className="fas fa-plus" />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Customer</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div className="row">
                  <div className="col-6">
                    <Label>Customer Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Customer Name"
                      value={this.state.customername}
                      name="customername"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Customer Type</Label>
                    <Input
                      type="select"
                      placeholder="Enter Customer Type"
                      value={this.state.ctype}
                      onChange={this.onChangeKey}
                    >
                      <option value="select">Select</option>
                      {ctype}
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Label>Contact Number</Label>
                    <Input
                      type="text"
                      placeholder="Enter Contact Number"
                      value={this.state.contactno}
                      name="contactno"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Alternate Contact Number</Label>
                    <Input
                      type="text"
                      placeholder="Enter Alternate Contact Number"
                      value={this.state.alternatecontactno}
                      name="alternatecontactno"
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      value={this.state.email}
                      name="email"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <Label>Fax</Label>
                    <Input
                      type="text"
                      placeholder="Enter Fax"
                      value={this.state.fax}
                      name="fax"
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <Label for="address">Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  id="address"
                  placeholder="Add Address"
                  col="15"
                  value={this.state.address}
                  onChange={this.onChange}
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
