import React, { Fragment, useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { SubMenu } = Menu;


export default function MobileHomeMenu(props) {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)


    const renderHeThongRapMobile = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <Menu key={index} mode="inline" style={{ width: '100%' }}>
                <SubMenu icon={<img src={heThongRap.logo} className='rounded-full' width='40' />} title={heThongRap.tenHeThongRap}>
                    {heThongRap.lstCumRap?.slice(0, 5).map((cumRap, index1) => {
                        return <SubMenu key={index1} icon={<img src={heThongRap.logo} width='40' height='40' />} title={cumRap.tenCumRap}>
                            {cumRap.danhSachPhim?.slice(0, 5).map((phim, index2) => {
                                return <Menu.Item key={index2} icon={<img src={phim.hinhAnh} width='40' height='40' />} >
                                    {phim.tenPhim}
                                </Menu.Item>
                            })}
                        </SubMenu>
                    })}

                </SubMenu>
            </Menu>
        })
    }
    return (
        <Fragment >
            {renderHeThongRapMobile()}
        </Fragment >
    )
}
