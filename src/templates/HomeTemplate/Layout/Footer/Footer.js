import { AppleOutlined, FacebookOutlined } from '@ant-design/icons'
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Footer(props) {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));


    return (
        <footer className="page-footer font-small mdb-color pt-4" style={{background:'#1f2937'}}>
            {/* Footer Links */}
            <div className="text-center text-md-left">
                {/* Footer links */}
                <div className="row text-center text-md-left mt-3 pb-3">
                    {/* Grid column */}
                    <div className="footer_logo col-md-3 col-lg-3 col-xl-3 mx-auto mt-3" style={{textAlign:'center'}}>
                        <img className="footer_logo_img" src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyberlearn' />
                    </div>
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 text-white" style={{textAlign:'center'}}>
                        <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                        <p>
                            MDBootstrap
                        </p>
                        <p>
                            MDWordPress
                        </p>
                        <p>
                            BrandFlow
                        </p>
                        <p>
                           Bootstrap Angular
                        </p>
                    </div>
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-white" style={{textAlign:'center'}}>
                        <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                        <p>
                            Your Account
                        </p>
                        <p>
                            Become an Affiliate
                        </p>
                        <p>
                            Shipping Rates
                        </p>
                        <p>
                            Help
                        </p>
                    </div>
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-white" style={{textAlign:'center'}}>
                        <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                        <p>
                            <i className="fas fa-home mr-3" /> New York, NY 10012, US</p>
                        <p>
                            <i className="fas fa-envelope mr-3" /> info@gmail.com</p>
                        <p>
                            <i className="fas fa-phone mr-3" /> + 01 234 567 88</p>
                        <p>
                            <i className="fas fa-print mr-3" /> + 01 234 567 89</p>
                    </div>
                    {/* Grid column */}
                </div>
                {/* Footer links */}
                <hr />
                {/* Grid row */}
                <div class="footer-copyright text-center text-black-50 py-3">© 2020 Copyright:
                    <a class="dark-grey-text text-white" href="http://cyberlearn.vn/"> Cyberlearn</a>
                </div>

            </div>

        </footer>


    )
}