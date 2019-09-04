import React, { Component, Fragment } from 'react';
import axios from 'axios';
import UpdateSubTable from './updateSubTable';
import isEmpty from '../../../validation/is-empty';

let obj = "";
let ids = ""; 

let htmlid = [];
let htmloem = [];
let htmlcategory = [];
let htmlsubcategory = [];
let htmlmodelno = [];
let htmlserialno =  [];


let showme = false;

class UpdateTableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: [],
			category: [],
            subcategory: [],
            
            productMapDataTabList: []
		};
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onClickColumn = this.onClickColumn.bind(this);
        // this.getProductdata = this.getProductdata.bind(this);
				// this.getproductsData = this.getproductsData.bind(this);
	}
	componentDidMount() {
		
		if(!isEmpty(this.props.obj.category)){
		console.log((Object.entries(this.props.obj.category)[0].slice(1))[0]);
		}

		axios
			.get('http://localhost:4000/api/company')
			.then((response) => {
				this.setState({ company: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/productcategory')
			.then((response) => {
				this.setState({ category: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/productsubcategory')
			.then((response) => {
				this.setState({ subcategory: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	onDelete() {
		axios
			.delete('http://localhost:4000/api/amcregistration/product/' + this.props.amcid + '/' + this.props.obj._id)
			.then(console.log('Deleted'))
			.catch((err) => console.log(err));
	}

	onClickColumn(e) {
		e.preventDefault();
        showme = true;
        
		var item = e.target.id;
		var spliter = item.split('#');

		obj = {
			productsId: spliter[0],
			oemId: spliter[1],
			categoryId: spliter[2],
			subCategoryId: spliter[3],
			modelno: spliter[4],
			serialno: spliter[5]
		};

		console.log(obj)
		htmlid.push(spliter[0]);
		htmloem.push(spliter[1]);
		htmlcategory.push(spliter[2]);
		htmlsubcategory.push(spliter[3]);
		htmlmodelno.push(spliter[4]);
		htmlserialno.push(spliter[9]);

	}

    onUpdate(){
        this.refs.child.onSubTableSubmit(); 
		// this.getproductsData();
		showme = false;
    }

    // getproductsData(){
		
    //     axios
    //       .get("http://localhost:4000/api/amcregistration/" + this.props.amcid )
    //       .then(response => {
	// 		  console.log(response.data.products)
    //         this.setState({ 
    //           productMapDataTabList: response.data.products
    //         });
    //         console.log(response.data.products)
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });  
    // }

    // getProductdata(){
     
    //     var tempid = [];
    //     var tempoem = [];
    //     var tempcategory = [];
    //     var tempsubcategory = [];
    //     var tempmodelno = [];
    //     var tempserialno =  [];
    //     var tempwarrantyfrom = [];
    //     var tempwarrantyto = [];
    //     var tempoemwarrantyfrom = [];
    //     var tempoemwarrantyto = [];

    //     this.state.productMapDataTabList.map((item) => {

    //       tempid.push(item._id),
    //       tempoem.push(item.oem),
    //       tempcategory.push(item.category),
    //       tempsubcategory.push(item.subcategory),
    //       tempmodelno.push(item.modelno),
    //       tempserialno.push(item.serialno),
    //       tempwarrantyfrom.push(item.warrantyfrom),
    //       tempwarrantyto.push(item.warrantyto),
    //       tempoemwarrantyfrom.push(item.oemwarrantyfrom),
    //       tempoemwarrantyto.push(item.oemwarrantyto)
    //     })

    //     var CompanyUpdated = "";
    //     var CategoryUpdated = "";
    //     var SubCategoryUpdated = "";

    //     for(var i = 0; i < tempid.length; i++){
          
    //       if(htmlid[0] === tempid[i]){
          
    //           var Oem = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmlserialno + "#2") 
    //           for(var j = 0; j < this.state.company.length; j++){
    //             if(tempoem[i] === this.state.company[j]._id)
    //             {
    //               CompanyUpdated = this.state.company[j].companyname;
    //             }
    //           }
    //             Oem.innerHTML = CompanyUpdated;
    //           var category = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmlserialno + "#3") 
    //           for(var k = 0; k < this.state.category.length; k++){
    //             if(tempcategory[i] === this.state.category[k]._id)
    //             {
    //               CategoryUpdated = this.state.category[k].category;
    //             }
    //           }
    //             category.innerHTML = CategoryUpdated;
    //           var SubCategory = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmlserialno + "#4") 
    //           for(var l = 0; l < this.state.subcategory.length; l++){
    //             if(tempsubcategory[i] === this.state.subcategory[l]._id)
    //             {
    //               SubCategoryUpdated = this.state.subcategory[l].subcategory;
    //             }
    //           }
    //             SubCategory.innerHTML = SubCategoryUpdated;
    //           var ModelNo = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmlserialno + "#5") 
    //             ModelNo.innerHTML = tempmodelno[i];
    //           var SerialNo = document.getElementById(htmlid + "#" + htmloem + "#" + htmlcategory + "#" + htmlsubcategory + "#" + htmlmodelno + "#" + htmlserialno + "#10") 
    //             SerialNo.innerHTML = tempserialno[i];  
    //       }
    //     }
    //     if(htmlid !== null){
    //     htmlid = [];
    //     htmloem = [];
    //     htmlcategory = [];
    //     htmlsubcategory = [];
    //     htmlmodelno = [];
    //     htmlserialno = [];
    //   }

    //   showme = false;
    // }

	render() {

			let oem = "";
			if(!isEmpty(this.props.obj.oem)){
			oem = (Object.entries(this.props.obj.oem)[1].slice(1))[0];
			}

			let category = "";
			if(!isEmpty(this.props.obj.category)){
			category = (Object.entries(this.props.obj.category)[1].slice(1))[0];
			}

			let subcategory = "";
			if(!isEmpty(this.props.obj.subcategory)){
			subcategory = (Object.entries(this.props.obj.subcategory)[1].slice(1))[0];
			}

			let oemid = "";
			if(!isEmpty(this.props.obj.oem)){
			oemid = (Object.entries(this.props.obj.oem)[0].slice(1))[0];
			}

			let categoryid = "";
			if(!isEmpty(this.props.obj.category)){
			categoryid = (Object.entries(this.props.obj.category)[0].slice(1))[0];
			}

			let subcategoryid = "";
			if(!isEmpty(this.props.obj.subcategory)){
			subcategoryid = (Object.entries(this.props.obj.subcategory)[0].slice(1))[0];
			}

		return (
			<Fragment>
				<tr onDoubleClick={this.onClickColumn}>
					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#1'
						}
					/>

					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#2'
						}
					>
						{oem}
					</td>

					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#3'
						}
					>
						{category}
					</td>

					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#4'
						}
					>
						{subcategory}
					</td>

					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#5'
						}
					>
						{this.props.obj.modelno}
					</td>

					<td
						id={
							this.props.obj._id +
							'#' +
							oemid +
							'#' +
							categoryid +
							'#' +
							subcategoryid +
							'#' +
							this.props.obj.modelno +
							'#' +
							this.props.obj.serialno +
							'#10'
						}
						name="serialNoUpdate">
						{this.props.obj.serialno}
					</td>

					<td>
						{showme ? (
							<input
								type="button"
								className="btn btn-info"
								value="Update"
								onClick={this.onUpdate}
								// onMouseUp={this.getProductdata}
								// onKeyDown={this.onUpdate}
								// onKeyUp={this.getProductdata}
							/>
						) : (
							<input type="button" className="btn btn-danger" value="Delete" onClick={this.onDelete} />
						)}
					</td>
				</tr>
				{showme ? 
					<UpdateSubTable id="sub" dat={obj} style={{ visiblity: 'hidden' }} objId={this.props.ids} ref="child" />
				 : null}
			</Fragment>
		);
	}
}

export default UpdateTableList;
