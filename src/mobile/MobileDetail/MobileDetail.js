import React, { Fragment, useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { SubMenu } = Menu;


export default function MobileDetail(props) {
    const PhimDetail = useSelector(state => state.QuanLyPhimReducer.PhimDetail)



    const renderHeThongRapMobile = () => {
        return PhimDetail.heThongRapChieu?.map((htr, index) => {
            return <Menu key={index} mode="inline" style={{ width: '100%' }}>
                <SubMenu icon={<img src={htr.logo} className='rounded-full' width='40' />} title={htr.tenHeThongRap}>
                    {htr.cumRapChieu?.map((cumRap, index1) => {
                        return <SubMenu key={index1} icon={<img src={cumRap.hinhAnh} width='40' height='40' />} title={cumRap.tenCumRap}>
                                 <div  className='grid grid-cols-3' style={{margin:'20px 0', textAlign:'center'}}>
                                    {cumRap.lichChieuPhim?.slice(0, 6).map((lichChieu, index3) => {
                                        return <NavLink key={index3} to={`/checkout/${lichChieu.maLichChieu}`} className='col-span-1 text-green-800 font-bold'>
                                            {moment(lichChieu.ngayKhoiChieu).format(('hh:mm A'))}
                                        </NavLink>
                                    })}
                                </div>
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
