import React from 'react'
import { useSelector } from 'react-redux'

export default function HomeCarousel(props) {
    const {arrImg} = useSelector(state=>state.CarouselReducer)
    const remderImg = () => {
        return arrImg.map((item,index) => {
            return <div key={index} className={`carousel-item ${index === 1 ? 'active' : ''}`}>
                <div style={{backgroundImage:`url(${item.hinhAnh})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'100%', height:'300px', display:'block'}}>
                </div>
            </div>
        })
    }
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
            {remderImg()}
            </div>
        </div>
    )
}