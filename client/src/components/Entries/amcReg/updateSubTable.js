import React, { Component } from 'react';
import axios from 'axios';


var catagoryComboBox = "";
var Oem = "";
var OriginalItemOem = "";
var OriginalItemCategory = "";
var subCatagoryComboBox = "";
var OriginalItemSubCategory = "";
var modelNoComboBox = "";

class SubTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product: [],
            productid: "",
            oem: "",
            productcategoryid: "",
            productsubcategoryid: "",
            modelno: "",
            serialno: ""
         }
         this.onChangeOem = this.onChangeOem.bind(this);
         this.onChangeCategory = this.onChangeCategory.bind(this);
         this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
         this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        axios
        .get("http://localhost:4000/api/product")
        .then(response => {
          this.setState({ product: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });

        this.setState({
            productid: this.props.dat.productsId,
            oem: this.props.dat.oemId,
            productcategoryid: this.props.dat.categoryId,
            productsubcategoryid: this.props.dat.subCategoryId,
            modelno: this.props.dat.modelno,
            serialno: this.props.dat.serialno
          })
    }


    onChangeOem(e){
        e.preventDefault();
        document.getElementById("sTableDivCategory").value = "Select";
        // R1.reload();
        var CategoryFromOem = "";
  
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
  
        var item = e.target.value;
        Oem = this.state.product.map((spec, i) => (
                 [
                 Object.entries(spec.oem)[0].slice(1),
                 Object.entries(spec.oem)[1].slice(1),
                 Object.entries(spec.category)[1].slice(1),
                 Object.entries(spec.category)[0].slice(1),
                 Object.entries(spec.subcategory)[1].slice(1),
                 Object.entries(spec.subcategory)[0].slice(1),
                 spec.modelno
                ]              
        ));
  
        for(var i = 0; i<Oem.length; i++)
        {
          var check1 = Oem[i][0].toString();
          if(check1 === item){
            OriginalItemOem = Oem[i][1]
          }
        }
  
        for (var j = 0; j < Oem.length; j++)
        {
       
          var check2 = Oem[j][1].toString();
          if(check2 === OriginalItemOem[0]){
            CategoryFromOem = Oem[j];
          }
        }
        
        catagoryComboBox =
                          <option key={i} value={CategoryFromOem[3]}>
                          {CategoryFromOem[2]}
                          </option>;
    }

    onChangeCategory(e){

        e.preventDefault();
        document.getElementById("sTableDivSubCategory").value = "Select";
  
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
        var item = e.target.value;
        var SubCategoryFromOem = "";
  
        for(var i = 0; i<Oem.length; i++)
        {
          let checkCategory = Oem[i][3].toString();
  
          if(checkCategory === item ){
            OriginalItemCategory = Oem[i][2]
  
          }
        }
  
        for(var j = 0; j<Oem.length; j++){
          var checkOem = Oem[j][1].toString();
          let checkCategory = Oem[j][2].toString();
          var temp1 = OriginalItemOem.toString();
          var temp2 = OriginalItemCategory.toString();
  
          if(checkOem === temp1 && checkCategory === temp2 ){
            SubCategoryFromOem = Oem[j]
          }
        }
            
        subCatagoryComboBox = <option key={i} value={SubCategoryFromOem[5].toString()}>
                          {SubCategoryFromOem[4].toString()}
                          </option>;
    }

    onChangeSubCategory(e){

        e.preventDefault();
        document.getElementById("STabledivModelNo").value = "Select";
  
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
        var item = e.target.value;
        var ModelNoFromOem = "";
  
        for(var i = 0; i<Oem.length; i++)
        {
          let checkCategory = Oem[i][5].toString();
  
          if(checkCategory === item ){
            OriginalItemSubCategory = Oem[i][4]
          }
        }
  
        for(var j = 0; j<Oem.length; j++){
          var checkOem = Oem[j][1].toString();
          let checkCategory = Oem[j][2].toString();
          var checksubCategory = Oem[j][4].toString();
          var temp1 = OriginalItemOem.toString();
          var temp2 = OriginalItemCategory.toString();
          var temp3 = OriginalItemSubCategory.toString();
          
          if(checkOem === temp1 && checkCategory === temp2 && checksubCategory === temp3){
            ModelNoFromOem = Oem[j]
          }
        }
  
        modelNoComboBox = <option key={i} value={ModelNoFromOem[6]}>
                          {ModelNoFromOem[6]}
                          </option>;
  
    }
    onChange(e) {
         this.setState({
          [e.target.name]: e.target.value
        });
      }

    onSubTableSubmit(){
        const obj = {
            companyid: this.state.oem, 
            productcategoryid: this.state.productcategoryid, 
            productsubcategoryid: this.state.productsubcategoryid,
            modelno: this.state.modelno,
            serialno: this.state.serialno
      }
   
      console.log(obj)
      var id = this.props.objId;
      console.log(id)
      axios
      .post("http://localhost:4000/api/amcregistration/product/" + id + "/" + this.props.dat.productsId , obj)
      .then(res => console.log(res.data));
      }

    render() { 

        const Oem = this.state.product.map((spec, i) => (
            <option key={i} value={Object.entries(spec.oem)[0].slice(1)}>
              {Object.entries(spec.oem)[1].slice(1)}
            </option>
          ));
          
        return ( 
            <tr>
                <td></td>
                <td><select
                          className="form-control"
                          name="oem"
                          onChange={this.onChangeOem}
                          placeholder= "oem">
                          <option value = "Select">Select</option>
                          {Oem}
                      </select></td>
                <td> <select id = "sTableDivCategory"
                          className="form-control"
                          name="productcategoryid"
                          onChange={this.onChangeCategory}>
                          <option value = "Select">Select</option>
                          {catagoryComboBox}
                      </select></td>
                <td> <select id = "sTableDivSubCategory"
                          className="form-control"
                          name="productsubcategoryid"
                          onChange={this.onChangeSubCategory}>
                          <option value = "Select">Select</option>
                      {subCatagoryComboBox}
                      </select></td>
                <td> <select id = "STabledivModelNo"
                          className="form-control"
                          name="modelno"
                          onChange={this.onChange}>
                          <option value = "Select">Select</option>
                      {modelNoComboBox}
                      </select></td>
                <td><input
                          type="text"
                          name="serialno"
                          className="form-control"
                          placeholder="Serial No"
                          value={this.state.serialno}
                          onChange={this.onChange}
                      /></td>
            </tr> 
         );
    }
}
 
export default SubTable;