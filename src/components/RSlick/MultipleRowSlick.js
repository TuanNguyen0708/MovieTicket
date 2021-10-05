import React, { Component } from "react";
import styleSlick from './MultipleRowSlick.module.css'
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useTranslation } from "react-i18next";
import { history } from '../../App'

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
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)

  const renderPhim = () => {
    return props.arrPhim.slice(0, 20).map((item, index) => {
      return <div className='multiple_item' key={index} style={{ width: '20%', padding: '0 30px' }}>
        <div className="card" style={{ width: '100%', height: '20rem', backgroundImage: `url(${item.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
        </div>
        <div className="card-body">
          <h5 className="card-title" >{item.tenPhim.length > 5 ? item.tenPhim.substr(0, 20) + '...' : item.tenPhim}</h5>
          <button className='btn btn-success' onClick={() => {
            history.push(`/detail/${item.maPhim}`)
          }}>{t('book ticket')}</button>
        </div>
      </div>
    })
  }
  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
  let activeClassSC = sapChieu === true ? 'none_active_Film' : 'active_Film';

  const { t, i18n } = useTranslation();

  return (
    <div className='mt-5'>
      <div className='multiple' style={{ marginLeft: '45px' }}>
        <button type="button" className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded mr-3`} onClick={() => {
          const action = { type: SET_PHIM_DANG_CHIEU }
          dispatch(action)
        }} >{t('playing movie')}</button>
        <button type="button" className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded border`} onClick={() => {
          const action = { type: SET_PHIM_SAP_CHIEU }
          dispatch(action)
        }} >{t('upcoming movie')}</button>
      </div>

      <div className='multiple_film container mt-5' style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
        {renderPhim()}
      </div>
    </div>
  );
}


export default MultipleRows