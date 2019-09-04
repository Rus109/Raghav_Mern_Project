import React, { Component } from 'react'

class InstProRegDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
	}
	componentDidMount(){
		
		console.log(this.props.obj)
	}
    render() { 
		const ProRegProductsData = this.props.obj.products.map((item, i) => {
			return item;
		})

		var dateProregDate = new Date(this.props.obj.date);
		var dataDateProregDate = dateProregDate.toISOString().substr(0, 10);

		console.log(ProRegProductsData[0])
        return ( 
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
											Product Details
										</a>
									</li>
									<li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#profile"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Delivery Details
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
										<table id="tab1" className="table table-bordered mb-4">
                                            <thead>
                                                <td>Product Category</td>
                                                <td>Sub Category</td>
                                                <td>OEM</td>
                                                <td>Model No</td>
                                            </thead>
                                            <tbody>
     										<tr>
                                                <td>{Object.entries(ProRegProductsData[0].category)[1].slice(1)}</td>
                                                <td>{Object.entries(ProRegProductsData[0].subcategory)[1].slice(1)}</td>
                                                <td>{Object.entries(ProRegProductsData[0].oem)[1].slice(1)}</td>
                                                <td>{ProRegProductsData[0].modelno}</td>
                                            </tr>
                                            </tbody>
                                        </table>
										</div>

									<div
										class="tab-pane fade"
										id="profile"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
										<table id="tab2" className="table table-bordered mb-4">
                                            <thead>
                                                <td>Ref No 1</td>
                                                <td>Ref No 2</td>
                                                <td>Delivery Date</td>
                                                <td>Customer type</td>
                                                <td>Customer</td>
                                                <td>Department</td>
                                            </thead>
                                            <tbody>
												<tr>
                                                <td>{this.props.obj.refno1}</td>
                                                <td>{this.props.obj.refno2}</td>
                                                <td>{dataDateProregDate}</td>
                                                <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
                                                <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
                                                <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
                                            </tr>
                                            </tbody>
                                        </table>
									</div>
								</div>
							</div>
         );
    }
}
 
export default InstProRegDetails;