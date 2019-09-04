import React, { Component, Fragment } from 'react'
import isEmpty from '../../../validation/is-empty';
import axios from 'axios';

var checkedData = [];
let serialno = "";
let AmcId = "";
let AmcRenew = "";
let triggerer = false;

class AmcDetailsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.checkBoxSelected = this.checkBoxSelected.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }
    
    componentDidMount(){
        console.log(this.props.obj)
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

        console.log()
        axios
          .get("http://localhost:4000/api/amcrenewal")
          .then(response => {
            console.log(response.data);
            let tempArr = response.data;

            tempArr.map(i2 => {
                console.log(i2)
              i2.multpleamcandref.map(i3 => {
                  console.log(i3.arnserialno)
                  console.log(serialno)
                if(i3.arnserialno === serialno){
                  alert("The Serial No's AMC already renewed!");
                  let checker = document.getElementById(serialno + "checker");
                  if(checker.checked == true){
                      checker.checked = false;
                  }
                  triggerer = true;
                }
            })
        })

        if(triggerer === false){
        let checker = document.getElementById(serialno + "checker");
        if(checker.checked == true){
            let obj = {
                  amcregid: AmcId,
                  arnserialno: serialno,
                  dataamc: "multi"
            }
            checkedData.push(obj);

            console.log("entered")
            axios
            .post('http://localhost:4000/api/amcrenewal/product/' + AmcRenew, obj)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        }

        if(checker.checked == false)
        {
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
    })

    triggerer = false;
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

        console.log(serialno)
        return ( 
        <Fragment>
        {rows}
        </Fragment>
         );
    }
}
 
export default AmcDetailsTable;