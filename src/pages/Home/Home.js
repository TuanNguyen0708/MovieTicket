import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//ket noi redux
import { useSelector, useDispatch } from 'react-redux'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'




export default function Home() {
    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        const action = layDanhSachPhimAction()
        dispatch(action) //dispatch function từ thunk
        dispatch(layDanhSachHeThongRapAction());
    }, [])
    return (
        <div>
            <HomeCarousel />
            <div className='container'>
                <MultipleRowSlick arrPhim={arrPhim} />
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    )
}
