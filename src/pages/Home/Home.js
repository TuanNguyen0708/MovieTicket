import React from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//ket noi redux
import { useSelector, useDispatch } from 'react-redux'
import Phim from '../../components/Phim/Phim';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';



export default function Home() {
    const {arrPhim} = useSelector(state=>state.QuanLyPhimReducer);
    //props.match.param

    const renderPhim = () => {
        return arrPhim.map((phim,index)=> {
            return <Phim key={index} />
        })
    }
    return (
        <div className='container'>
            <MultipleRowSlick />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                       {renderPhim()}
                    </div>
                </div>
            </section>

            <HomeMenu />
        </div>
    )
}
