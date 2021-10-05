import React from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/style/circle.css'
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

export default function Detail(props) {
  

    const PhimDetail = useSelector(state => state.QuanLyPhimReducer.PhimDetail)
    const dispatch = useDispatch()
    useEffect(() => {
        //lấy thông tin param ở url
        let { id } = props.match.params;
        dispatch(layThongTinChiTietPhim(id))
    }, [])
    const { t, i18n } = useTranslation();



    return (
        <div className='detail' style={{ backgroundImage: `url(${PhimDetail.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <CustomCard style={{ background: 'rgba(16,18,27,0.4)', minHeight: '100vh', padding: '0' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={1} // default border radius value is 10px
            >
                <div className='detail_item container' style={{ padding: '150px 150px 0 150px', display: 'flex', justifyContent: 'space-around' }}>
                    <div className='detail_item_first w-70' style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='detail_item_content' style={{ display: 'flex', width: '100%' }}>
                            <div className='detail_imgFilm' style={{backgroundImage:`url(${PhimDetail.hinhAnh})`, backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat', width: '200px', height: '100%'}}></div>
                            <div className='detail_text' style={{ paddingTop: '20px', width:'50%', paddingLeft:'20px' }}>
                                <p className='text-sm'>{t('show date')}: {moment(PhimDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-3xl'>{PhimDetail.tenPhim}</p>
                                <p>{PhimDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-30' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 className='text-2xl text-white'>{t('rate')}</h1>
                        <h1 className='text-green-400 text-2xl'><Rate allowHalf value={PhimDetail.danhGia / 2} /></h1>
                        <div className={`c100 p${PhimDetail.danhGia * 10} big`} style={{background:'transparent', margin:'0 auto'}}>
                            <span>{PhimDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container  mt-10 bg-white'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab={`${t('showtimes')}`} key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {PhimDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane tab={
                                            <div className='flex flex-row items-center justify-center'>
                                                <img src={htr.logo} width={50} height={50} />
                                                <div className='text-center ml-2'>
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>} key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='mb-5' key={index}>
                                                    <div className='flex flex-row'>
                                                        <img src={cumRap.hinhAnh} style={{ width: 60, height: 60 }} />
                                                        <div className='ml-2'>
                                                            <p style={{ fontSize: 15, fontWeight: 'bold', lineHeight: 1 }}>{cumRap.tenCumRap}</p>
                                                            <p className='text-gray-400'>{cumRap.tenCumRap}</p>
                                                        </div>
                                                    </div>
                                                    <div className='thong-tin-lich-chieu grid grid-cols-6'>
                                                        {cumRap.lichChieuPhim?.slice(0,12).map((lichChieu, index) => {
                                                            return <NavLink key={index} to={`/checkout/${lichChieu.maLichChieu}`} className='col-span-1 text-green-800 font-bold'>
                                                                    {moment(lichChieu.ngayKhoiChieu).format(('hh:mm A'))}
                                                            </NavLink>
                                                            
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}

                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab={`${t('information')}`} key="2">
                        {t('information')}
                        </TabPane>
                        <TabPane tab={`${t('rate')}`} key="3">
                        {t('rate')}
                        </TabPane>
                    </Tabs>
                </div>

            </CustomCard>

        </div>
    )
}
