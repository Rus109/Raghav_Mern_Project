import React, { Component } from 'react';
import axios from 'axios';
import SubRelatedProducts from './subRelatedProducts';
import isEmpty from '../../../../validation/is-empty';

let relatedProductsArr1 = [];
let relatedProductsArr2 = [];
let tabOne;
let tabone = [];
let complaintnoid;
let counter = null;
let count = "on";
let Previoustablelength;
let tablerows;
// let newProdData;

export default class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            serialno: "",
            assign: [],
            showme: false,
            complaintnoid: ""
        }
        this.onChange = this.onChange.bind(this);
        this.loadDateSerialno = this.loadDateSerialno.bind(this);
        this.dataupdate = this.dataupdate.bind(this);
    }
    componentWillReceiveProps(){
      console.log(this.props.CNid)
      this.setState({complaintnoid: this.props.CNid})
      complaintnoid = this.props.CNid;
    }
    componentDidMount(){

        let relatedProductsObj1;
        let relatedProductsObj2;
        let id = this.props.objid;
       axios
      .get("http://localhost:4000/api/complaintstatus/assign/edit/" + id)
      .then(response => {
            let tempAssign = [response.data]
                tempAssign.map(item => {
                    let tempAssigncomplaintsdetails = [item.assigncomplaintsdetails];
                    tempAssigncomplaintsdetails.map(i2 => {
                        i2.complaints_pro_details.map(i3 => {
                            let tempcomplaints_prod = [i3.complaints_prod];
                            tempcomplaints_prod.map(i4 => {
                                i4.products.map(i5 => {
                                    if(i3.complaints_serialno === i5.serialno){
                                        relatedProductsObj1 = {
                                            oem: i5.oem.companyname,
                                            category: i5.category.category,
                                            subcategory: i5.subcategory.subcategory,
                                            modelno: i5.modelno,
                                            serialno:i5.serialno
                                        }

                                        relatedProductsArr1.push(relatedProductsObj1)
                                }
                                })
                            })
                            
                        })
                    })
                    item.assign_productdetails.map(i6 => {
                        let tempassign_pro = [i6.assign_pro];
                        tempassign_pro.map(i7 => {
                            i7.products.map(i8 => {
                                if(i6.assignserialno === i8.serialno){
                                 relatedProductsObj2 = {
                                            oem: i8.oem.companyname,
                                            category: i8.category.category,
                                            subcategory: i8.subcategory.subcategory,
                                            modelno: i8.modelno,
                                            serialno:i8.serialno
                                        }

                                        relatedProductsArr2.push(relatedProductsObj2)
                                    }
                            })
                        })
                        
                        this.setState({showme: true})
                        
                    })
            })

        this.setState({
            showme: true
        })
      })

    }

    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
     }

    loadDateSerialno(e){

      let proregid;
    
      console.log(complaintnoid)


    const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/complaintstatus/assign/serialno", obj)
        .then(res => {
          if(isEmpty(res.data)){
            alert("The Serial no does not exist!")
          }
          else{
                let temptab = res.data
                    temptab.map(item => {
                      proregid = item._id
                      item.products.map(i2 => {
                        tabOne = {
                          category: i2.category.category,
                          subcategory: i2.subcategory.subcategory,
                          oem: i2.oem.companyname,
                          modelno: i2.modelno,
                          serialno: i2.serialno
                        }
                        tabone.push(tabOne);
                        if(counter === null){
                          counter = 0;
                        }
                        else{
                          counter = counter + 1;
                        }
                     })
                  })  
                  this.setState({showme: true})

               let newobj1 = {
                  proregid: proregid,
                  complaintno_serialno: this.state.serialno,
                  }

                  console.log(newobj1)
                  axios
                  .post("http://localhost:4000/api/complaintstatus/complaintno/product/" + complaintnoid, newobj1)
                  .then(response => response.data) 
                }
            })       
       .catch(function(error) {
          console.log(error);
      });

    }

    getTableRow(e){

    e.preventDefault();
    if(!isEmpty(complaintnoid)){

        var myArray1 = tabone;
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');


          if(count === "on" && rows.length !== 0)
          {
            Previoustablelength = rows.length;
            count = "off";
          }


        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            alert(this.rowIndex);


            console.log(this.innerHTML)
            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[0].split("<td>")

            console.log(Previoustablelength - 1)
            console.log(this.rowIndex)
            let arrayIndexToDelete = this.rowIndex - (Previoustablelength - 1)
            myArray1.splice(arrayIndexToDelete - 1, 1);
            counter = counter - 1;

              axios
                .get("http://localhost:4000/api/complaintstatus/complaintno/edit/" + complaintnoid)
                .then(response =>{
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                  item.complaintno_productdetails.map(i2 => {
                    if(retrievedserialno[1] === i2.complaintno_serialno){
                        axios
                        .delete("http://localhost:4000/api/complaintstatus/complaintno/product/" + complaintnoid + "/" + i2._id)
                        .then(res => res.data)
                    }   

                })
              })
           })  
          
        }
      }

    }
  }

  dataupdate(){
      this.setState({showme: false});
      this.setState({showme: true});
    }
  render() {
    let AssignProdData = relatedProductsArr1.map(item1 => {
        return item1;
    })
    let CompProdData = relatedProductsArr2.map(item2 => {
        return item2
      })

    console.log(tabone);
    let newProdData = tabone.map((item3, i) => {
			        return item3;
          });
          console.log(complaintnoid)

    
    //  console.log(tablerows.length);


    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Serial No: </label>
                      <input type="text"
                      className="form-control"
                      name="serialno"
                      rows="5"
                      placeholder="Enter Serialno"
                      onChange={this.onChange}/>
                     </div>
                  </div>
                    <div className="col-6">
                    <div className="form-group">
                      <label>. </label><br />
                      <input type="button"
                    className="btn btn-info"
                    value = "Add Serial No"
                    onClick={this.loadDateSerialno}
                  />
                  </div>
                  </div>  
                </div>
                <div className="row"><div>
							
				<table id="tab1" className="table table-bordered mb-4" onMouseOver={this.getTableRow} onDoubleClick={this.dataupdate}>
                        <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Serial No</td>
                        <td>Model No</td>
                        <td>Product Category</td>
                        <td>Sub category</td>
                        <td>OEM</td>
                        <td>Description</td>
                        </thead>
                        <tbody>
                          {this.state.showme?<SubRelatedProducts obj1 = {AssignProdData} obj2 = {CompProdData} newObj = {newProdData} />:null}
                        </tbody>
                    </table>
				</div>
             </div>
        </form>
      </div>
    )
  }
}
