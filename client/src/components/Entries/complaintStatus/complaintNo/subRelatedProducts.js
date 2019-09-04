import React, { Component, Fragment } from 'react';
import isEmpty from '../../../../validation/is-empty';

export default class SubRelatedProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){

    }

    componentWillReceiveProps(){
      console.log("true")
    }
  render() {
    
   let rowDataAssign;
   let rowDataComplaints;
   let NewRowData;
   let OriginalData1 = this.props.obj1;
   let OriginalData2 = this.props.obj2;
   let OriginalDataNew = this.props.newObj;


    for(let i = 0; i < OriginalData1.length; i++){
      rowDataAssign = <tr disabled = "true">
          <td>{OriginalData1[i].serialno}</td>
          <td>{OriginalData1[i].modelno}</td>
          <td>{OriginalData1[i].category}</td>
          <td>{OriginalData1[i].subcategory}</td>
          <td>{OriginalData1[i].oem}</td>
          <td></td>
      </tr>
    }

    for(let i = 0; i < OriginalData2.length; i++){
      rowDataComplaints = <tr disabled = "true">
          <td>{OriginalData2[i].serialno}</td>
          <td>{OriginalData2[i].modelno}</td>
          <td>{OriginalData2[i].category}</td>
          <td>{OriginalData2[i].subcategory}</td>
          <td>{OriginalData2[i].oem}</td>
          <td></td>
      </tr>
    }

    NewRowData = OriginalDataNew.map(i1 => {
      return <tr>
          <td>{i1.serialno}</td>
          <td>{i1.modelno}</td>
          <td>{i1.category}</td>
          <td>{i1.subcategory}</td>
          <td>{i1.oem}</td>
        <td></td>
      </tr>
    })
    
    return (
      <Fragment>
        {rowDataAssign}
        {rowDataComplaints}
        {NewRowData}
      </Fragment>
    )
  }
}
