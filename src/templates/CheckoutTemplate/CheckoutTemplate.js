import { Fragment } from "react";
import { Redirect, Route } from "react-router";

import { USE_LOGIN } from "../../util/settings/config";



 const CheckoutTemplate = (props) => {
    const {Component, ...restProps} = props;

    //Chuyển hướng trang khi chưa đăng nhập
    if(!localStorage.getItem(USE_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute)=>{

        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}
export default CheckoutTemplate