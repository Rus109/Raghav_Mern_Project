import React, { Component, Fragment } from 'react';
import axios from 'axios';
import SubTable from './subTable';

var Company = "";
var comId = [];
var comName = [];
var ids = ""; 
var obj = "";

var htmlid = [];
var htmloem = [];
var htmlcategory = [];
var htmlsubcategory = [];
var htmlmodelno = [];
var htmlserialno =  [];
var htmlwarrantyfrom = [];
var htmlwarrantyto = [];
var htmloemwarrantyfrom = [];
var htmloemwarrantyto = [];

class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           showme: false,
           htmlid: "",
           proreg: "",
           company: [],
           category: [],
           subcategory: [],
           product: [],

           dbData: [],
           productMapDataTabList: []

         }
         this.onDelete = this.onDelete.bind(this);
         this.onUpdate = this.onUpdate.bind(this);
        //  this.onChangeRow = this.onChangeRow.bind(this);
         this.onClickColumn = this.onClickColumn.bind(this);
        //  this.updateRows = this.updateRows.bind(this);
         this.getProductdata = this.getProductdata.bind(this);
         this.getproductsData = this.getproductsData.bind(this);
    }

    componentDidMount(){
      console.log(this.props.obj)
      ids = this.props.obj.oem;
      console.log(ids)
      axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
        console.log(this.state.company)
      })
      .catch(function(error) {
        console.log(error);
      });

      
      
      axios
        .get("http://localhost:4000/api/productcategory")
        .then(response => {
          this.setState({ category: response.data });
          console.log(this.state.category)
        })
        .catch(function(error) {
          console.log(error);
        });

        axios
        .get("http://localhost:4000/api/productsubcategory")
        .then(response => {
          this.setState({ subcategory: response.data });
          
        })
        .catch(function(error) {
          console.log(error);
        });   

        axios
        .get("http://localhost:4000/api/product")
        .then(response => {
          this.setState({ product: response.data });
          console.log(this.state.product)
        })
        .catch(function(error) {
          console.log(error);
        });
    }

   getCompanyName(){
    console.log(comId.length);
    for(var i = 0; i < comId.length; i++ ){
      
      if(comId[i] === this.props.obj.oem){
        Company = comName[i]; 
        console.log(Company);
      }
    }
   }

    onClickColumn(e){
        e.preventDefault();
        this.setState({showme: true, htmlid: e.target.id});
        var item = e.target.id;
        var spliter = item.split("#")

        obj = {
            productsId: spliter[0], 
            oemId: spliter[1], 
            categoryId: spliter[2],
            subCategoryId: spliter[3],
            modelno: spliter[4],
            oemwarranentyfrom : spliter[5],
            oemwarrantyto : spliter[6],
            warrantyfrom: spliter[7],
            warrantyto: spliter[8],
            serialno: spliter[9]
        }

        htmlid.push(spliter[0]);
        htmloem.push(spliter[1]);
        htmlcategory.push(spliter[2]);
        htmlsubcategory.push(spliter[3]);
        htmlmodelno.push(spliter[4]);
        htmlserialno.push(spliter[9]);
        htmlwarrantyfrom.push(spliter[7]);
        htmlwarrantyto.push(spliter[8]);
        htmloemwarrantyfrom.push(spliter[5]);
        htmloemwarrantyto.push(spliter[6]);


    }
    
    onDelete(e){
        e.preventDefault();
        axios
        .delete("http://localhost:4000/api/proreg/product/" + this.props.ids + "/" + this.props.obj._id)
        .then(console.log("Deleted"))
        .catch(err => console.log(err));
        
    }

    onUpdate(e){
        e.preventDefault();
        this.refs.child.onSubTableSubmit(); 
        this.getproductsData();
        this.setState({showme: false});
    }

    getproductsData(){
      axios
        .get("http://localhost:4000/api/proreg/" + this.props.ids )
        .then(response => {
          this.setState({ 
            productMapDataTabList: response.data.products
          });
          console.log(response.data.products)
        })
        .catch(function(error) {
          console.log(error);
        });
  
        
      }

      getProductdata(){
     

        var tempid = [];
        var tempoem = [];
        var tempcategory = [];
        var tempsubcategory = [];
        var tempmodelno = [];
        var tempserialno =  [];
        var tempwarrantyfrom = [];
        var tempwarrantyto = [];
        var tempoemwarrantyfrom = [];
        var tempoemwarrantyto = [];

        this.state.productMapDataTabList.map((item) => {

          tempid.push(item._id)
          tempoem.push(item.oem)
          tempcategory.push(item.category)
          tempsubcategory.push(item.subcategory)
          tempmodelno.push(item.modelno)
          tempserialno.push(item.serialno)
          tempwarrantyfrom.push(item.warrantyfrom)
          tempwarrantyto.push(item.warrantyto)
          tempoemwarrantyfrom.push(item.oemwarrantyfrom)
          tempoemwarrantyto.push(item.oemwarrantyto)
          return true
        })

        var CompanyUpdated = "";
        var CategoryUpdated = "";
        var SubCategoryUpdated = "";
        var OemWarrantyTime1 = "";
        var OemWarrantyTime2 = "";
        var WarrantyTime1 = "";
        var WarrantyTime2 = "";

        for(var i = 0; i < tempid.length; i++){
          
          if(htmlid[0] === tempid[i]){
          
              var Oem = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#2") 
              for(var j = 0; j < this.state.company.length; j++){
                if(tempoem[i] === this.state.company[j]._id)
                {
                  CompanyUpdated = this.state.company[j].companyname;
                }
              }
                Oem.innerHTML = CompanyUpdated;
              var category = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#3") 
              for(var k = 0; k < this.state.category.length; k++){
                if(tempcategory[i] === this.state.category[k]._id)
                {
                  CategoryUpdated = this.state.category[k].category;
                }
              }
                category.innerHTML = CategoryUpdated;
              var SubCategory = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#4") 
              for(var l = 0; l < this.state.subcategory.length; l++){
                if(tempsubcategory[i] === this.state.subcategory[l]._id)
                {
                  SubCategoryUpdated = this.state.subcategory[l].subcategory;
                }
              }
                SubCategory.innerHTML = SubCategoryUpdated;
              var ModelNo = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#5") 
                ModelNo.innerHTML = tempmodelno[i];
              var OemWarrantyFrom = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#6") 
                OemWarrantyTime1 = tempoemwarrantyfrom[i].split("T"); 
                OemWarrantyFrom.innerHTML = OemWarrantyTime1[0];
              var OemWarrentyto = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#7") 
                OemWarrantyTime2 = tempoemwarrantyto[i].split("T");
                OemWarrentyto.innerHTML = OemWarrantyTime2[0];
              var WarrantyFrom = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#8") 
                WarrantyTime1 = tempwarrantyfrom[i].split("T");
                WarrantyFrom.innerHTML = WarrantyTime1[0];
              var WarrantyTo = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#9") 
                WarrantyTime2 = tempwarrantyto[i].split("T");
                WarrantyTo.innerHTML = WarrantyTime2[0];
              var SerialNo = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmloemwarrantyfrom + "#" + htmloemwarrantyto  + "#" + htmlwarrantyfrom + "#" + htmlwarrantyto + "#" + htmlserialno + "#10") 
                SerialNo.innerHTML = tempserialno[i];  
          }
        }
        if(htmlid !== null){
        htmlid = [];
        htmloem = [];
        htmlcategory = [];
        htmlsubcategory = [];
        htmlmodelno = [];
        htmlserialno = [];
        htmlwarrantyfrom = [];
        htmlwarrantyto = [];
        htmloemwarrantyfrom = [];
        htmloemwarrantyto = [];
      }

      this.setState({showme: false});
    }
    render() {
      var Company = "";
      var Category = "";
      var SubCategory = "";
      var OemWarranty1 = "";
      var OemWarranty2 = "";
      var Warranty1 = "";
      var Warranty2 = "";

      if(this.state.company !== null){
      for(let i = 0; i < this.state.company.length; i++){
        if(this.props.obj.oem === this.state.company[i]._id)
        {
          Company = this.state.company[i].companyname;
        }
      }
      }

      if(this.state.category !== null){
        for(let i = 0; i < this.state.category.length; i++){
          if(this.props.obj.category === this.state.category[i]._id)
          {
            Category = this.state.category[i].category;
          }
        }
        }

        if(this.state.subcategory !== null){
          for(let i = 0; i < this.state.subcategory.length; i++){
            if(this.props.obj.subcategory === this.state.subcategory[i]._id)
            {
              SubCategory = this.state.subcategory[i].subcategory;
            }
          }
          }

        if(this.props.obj.oemwarrantyfrom !== null){
          OemWarranty1 = this.props.obj.oemwarrantyfrom.split("T");
        }
        
        if(this.props.obj.oemwarrantyto !== null){
          OemWarranty2 = this.props.obj.oemwarrantyto.split("T");
        } 

        if(this.props.obj.warrantyfrom !== null){
          Warranty1 = this.props.obj.warrantyfrom.split("T");
        }

        if(this.props.obj.warrantyto !== null){
          Warranty2 = this.props.obj.warrantyto.split("T");
        }

        return ( 
            <Fragment>
            <tr onDoubleClick={this.onClickColumn}>
                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#1"} ></td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#2"} >{Company}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#3"}>{Category}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#4"}>{SubCategory}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#5"} >{this.props.obj.modelno}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#6"}>{OemWarranty1[0]}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#7"}>{OemWarranty2[0]}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#8"}>{Warranty1[0]}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#9"}>{Warranty2[0]}</td>

                <td id={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category  + "#" + this.props.obj.subcategory
                + "#" + this.props.obj.modelno + "#" + this.props.obj.oemwarrantyfrom + "#" + this.props.obj.oemwarrantyto
                + "#" + this.props.obj.warrantyfrom + "#" + this.props.obj.warrantyto + "#" + this.props.obj.serialno + "#10"} name = "serialNoUpdate">{this.props.obj.serialno}</td>

                <td>{
                     this.state.showme?
                     <input type="button" className="btn btn-info" value = "Update" onClick={this.onUpdate} 
                     />:
                     <input type="button" className="btn btn-danger" value = "Delete" onClick={this.onDelete} />
                }</td>
            </tr>
            {
                this.state.showme?
                <SubTable id="sub" dat={obj} style={{visiblity: "hidden"}} objId = {this.props.ids} ref = "child" />:
                null
            }
            </Fragment>
         );
    }
}
 
export default TableList;

