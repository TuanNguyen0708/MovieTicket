import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css'
import Phim from '../Phim/Phim'
import Phim_Flip from "../Phim/Phim_Flip";
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}





function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}


const MultipleRows = (props) => {
  const dispatch = useDispatch();
  const {dangChieu,sapChieu} = useSelector(state=>state.QuanLyPhimReducer)

  const renderPhim = () => {
    return props.arrPhim.slice(0,20).map((item,index)=>{
      return <div className='mt-2' key={index}>
          <Phim_Flip item={item} />
      </div>
      
    })
  }
  let activeClassDC = dangChieu===true ? 'active_Film' : 'none_active_Film';
  let activeClassSC = sapChieu===true ? 'none_active_Film' : 'active_Film';


    const settings = {
      className: "center variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 2,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className='mt-5'>
        <button type="button" className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded mr-3`} onClick={()=>{
          const action = {type:SET_PHIM_DANG_CHIEU}
          dispatch(action)
        }} >PHIM ĐANG CHIẾU</button>
        <button type="button" className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded border`} onClick={()=>{
          const action = {type:SET_PHIM_SAP_CHIEU}
          dispatch(action)
        }} >PHIM SẮP CHIẾU</button>
        <Slider {...settings}>
          {renderPhim()}
        </Slider>
      </div>
    );
}

export default MultipleRows