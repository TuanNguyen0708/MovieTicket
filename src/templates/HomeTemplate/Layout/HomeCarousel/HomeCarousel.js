import React from 'react'
import { useSelector } from 'react-redux'

export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer)
    const remderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index} className={`carousel-item ${index === 1 ? 'active' : ''}`}>
                <div style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100%', height: '100vh' }}>
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
            <div className="carousel-inner" >
                {remderImg()}
            </div>
            <div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}