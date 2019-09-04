import React, { Component } from 'react'


class WarrantyProreg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("hi")
    }
    render() { 
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
											aria-selected="true">
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
											aria-selected="false">
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
                                            <thead>\
                                                <tr>
                                                <td>Product Category</td>
                                                <td>Sub Category</td>
                                                <td>OEM</td>
                                                <td>Model No</td>
                                                <td>Description</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            
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
                                                <tr>                                               
                                                <td>Ref No 1</td>
                                                <td>Ref No 2</td>
                                                <td>Delivery Date</td>
                                                <td>Customer type</td>
                                                <td>Customer</td>
                                                <td>Department</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                       
                                            </tbody>
                                        </table>
									</div>
								</div>
							</div>
         );
    }
}
 
export default WarrantyProreg;