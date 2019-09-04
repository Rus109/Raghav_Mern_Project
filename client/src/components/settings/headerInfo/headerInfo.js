import React, { Component } from "react";
import header from "./header.jpg";

class HeaderInfo extends Component {
  render() {
    return (
      <div className="container">
        <div
          className="card text-white bg-info mx-auto "
          style={{ width: "589px", fontFamily: "Varela Round" }}
        >
          <div className="card-header mx-auto">
            {" "}
            <h1>Header Info</h1>
          </div>
          <div className="card-body">
            <div class="row">
              <div class="col-8">
                <div className="row">
                  <div className="col-md-9 m-auto">
                    <div className="row">
                      <h5>Company Name:</h5>
                      <h5> Nice Infotech</h5>
                    </div>
                    <div className="row">
                      <h5>Contact Number:</h5>
                      <h5>03642500260</h5>
                    </div>
                    <div className="row">
                      <h5>Email:</h5>
                      <h5>admin@niceinfotech.co</h5>
                    </div>
                    <div className="row">
                      <h5>Adderss:</h5>
                      <h5>
                        2nd Floor Geeta Bhavan, Thana Road, Polize Bazaar,
                        Shillong
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-4">
                <img src={header} alt="Header" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HeaderInfo;
