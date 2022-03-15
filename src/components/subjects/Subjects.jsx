import { useState } from 'react';

// Imagens
import Biologicas from './../../imgs/swiper/biologicas.png'
import Ciencias from './../../imgs/swiper/ciencias.png'
import Economia from './../../imgs/swiper/economia.png'
import Exatas from './../../imgs/swiper/exatas.png'
import Linguas from './../../imgs/swiper/linguas.png'
import Geografia from './../../imgs/swiper/geografia.png'
import Historia from './../../imgs/swiper/historia.png'
import Fisica from './../../imgs/swiper/fisica.png'
import Portugues from './../../imgs/swiper/portugues.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {Navigation, Autoplay} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);


function Subjects() {

    // First step is completely!!!

    const [hovered, setHovered] = useState([])
    const [errorTransition, setErrorTransition] = useState([])
    const [error, setError] = useState(false)    

    // Second step

    // Multiple buttons hovered

    const buttonsArray = [
        ["Matemática", Exatas],
        ["Português", Portugues],
        ["Biologia", Biologicas],
        ["Química", Ciencias],
        ["Física", Fisica],
        ["Geografia", Geografia],
        ["História", Historia],
        ["Economia", Economia],
        ["Idiomas", Linguas]
    ]

    const buttonsMap = buttonsArray.map((button, index) => (
        <SwiperSlide key={index} >
            <div
            className={`subjectButton
                ${index === hovered.find(find => find === index) ? `hovered` : ``}
                ${index === errorTransition.find(find => find === index) ? `errorTransition` : ``}
            `}
                onMouseEnter={() => {
                    let findButton = hovered.some(find => find === index)
                    if(findButton !== true) {
                        setHovered(prevHovered => ([...prevHovered, index]))
                        setErrorTransition(prevError => ([...prevError, index]))
                        setError(false)
                    } else {
                        setError(true)
                    }
                }}

                onMouseLeave={() => {
                    setTimeout(() => {
                        let findButton = hovered.some(find => find === index)
                        if(findButton === true && error === false) {
                            setHovered(prevHovered => (prevHovered.filter(hover => hover !== index)))
                            setErrorTransition(prevError => (prevError.filter(error => error !== index)))
                            setError(false)
                        }
                    }, 1000)
                }}
            >
                <img
                    src={button[1] ? button[1] : ''} 
                    style={{display: button[1] ? '' : 'none'}}
                    alt='swiperimg' 
                    className='swiperimg'
                />
                <span className='swiperText'>{button[0]}</span>
            </div>
        </SwiperSlide>
    ))

    return (
    <div id='subjects'>
        <div className="buttonsGroup">            
            <div className='pagButtons prev'> &lt; </div>
            <Swiper              
                slidesPerGroup={1}
                slidesPerView={'auto'}
                loop={true}
                loopFillGroupWithBlank={true}
                speed={1600}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                autoplay={{
                    disableOnInteraction: false,
                    delay: 2000
                }}
                
                className="mySwiper"
            >         
                {buttonsMap}
            </Swiper>        
            <div className='pagButtons next'>&gt;</div>
        </div>
    </div>
    );

}

export default Subjects;