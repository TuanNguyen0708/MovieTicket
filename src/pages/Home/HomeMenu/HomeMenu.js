import React, { Fragment } from 'react'
import { Tabs } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import MobileHomeMenu from '../../../mobile/MobileHomeMenu.js/MobileHomeMenu';

const { TabPane } = Tabs;



export default function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })
    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };
    const renderHeThongRap = () => {

        return props.heThongRapChieu?.map((heThongRap, index) => {
             return <TabPane key={index} tab={<img src={heThongRap.logo} className='rounded-full' width='50' />}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.slice(0,5).map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div style={{ width: '300px', display: 'flex', alignItems: 'center' }}>
                                <img src='https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png' width='50' />
                                <div className='ml-2 text-left'>
                                    {cumRap.tenCumRap}
                                    <p className='text-red-200'>Chi Tiết</p>
                                </div>
                            </div>

                        }>
                            {/* load phim tuong ung */}
                            {cumRap.danhSachPhim?.slice(0,5).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className='my-2' style={{ display: 'flex' }}>
                                        <div style={{ display: 'flex' }}>
                                            <img src={phim.hinhAnh} style={{ width: '100px', height: '100px' }} />
                                            <div className='ml-2'>
                                                <h3 className='text-xl'>{phim.tenPhim}</h3>
                                                <p>{cumRap.diaChi}</p>
                                                <div className='grid grid-cols-6 gap-3'>
                                                    {phim.lstLichChieuTheoPhim?.slice(0,6).map((lichChieu, index) => {
                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane> 
        })
    }

    const { tabPosition } = state;

    return (
        < >
            <Tabs className='homeMenu' tabPosition={tabPosition} style={{width:'80%', margin:'100px auto'}}>
                {renderHeThongRap()}
            </Tabs>
            <div className='mobileHomeMenu' style ={{margin: '50px 30px', display:'none'}}>
                <MobileHomeMenu />

            </div>
        </>
    )
}
