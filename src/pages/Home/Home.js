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
    //props.match.param

    // const renderPhim = () => {
    //     return arrPhim.map((phim,index)=> {
    //         return <Phim key={index} />
    //     })
    // }
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
                {/* <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                       {renderPhim()}
                    </div>
                </div>
            </section> */}

                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    )
}
