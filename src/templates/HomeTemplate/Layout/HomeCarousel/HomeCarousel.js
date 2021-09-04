import React from 'react'
import { useSelector } from 'react-redux'

export default function HomeCarousel(props) {
    const {arrImg} = useSelector(state=>state.CarouselReducer)
    console.log('arrImg',arrImg)
    const remderImg = () => {
        return arrImg.map((item,index) => {
            return <div key={index} className="carousel-item" style={{backgroundImage:`url(${item.hinhAnh})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'100%', height:'600px', display:'block'}}>
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
            <div className="carousel-inner"  style={{width:'100%', height:'600px'}}>
            {remderImg()}
            </div>
        </div>
    )
}