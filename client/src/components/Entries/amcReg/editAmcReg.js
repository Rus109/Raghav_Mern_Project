import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../App.css';
import EditProRegTable from './editProRegTable';
import UpdateTableList from './updateTableList';

let arrCustomer = [];
let arrDepatment = [];

let Oem = '';
let OriginalItemOem = '';
let OriginalItemCategory = '';
let OriginalItemSubCategory = '';
let catagoryComboBox = '';
let subCatagoryComboBox = '';
let modelNoComboBox = '';

let unique = "";

//******************************	ON ENTER DATA/ NEW PRODUCT DATA ******************************** */
let obj2 = '';
let tabList = '';
let mainCheckedData = '';

/*******************************    On Checked data     ******************************************** */
let arrOfSerialno = [];
let AMCserialno = "";

class EditAmcReg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amcrefno: '',
			amcregdate: '',
			customer: [],
			customerid: '',
			customertype: [],
			customertypeid: '',
			department: [],
			departmentid: '',
			customersubdepartment: [],
			customersubdepartmentid: '',
			productregistration: [],
			productregistrationid: '',
			serviceprovide: [],
			serviceprovideid: '',
			amcstartdate: '',
			amcexpiredate: '',
			remark: '',
			amcreg: [],
			productsid: '',

			showme: false,
			tempProductRegistration: [],
			tempAMCProductRegistration: [],

			product: [],
			productid: '',
			oem: '',
			productcategoryid: '',
			productsubcategoryid: '',
			modelno: '',
			serialno: '',

			tabListBoolean: false,
			mapNewEntry: []
		};

		this.onChange = this.onChange.bind(this);
		this.onChangeSelect = this.onChangeSelect.bind(this);
		this.onSelectCustomerType = this.onSelectCustomerType.bind(this);
		this.onSelectCustomer = this.onSelectCustomer.bind(this);
		this.onChangeOem = this.onChangeOem.bind(this);
		this.onChangeCategory = this.onChangeCategory.bind(this);
		this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
		this.onUpdateChangeSelect = this.onUpdateChangeSelect.bind(this);
		this.saveClick = this.saveClick.bind(this);
		this.updateClick = this.updateClick.bind(this);
		this.onEnterData = this.onEnterData.bind(this);
		this.newDataEntered = this.newDataEntered.bind(this);
		this.mainCheckBoxSelected = this.mainCheckBoxSelected.bind(this);
		this.SubmitCheckedData = this.SubmitCheckedData.bind(this);
		this.showNewProductData = this.showNewProductData.bind(this);
		this.done = this.done.bind(this);
	}
	componentDidMount() {
		axios
			.get('http://localhost:4000/api/proreg')
			.then((response) => {
				this.setState({ productregistration: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/customer')
			.then((response) => {
				this.setState({ customer: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/customertype')
			.then((response) => {
				this.setState({ customertype: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/customersubdepartment')
			.then((response) => {
				this.setState({ department: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/customersubdepartment')
			.then((response) => {
				this.setState({ customersubdepartment: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/serviceprovider')
			.then((response) => {
				this.setState({ serviceprovide: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/product')
			.then((response) => {
				this.setState({ product: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/amcregistration')
			.then((response) => {
				this.setState({ amcreg: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/amcregistration/edit/' + this.props.match.params.id)
			.then((response) => {
				console.log(response.data.productrefno);
				var dateAmcRegDate = new Date(response.data.amcregdate);
				var dateAmcAtartDate = new Date(response.data.amcstartdate);
				var dateAmcExpiredate = new Date(response.data.amcexpiredate);

				var dataDateAmcRegDate = dateAmcRegDate.toISOString().substr(0, 10);
				var dataDateAmcAtartDate = dateAmcAtartDate.toISOString().substr(0, 10);
				var dataDateAmcExpiredate = dateAmcExpiredate.toISOString().substr(0, 10);

				console.log(response.data.customer)
				this.setState({
					productsid: this.props.match.params.id,
					amcrefno: response.data.amcrefno,
					amcregdate: dataDateAmcRegDate,
					customerid: response.data.customer,
					customertypeid: response.data.customertype,
					departmentid: response.data.department,
					serviceproviderid: response.data.serviceprovider,

					productregistrationid: response.data.productno,

					amcstartdate: dataDateAmcAtartDate,
					amcexpiredate: dataDateAmcExpiredate,
					remark: response.data.remarks
				}, () => {
							this.onUpdateChangeSelect();
						}
				);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	componentDidUpdate() {
		this.onUpdate();
	}
	//********************************************ON SELECT CUSTOMER TYPE *************************************/

	onSelectCustomerType(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});

		console.log(e.target.value);
		let item = e.target.value;

		let LoadCustomer = this.state.customer.map((cus, i) => [
			Object.entries(cus.customertype)[0].slice(1)[0],
			cus._id,
			cus.customername
		]);
		let cust = [];
		for (var i = 0; i < LoadCustomer.length; i++) {
			if (item === LoadCustomer[i][0]) {
				cust.push({ id: LoadCustomer[i][1], name: LoadCustomer[i][2] });
			}
		}
		arrCustomer = cust.map((item, i) => (
			<option key={i} value={item.id}>
				{item.name}
			</option>
		));
	}

	//********************************************ON SELECT CUSTOMER *************************************/

	onSelectCustomer(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});

		console.log(e.target.value);
		let item = e.target.value;

		let LoadDepartment = this.state.department.map((cusT, i) => [
			Object.entries(cusT.customer)[0].slice(1)[0],
			cusT._id,
			cusT.department
		]);
		console.log(LoadDepartment);
		let dept = [];
		for (var i = 0; i < LoadDepartment.length; i++) {
			if (item === LoadDepartment[i][0]) {
				dept.push({ id: LoadDepartment[i][1], name: LoadDepartment[i][2] });
			}
		}
		console.log(dept);
		arrDepatment = dept.map((item, i) => (
			<option key={i} value={item.id}>
				{item.name}
			</option>
		));

		console.log(arrDepatment);
	}

	//********************************************ON SELECT OEM (COMPANY) *************************************/
	onChangeOem(e) {
		e.preventDefault();
		document.getElementById('divCategory').value = 'Select';
		var CategoryFromOem = '';

		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);

		var item = e.target.value;
		Oem = this.state.product.map((spec, i) => [
			Object.entries(spec.oem)[0].slice(1),
			Object.entries(spec.oem)[1].slice(1),
			Object.entries(spec.category)[1].slice(1),
			Object.entries(spec.category)[0].slice(1),
			Object.entries(spec.subcategory)[1].slice(1),
			Object.entries(spec.subcategory)[0].slice(1),
			spec.modelno
		]);

		console.log(Oem);

		for (var i = 0; i < Oem.length; i++) {
			var check1 = Oem[i][0].toString();
			if (check1 === item) {
				OriginalItemOem = Oem[i][1];
			}
		}

		for (var j = 0; j < Oem.length; j++) {
			var check2 = Oem[j][1].toString();
			if (check2 === OriginalItemOem[0]) {
				CategoryFromOem = Oem[j];
			}
		}

		catagoryComboBox = (
			<option key={i} value={CategoryFromOem[3]}>
				{CategoryFromOem[2]}
			</option>
		);
		console.log(CategoryFromOem[2]);
	}

	//********************************************ON SELECT CATEGORY *************************************/
	onChangeCategory(e) {
		e.preventDefault();
		document.getElementById('divSubCategory').value = 'Select';

		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
		var item = e.target.value;
		var SubCategoryFromOem = '';

		for (var i = 0; i < Oem.length; i++) {
			var checkCategory = Oem[i][3].toString();

			if (checkCategory === item) {
				OriginalItemCategory = Oem[i][2];
			}
		}

		console.log(OriginalItemCategory);
		for (var j = 0; j < Oem.length; j++) {
			var checkOem = Oem[j][1].toString();
			var checkCategory = Oem[j][2].toString();
			var temp1 = OriginalItemOem.toString();
			var temp2 = OriginalItemCategory.toString();

			if (checkOem === temp1 && checkCategory === temp2) {
				SubCategoryFromOem = Oem[j];
			}
		}
		console.log(SubCategoryFromOem);
		subCatagoryComboBox = (
			<option key={i} value={SubCategoryFromOem[5].toString()}>
				{SubCategoryFromOem[4].toString()}
			</option>
		);
	}

	//********************************************ON SELECT SUB-CATEGORY *************************************/
	onChangeSubCategory(e) {
		e.preventDefault();
		document.getElementById('divModelNo').value = 'Select';

		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
		var item = e.target.value;
		var ModelNoFromOem = '';

		for (var i = 0; i < Oem.length; i++) {
			var checkCategory = Oem[i][5].toString();

			if (checkCategory === item) {
				OriginalItemSubCategory = Oem[i][4];
			}
		}

		for (var j = 0; j < Oem.length; j++) {
			var checkOem = Oem[j][1].toString();
			var checkCategory = Oem[j][2].toString();
			var checksubCategory = Oem[j][4].toString();
			var temp1 = OriginalItemOem.toString();
			var temp2 = OriginalItemCategory.toString();
			var temp3 = OriginalItemSubCategory.toString();

			if (checkOem === temp1 && checkCategory === temp2 && checksubCategory === temp3) {
				ModelNoFromOem = Oem[j];
			}
		}

		modelNoComboBox = (
			<option key={i} value={ModelNoFromOem[6]}>
				{ModelNoFromOem[6]}
			</option>
		);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}

	onChangeSelect(e) {
		this.setState({
			[e.target.name]: e.target.value,
			showme: true
		});

		axios
			.get('http://localhost:4000/api/proreg/' + e.target.value)
			.then((response) => {
				this.setState({ tempProductRegistration: response.data.products });
				console.log(response.data.products)
			})
			.catch(function(error) {
				console.log(error);
			});
			
	}

	onUpdateChangeSelect(){

		let tempArr = [];
		let AMCid = this.props.match.params.id;
		axios.get('http://localhost:4000/api/amcregistration/edit/' + AMCid).then((res) =>{
			console.log(res.data.products.length)
			res.data.products.map(item => {
				if(item.newdata === true){
					tempArr.push(item)
				}
			})
		this.setState({mapNewEntry: tempArr});
		})


		console.log(this.state.productregistrationid)
		this.setState({
			showme: true
		});

		axios
			.get('http://localhost:4000/api/proreg/' + this.state.productregistrationid)
			.then((response) => {
				this.setState({ tempProductRegistration: response.data.products });
				console.log(response.data.products)
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get('http://localhost:4000/api/amcregistration/edit/' + this.props.match.params.id)
			.then((response) => {
				this.setState({ tempAMCProductRegistration: response.data.products });
				console.log(response.data.products)
				AMCserialno = response.data.products.map(item => {
					return item.serialno;
				})
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	saveClick(e) {
		e.preventDefault();
		var arrDbAmcRef = [];
		var stateAmcRef = this.state.amcrefno.toLowerCase();
		this.state.amcreg.map((amc) => {
			arrDbAmcRef.push(amc.amcrefno.toLowerCase());
		});

		for (var i = 0; i < arrDbAmcRef.length; i++) {
			if (stateAmcRef === arrDbAmcRef[i]) {
				alert('The Refrence No. already exist');
				return;
			}
		}
		const {
			amcrefno,
			amcregdate,
			customerid,
			customertypeid,
			departmentid,
			serviceproviderid,
			amcstartdate,
			amcexpiredate,
			productregistrationid,
			remark
		} = this.state;

		const obj = {
			amcrefno: amcrefno,
			amcregdate: amcregdate,
			customerid: customerid,
			customertypeid: customertypeid,
			customersubdepartmentid: departmentid,
			serviceproviderid: serviceproviderid,
			amcstartdate: amcstartdate,
			amcexpiredate: amcexpiredate,
			productrefno: productregistrationid,
			remarks: remark
		};

		console.log(obj);

		axios.post('http://localhost:4000/api/amcregistration/add', obj).then((res) => {
			this.setState({
				productsid: res.data._id
			});
			console.log(this.state.productsid);
			console.log(res.data._id);
		});
	}

	updateClick(e) {
		e.preventDefault();

		const {
			amcrefno,
			amcregdate,
			customerid,
			customertypeid,
			departmentid,
			serviceproviderid,
			amcstartdate,
			amcexpiredate,
			productregistrationid,
			remark
		} = this.state;

		const obj = {
			amcrefno: amcrefno,
			amcregdate: amcregdate,
			customerid: customerid,
			customertypeid: customertypeid,
			customersubdepartmentid: departmentid,
			serviceproviderid: serviceproviderid,
			amcstartdate: amcstartdate,
			amcexpiredate: amcexpiredate,
			productrefno: productregistrationid,
			remarks: remark
		};

		console.log(obj);

		axios.post('http://localhost:4000/api/amcregistration/' + this.state.productsid, obj).then((res) => {
			console.log(res.data);
		});

		alert("Thank you","AMC Registration Data Updated Successfully!!")
	}

	onEnterData(e) {

		obj2 = {
			companyid: this.state.oem,
			productcategoryid: this.state.productcategoryid,
			productsubcategoryid: this.state.productsubcategoryid,
			modelno: this.state.modelno,
			serialno: this.state.serialno,
			newdata: true
		};
		axios.post('http://localhost:4000/api/amcregistration/products/' + this.state.productsid, obj2).then((res) => {
			console.log(res.data);
		});

	}

	newDataEntered() {
		console.log(this.state.mapNewEntry);
		if (this.state.mapNewEntry !== '') {
			this.setState({
				tabListBoolean: true
			});
			console.log(this.state.productsid);
		}
	}

	onUpdate() {
		console.log(this.props.match.params.id)
		let tempArr = [];
		let AMCid = this.props.match.params.id;
		axios.get('http://localhost:4000/api/amcregistration/edit/' + AMCid).then((res) =>{
			console.log(res.data.products.length)
			res.data.products.map(item => {
				if(item.newdata === true){
					tempArr.push(item)
				}
			})
		this.setState({mapNewEntry: tempArr});
		})

	}

	mainCheckBoxSelected(e) {
		let checker = document.getElementById('chkboxSelectAll');
		if (checker.checked === true) {
			mainCheckedData = this.state.tempProductRegistration;
			console.log(mainCheckedData);
			for (var i = 0; i < mainCheckedData.length; i++) {
				let obj = {
					companyid: mainCheckedData[i].oem,
					productcategoryid: mainCheckedData[i].category,
					productsubcategoryid: mainCheckedData[i].subcategory,
					modelno: mainCheckedData[i].modelno,
					serialno: mainCheckedData[i].serialno
				};
				console.log(obj);
				arrOfSerialno.push(mainCheckedData[i].serialno);
				console.log(arrOfSerialno);
				axios
					.post('http://localhost:4000/api/amcregistration/products/' + this.state.productsid, obj)
					.then((res) => console.log(res.data))
					.catch((err) => console.log(err));
			}
		} else {
			let onlyids = [];
			let onlyserialno = [];
			axios.get('http://localhost:4000/api/amcregistration/edit/' + this.state.productsid).then((res) => {
				let temparrid = [];
				temparrid = res.data.products;

				for (var i = 0; i < temparrid.length; i++) {
					onlyids.push(temparrid[i]._id);
					onlyserialno.push(temparrid[i].serialno);
				}

				for (var j = 0; j < arrOfSerialno.length; j++) {
					for (var k = 0; k < onlyids.length; k++) {
						if (arrOfSerialno[j] === onlyserialno[k]) {
							console.log(onlyids[k]);
							axios
								.delete(
									'http://localhost:4000/api/amcregistration/product_all/' +
										this.state.productsid +
										'/' +
										onlyids[k]
								)
								.then(console.log('Deleted'))
								.catch((err) => console.log(err));
						}
					}
				}
			});
			mainCheckedData = '';
		}
	}

	SubmitCheckedData() {
		this.refs.child.submitTrigger();
	}

	showNewProductData(){

	let dataToSend = []

		this.setState({
			tabListBoolean: true,
			mapNewEntry: []
		});


		axios.get('http://localhost:4000/api/amcregistration/edit/' + this.props.match.params.id).then((res) =>{
			console.log(res.data.products.length)
			for(var i = 0; i <res.data.products.length; i++){
				for(var j = 0; j < unique.length; j++){
					console.log(unique[j])
					console.log(res.data.products[i].serialno)
					if(unique[j] === res.data.products[i].serialno){
						dataToSend.push(res.data.products[i])	
					}
					
				}

			}
			console.log(dataToSend)
			this.setState({
				mapNewEntry: dataToSend
			})
		});
			
		console.log(this.state.mapNewEntry)
	}

	done(){
Oem = '';
OriginalItemOem = '';
OriginalItemCategory = '';
OriginalItemSubCategory = '';
catagoryComboBox = '';
subCatagoryComboBox = '';
modelNoComboBox = '';
unique = "";
obj2 = '';
tabList = '';
mainCheckedData = '';
arrOfSerialno = [];
AMCserialno = "";

this.setState({
			amcrefno: '',
			amcregdate: '',
			customer: [],
			customerid: '',
			customertype: [],
			customertypeid: '',
			department: [],
			departmentid: '',
			customersubdepartment: [],
			customersubdepartmentid: '',
			productregistration: [],
			productregistrationid: '',
			serviceprovide: [],
			serviceprovideid: '',
			amcstartdate: '',
			amcexpiredate: '',
			remark: '',
			amcreg: [],
			productsid: '',
			showme: false,
			tempProductRegistration: [],
			tempAMCProductRegistration: [],
			product: [],
			productid: '',
			oem: '',
			productcategoryid: '',
			productsubcategoryid: '',
			modelno: '',
			serialno: '',
			tabListBoolean: false,
			mapNewEntry: []
})

this.props.history.push("/api/amcregistration");

	}
	render() {
		
	let tempArrNewProduct = [];

		var tempArr = [];
		const CustomerT = this.state.customertype.map((cusT, i) => (
			<option key={i} value={cusT._id}>
				{cusT.customertype}
			</option>
		));

		const ServiceProvide = this.state.serviceprovide.map((ser, i) => (
			<option key={i} value={ser._id}>
				{ser.providername}
			</option>
		));

		const ProductRefNo = this.state.productregistration.map((item, iPRN) => (
			<option key={iPRN} value={item._id}>
				{item.refno1}
			</option>
		));
/* ************************************* For Sending data for Update in the Fields ********************************************* */

		const ProReg = this.state.tempProductRegistration.map((item, i) => {
			return <EditProRegTable obj={item} objAMC = {AMCserialno} proid={this.state.productsid} ref="child" />;
		});

		const Oem = this.state.product.map((spec, i) => (
			<option key={i} value={Object.entries(spec.oem)[0].slice(1)}>
				{Object.entries(spec.oem)[1].slice(1)}
			</option>
		));


			let amcProductsId = this.props.match.params.id;
			tabList = this.state.mapNewEntry.map(function(object, i) {
				return <UpdateTableList obj={object} amcid={amcProductsId} objAMC = {tempArrNewProduct} key={i} />;
			})
		return (
			<div style={{ marginTop: 10, marginLeft: '10%' }}>
				<Link to="/api/amcregistration" className="btn btn-info">
					Back to List
				</Link>
				<h3 className="text-center">Add Amc Registration</h3>
				<form style={{ marginTop: '5%' }}>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Amc Reference No: </label>
								<input
									type="text"
									name="amcrefno"
									className="form-control"
									placeholder="Amc Reference No"
									value={this.state.amcrefno}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="form-group">
								<label>Amc Registration Date: </label>
								<input
									type="date"
									className="form-control"
									name="amcregdate"
									value={this.state.amcregdate}
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Customer Type: </label>
								<select
									className="form-control"
									name="customertypeid"
									value={this.state.customertypeid}
									onChange={this.onSelectCustomerType}>

									<option>Select</option>
									{CustomerT}
								</select>
							</div>
						</div>
						<div className="col-6">
							<div className="form-group">
								<label>Customer: </label>
								<select className="form-control" name="customerid" value={this.state.customerid} onChange={this.onSelectCustomer}>
									<option>Select</option>
									{arrCustomer}
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Department: </label>
								<select className="form-control" name="departmentid" value={this.state.departmentid} onChange={this.onChange}>
									<option>Select</option>
									{arrDepatment}
								</select>
							</div>
						</div>
						<div className="col-6">
							<div className="form-group">
								<label>Service Provider </label>
								<select className="form-control" name="serviceproviderid" value={this.state.serviceproviderid} onChange={this.onChange}>
									<option>Select</option>
									{ServiceProvide}
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>AMC Start Date: </label>
								<input
									type="date"
									className="form-control"
									name="amcstartdate"
									value={this.state.amcstartdate}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="form-group">
								<label>AMC Expire Date: </label>
								<input
									type="date"
									className="form-control"
									name="amcexpiredate"
									value={this.state.amcexpiredate}
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Product Ref No: </label>
								<select
									className="form-control"
									name="productregistrationid"
									value = {this.state.productregistrationid}
									onChange={this.onChangeSelect}
									data-onLoad = {this.onUpdateChangeSelect}
								>	
									<option>Select</option>
									{ProductRefNo}
								</select>
							</div>
						</div>

						<div className="col-6">
							<div className="form-group">
								<label>Remarks: </label>
								<input type="text" className="form-control" name="remark" value={this.state.remark} onChange={this.onChange} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<input
							type="button"
							value="Update Above Details"
							onClick={this.updateClick}
							className="btn btn-primary"
						/>
					</div>
					<div className="row">
						{this.state.showme ? (
							<div>
								<ul class="nav nav-tabs" id="myTab" role="tablist">
									<li class="nav-item">
										<a
											class="nav-link active"
											id="home-tab"
											data-toggle="tab"
											href="#home"
											role="tab"
											aria-controls="home"
											aria-selected="true"
										>
											Product for AMC
										</a>
									</li>
									<li class="nav-item" onClick={this.showNewProductData}>
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#profile"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											New Product
										</a>
									</li>
								</ul>
								<div class="tab-content" id="myTabContent">
									<div
										class="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab"
									>
										<table id="tab" className="table table-bordered mb-4 css-serial">
											<thead style={{ backgroundColor: '#d8d8d8' }}>
												<th>Sl No</th>
												<th>Oem</th>
												<th>Category</th>
												<th>Sub Category</th>
												<th>Model No</th>
												<th>Serial No</th>
												<th>
													<input
														id="chkboxSelectAll"
														type="checkbox"
														onChange={this.mainCheckBoxSelected}
													/>
												</th>
											</thead>
											<tbody>{ProReg}</tbody>
										</table>
									</div>
									{/*********************************** Submit Button was Created here *********************************************** */}
									{/* <div>
											<input type = "button" value = "Submit" onClick = {this.SubmitCheckedData} />
											</div> */}

									{/*********************************** Submit Button was Created here *********************************************** */}
									<div
										class="tab-pane fade"
										id="profile"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
										<table id="tab" className="table table-bordered mb-4 css-serial" style={{ marginTop: 20 }}>
											<thead className="text-center" style={{ backgroundColor: '#d8d8d8' }}>
												<tr>
													<th>Sl No:</th>
													<th>
														<div
															id="divOem"
															className="form-group"
															style={{ width: '100px' }}
														>
															<label>OEM:</label>
															<select
																className="form-control"
																name="oem"
																onChange={this.onChangeOem}
																placeholder="oem"
															>
															<option value="Select">Select</option>
															{Oem}
															</select>
														</div>
													</th>
													<th>
														<div className="form-group" style={{ width: '100px' }}>
															<label>Category:</label>
															<select
																id="divCategory"
																className="form-control"
																name="productcategoryid"
																onChange={this.onChangeCategory}
															>
																<option value="Select">Select</option>
																{catagoryComboBox}
															</select>
														</div>
													</th>
													<th>
														<div className="form-group" style={{ width: '150px' }}>
															<label>Sub-Category:</label>
															<select
																id="divSubCategory"
																className="form-control"
																name="productsubcategoryid"
																onChange={this.onChangeSubCategory}
															>
																<option value="Select">Select</option>
																{subCatagoryComboBox}
															</select>
														</div>
													</th>
													<th>
														<div className="form-group" style={{ width: '100px' }}>
															<label>Model No:</label>
															<select
																id="divModelNo"
																className="form-control"
																name="modelno"
																onChange={this.onChange}
															>
																<option value="Select">Select</option>
																{modelNoComboBox}
															</select>
														</div>
													</th>
													<th>
														<div className="form-group" style={{ width: '100px' }}>
															<label>Serial No: </label>
															<input
																type="text"
																name="serialno"
																className="form-control"
																placeholder="Serial No"
																value={this.state.warrantyexpiredate}
																onChange={this.onChange}
															/>
														</div>
													</th>
													<th colSpan="2">
														{' '}
														<div className="form-group">
															<label>Action: </label>
															<br />
															<input
																type="Button"
																value="Enter Data"
																onMouseDown={this.onEnterData}
																onMouseUp={this.newDataEntered}
																className="btn btn-primary"
																disabled = {!(this.state.oem && this.state.productcategoryid && this.state.productsubcategoryid && this.state.modelno && this.state.serialno  )}
															/>
														</div>
													</th>
												</tr>
											</thead>
											<tbody id="tableProreg" className="text-center">
												{/* <UpdateTableList objAMC = {tempArrNewProduct} key={i} /> */}
												{tabList}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</form>
				<input type="button" onClick = {this.done} value="Done" className="btn btn-info" />
			</div>
		);
	}
}

export default EditAmcReg;
