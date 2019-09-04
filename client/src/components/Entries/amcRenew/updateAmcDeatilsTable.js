import React, { Component, Fragment } from 'react'
import isEmpty from '../../../validation/is-empty';
import axios from 'axios';

var checkedData = [];
let serialno = "";
let AmcId = "";
let AmcRenew = "";

class UpdateAmcDetailsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.checkBoxSelected = this.checkBoxSelected.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }
    
    componentDidMount(){
        // if(!isEmpty(this.props.mapserialno)){
        // console.log(this.props.mapserialno)
        // let tempArr = this.props.mapserialno;
        // for(let i=0; i<=tempArr.length; i++){
        //     console.log(tempArr[i])
        //     let checker = document.getElementById("A123" + "checker");
        //     checker.checked = true;
        //     // checker.checked = true;
        // }
        // }
    
    }

    onMouseOver(){
        var rows = document.getElementById('tab3').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
           rows[i].onmouseenter = function() {
        console.log(rows[this.rowIndex].id);
        serialno = rows[this.rowIndex].id;
           }
        }
    }
        checkBoxSelected(e){

        let obj = {
                  amcregid: AmcId,
                  arnserialno: serialno,
                  dataamc: "multi"
        }

        let checker = document.getElementById(serialno + "checker");
        if(checker.checked == true){
            checkedData.push(obj);

            console.log("entered")
            axios
            .post('http://localhost:4000/api/amcrenewal/product/' + AmcRenew, obj)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        }

        if(checker.checked == false)
        {
            let onlyids = [];
            let onlyserialno = [];
            console.log("checkedData.id")
            axios.get('http://localhost:4000/api/amcrenewal/edit/' + AmcRenew).then((res) => {

                res.data.multpleamcandref.map(i1 => {
                    if(i1.arnserialno === serialno){
                        console.log(i1._id)
                              axios
                                .delete('http://localhost:4000/api/amcrenewal/product/' + AmcRenew +'/' + i1._id)
                                .then(console.log('Deleted'))
                                .catch((err) => console.log(err));    
                    }
                })
                
            })
        }
        console.log(checkedData);
    } 

    render() {
        let customerType = ""; 
        if(!isEmpty(this.props.obj.customertype)){
            console.log("true")
            customerType = Object.entries(this.props.obj.customertype)[1].slice(1);
        }

        let customer = ""; 
        if(!isEmpty(this.props.obj.customer)){
            console.log("true")
            customer = Object.entries(this.props.obj.customer)[1].slice(1);
        }

        let department = ""; 
        if(!isEmpty(this.props.obj.department)){
            console.log("true")
            department = Object.entries(this.props.obj.department)[1].slice(1);
        }

        if(!isEmpty(this.props.amcid)){
            AmcId = this.props.amcid;
        }

        if(!isEmpty(this.props.amcrenewid)){
            AmcRenew = this.props.amcrenewid;
        }
        
        let rows;
        if(!isEmpty(this.props.obj.products)){
        rows =    this.props.obj.products.map((item, i) => {
        return(
            <tr id={item.serialno} onMouseOver = {this.onMouseOver}>
                <td>{this.props.obj.amcrefno}</td>
                <td>{this.props.obj.amcregdate}</td>
                <td>{customerType}</td>
                <td>{customer}</td>
                <td>{department}</td>
                <td>{Object.entries(item.category)[1].slice(1)}</td>
                <td>{Object.entries(item.subcategory)[1].slice(1)}</td>
                <td>{Object.entries(item.oem)[1].slice(1)}</td>
                <td>{item.modelno}</td>
                <td>{item.serialno}</td>
                <td><input id={item.serialno + "checker"} type="checkbox" onChange = {this.checkBoxSelected}/></td>
            </tr>)
            })
        }

        if(!isEmpty(this.props.mapserialno)){
        console.log(this.props.mapserialno)
        }
        console.log(serialno)

    if(!isEmpty(this.props.mapserialno)){
        console.log(this.props.mapserialno)
        let tempArr = this.props.mapserialno;
        for(let i=0; i<=tempArr.length; i++){
            console.log(tempArr[i])
            let checker = document.getElementById(tempArr[i] + "checker");
            if(!isEmpty(checker)){
                checker.checked = true;
            }
            
        }
        }
        return ( 
        <Fragment>
        {rows}
        </Fragment>
         );
    }
}
 
export default UpdateAmcDetailsTable;