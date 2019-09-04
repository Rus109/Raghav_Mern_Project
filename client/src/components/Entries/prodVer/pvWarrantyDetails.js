import React, { Component, Fragment } from 'react'

class PVWarrantyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillMount(){
        console.log("PV Warranty", this.props.obj)
    }
    render() { 

        var oemdate = "";
        var date = "";
        var oemprovider ="";
        var provider ="";
        var oemfrom = "";
        var from = "";
        var oemto = "";
        var to = "";

        const ProductDetails = this.props.obj.products.map(item => {
            return item
        })

        var ProregDate = new Date(this.props.obj.date);
        var OemDate = new Date(ProductDetails[0].oemwarrantyfrom);
        var CompanyDate = new Date(ProductDetails[0].warrantyfrom);
        var OemDateTo = new Date(ProductDetails[0].oemwarrantyto);
        var CompanyDateTO = new Date(ProductDetails[0].warrantyto);

        var dataProregDate = ProregDate.toISOString().substr(0, 10);
        var dataOemDate = OemDate.toISOString().substr(0, 10);
        var dataCompanyDate = CompanyDate.toISOString().substr(0, 10);
        var dataOemDateTo = OemDateTo.toISOString().substr(0, 10);
        var dataCompanyDateTO = CompanyDateTO.toISOString().substr(0, 10);
        console.log(dataOemDate)

        if(dataOemDate == "1111-11-11"){

        oemdate = "Nil";
        oemprovider = "Nil";
        oemfrom = "Nil";
        oemto = "Nil";
        date = dataProregDate;
        provider = "NiceInfotech";
        from = dataCompanyDate;
        to = dataCompanyDateTO;
        }
        else if(dataCompanyDate == "1111-11-11"){
            console.log("this")
        oemdate = dataProregDate;
        oemprovider = Object.entries(ProductDetails[0].oem)[1].slice(1);
        oemfrom = dataOemDate;
        oemto = dataOemDateTo;
        date = "Nil";
        provider = "Nil";
        from = "Nil";
        to = "Nil";
        }
        else{
        oemdate = dataProregDate;
        oemprovider = Object.entries(ProductDetails[0].oem)[1].slice(1);
        oemfrom = dataOemDate;
        oemto = dataOemDateTo;
        date = dataProregDate;
        provider = "NiceInfotech";
        from = dataCompanyDate;
        to = dataCompanyDateTO;
        }
        return ( 
            <Fragment>
                <tr>
                    <td>OEM</td>
                    <td>{oemdate}</td>
                    <td>{oemprovider}</td>
                    <td>{oemfrom}</td>
                    <td>{oemto}</td>
                </tr>
                <tr>
                    <td>Company</td>
                    <td>{date}</td>
                    <td>{provider}</td>
                    <td>{from}</td>
                    <td>{to}</td>
                </tr>
            </Fragment>
         );
    }
}
 
export default PVWarrantyDetails;