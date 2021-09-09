import React from 'react'
import { NavLink } from 'react-router-dom';
import './Phim_Flip.css'

export default function Phim_Flip(props) {

    const {item} = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div style={{backgroundImage:`url(${item.hinhAnh})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'300px', width:'100%'}}>
                        {/* <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} /> */}
                    </div>
                    
                </div>
                <div className="flip-card-back" style={{position:'relative', backgroundColor:'rgba(0,0,0,0.9)'}}>
                    <div style={{position:'absolute', top:'0', left:'0'}}>
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                    </div>
                    <div className='w-full h-full' style={{position:'absolute', backgroundColor:'rgba(0,0,0,0.5', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <div className='rounded-full cursor-pointer'><span class="material-icons" style={{fontSize:'80px', alignItems:'center'}}>play_circle_outline</span></div>
                        <div className='text-2xl mt-2 font-bold'>{item.tenPhim}</div>
                    </div>
                </div>
            </div>
            <div className='bg-orange-300 text-center cursor-pointer py-2 mt-2 bg-indigo-300 text-success-50 font-bold'>
                <NavLink to={`/detail/${item.maPhim}`} >ĐẶT VÉ</NavLink>
            </div>
            
        </div>

    )
}
