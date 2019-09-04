import React, { Component } from 'react';
import axios from 'axios';

export default class ComplaintStatusClosed extends Component {
    constructor(props) {
    super(props);
    this.state = {
      closed: [],
      assigneddate: '',
      assignedengineer: '',
      closedate: ''
    } 
  }
  componentDidMount(){
console.log("complaint", this.props.obj)

      axios
        .get("http://localhost:4000/api/complaintstatus/assign/")
        .then(res => {
          console.log(res.data)
          res.data.map(i1 => {
            let tempassigncomplaintsdetails = [i1.assigncomplaintsdetails];
            tempassigncomplaintsdetails.map(i2 => {
              if(this.props.obj._id === i2._id){
                var dateassigndatetime = new Date(i1.assigndatetime);
                var dataDatecomplaintdate = dateassigndatetime.toISOString().substr(0, 10);
                this.setState({
                  assigneddate: dataDatecomplaintdate,
                  assignedengineer: i1.assignengineer.name
                })
              }  
              return true;
            })
          })
        });

        axios
        .get("http://localhost:4000/api/complaintstatus/complete/")
        .then(res => {
          console.log(res.data)
          res.data.map(c1 => {
            let tempdeliverid = [c1.deliverid]
            tempdeliverid.map(c2 => {
              let tempdelivercaseid = [c2.delivercaseid]
              tempdelivercaseid.map(c3 => {
                let tempreceivedcaseid = [c3.receivedcaseid]
                tempreceivedcaseid.map(c4 => {
                  let tempsenttocaseid = [c4.senttocaseid]
                  tempsenttocaseid.map(c5 => {
                    let tempcomplaintno = [c5.complaintno]
                    tempcomplaintno.map(c6 => {
                      let tempfeedback = [c6.feedback]
                      tempfeedback.map(c7 => {
                        if(this.props.obj._id === c7._id){
                          var datedateandtime = new Date(c1.dateandtime);
                          var dataDatedateandtime = datedateandtime.toISOString().substr(0, 10);

                          this.setState({
                            closedate: dataDatedateandtime
                          })
                        }
                      })

                    })
                  })
                })
              })
            })
          })
        })
  }
  render() {

let serialno;
var datecomplaintdate = new Date(this.props.obj.complaintdate);
var dataDatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);

this.props.obj.complaints_pro_details.map(item => {
  serialno = item.complaints_serialno
})

    return (
        <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>{this.props.obj.status}</td>
        <td>{this.state.closedate}</td>
      </tr>
    )
  }
}
