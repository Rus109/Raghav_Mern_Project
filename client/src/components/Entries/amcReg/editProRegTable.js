import React, { Component } from 'react';
import axios from 'axios';

var checkedData = [];
let ids = "";
class EditProRegTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company: [],
            category: [],
            subcategory: [],

        // Get Products Data to Register for AMC
            productsData: []
         }
        this.checkBoxSelected = this.checkBoxSelected.bind(this);
    }

    componentDidMount(){

        console.log(this.props.objAMC)
        console.log(this.props.obj.serialno)

        axios.get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
 
      axios
        .get("http://localhost:4000/api/productcategory")
        .then(response => {
          this.setState({ category: response.data });
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

           for(var i = 0; i < this.props.objAMC.length; i++){
           if(this.props.obj.serialno === this.props.objAMC[i]){
               console.log("this")
                document.getElementById(this.props.obj._id + "chkbox").checked = true;
            }
        }

    }

    checkBoxSelected(e){
        var data = e.target.value.split("#");
        var obj = {
            id: data[0],
            companyid: data[1],
            productcategoryid: data[2],
            productsubcategoryid: data[3],
            modelno: data[4],
            serialno: data[5],
        }

        console.log(obj);
        let checker = document.getElementById(data[0] + "chkbox");
        if(checker.checked == true){
            checkedData.push(obj);

            axios
            .post('http://localhost:4000/api/amcregistration/products/' + this.props.proid, obj)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        }

        if(checker.checked == false)
        {
            let onlyids = [];
            let onlyserialno = [];
            axios.get('http://localhost:4000/api/amcregistration/edit/' + this.props.proid).then((res) => {
				let temparrid = [];
				temparrid = res.data.products;

				for (var i = 0; i < temparrid.length; i++) {
					onlyids.push(temparrid[i]._id);
					onlyserialno.push(temparrid[i].serialno);
                }

					for (var k = 0; k < onlyids.length; k++) {
						if (data[5] === onlyserialno[k]) {
							console.log(onlyids[k])
							axios
								.delete('http://localhost:4000/api/amcregistration/product_all/' + this.props.proid +'/' +onlyids[k])
								.then(console.log('Deleted'))
								.catch((err) => console.log(err));
						}
					}
            })

            for(var i = 0; i < checkedData.length; i++)
            {
                for(var i = 0; i < checkedData.length; i++){
                    if(checkedData[i].id === data[0]){
                        checkedData.splice(i)
                    }
                }
            }
        }
    }

    retrieveData(arr){
        for(var i = 0; i < arr.length; i++){
            axios
        .get("http://localhost:4000/api/proreg/" + this.props.proid)
        .then(response => {this.setState({
            productsData: response.data.products
        })}
        )
        .catch(function(error) {
          console.log(error);
        }) 
        }
    }

    render() { 
        var Company = '';
		var Category = '';
		var SubCategory = '';

        ids = this.props.obj.oem;
		if (this.state.company !== null) {
			for (var i = 0; i < this.state.company.length; i++) {
				if (this.props.obj.oem === this.state.company[i]._id) {
					Company = this.state.company[i].companyname;
				}
			}
		}

		if (this.state.category !== null) {
			for (var i = 0; i < this.state.category.length; i++) {
				if (this.props.obj.category === this.state.category[i]._id) {
					Category = this.state.category[i].category;
				}
			}
		}

		if (this.state.subcategory !== null) {
			for (var i = 0; i < this.state.subcategory.length; i++) {
				if (this.props.obj.subcategory === this.state.subcategory[i]._id) {
					SubCategory = this.state.subcategory[i].subcategory;
				}
			}
        }
     
        return ( 
        <tr>
            <td></td>
            <td>{Company}</td>
            <td>{Category}</td>
            <td>{SubCategory}</td>
            <td>{this.props.obj.modelno}</td>
            <td>{this.props.obj.serialno}</td>
            <td><input type="checkbox" id = {this.props.obj._id + "chkbox"} value={this.props.obj._id + "#" + this.props.obj.oem + "#" + this.props.obj.category + "#" + this.props.obj.subcategory + "#" + this.props.obj.modelno + "#" + this.props.obj.serialno} onChange = {this.checkBoxSelected} ></input></td>
        </tr>
        );
    }
}
 
export default EditProRegTable;