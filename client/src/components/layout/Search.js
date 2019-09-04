import React from "react";
import { MDBInput, MDBCol } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol md="12">
      <MDBInput hint="Search" type="text" containerClass="mt-1" />
    </MDBCol>
  );
}

export default SearchPage;