// Fotos de professores
import Person from './../../imgs/testimonial/person.jpg'
import Person2 from './../../imgs/testimonial/person2.jpg'
import Person3 from './../../imgs/testimonial/person3.jpg'
import Person4 from './../../imgs/testimonial/person4.jpg'


import Testimonial from './Testimonial'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {Navigation, Autoplay} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function Testimonials() {

    const professorArray = [
        ['Carla Martins', Person, 'Estudante de Direito Penal', 'Adoro aulas online porque posso concluir meus estudos em casa. Tenho mais tempo para ficar com meu filho de 1 ano porque não tenho que ir para a escola, o que também economiza dinheiro.'],
        ['Roberto Farias', Person2, 'Professor de Matemática', 'Suspendisse gravida ipsum sagittis, suscipit tortor egestas, varius ligula. Proin lorem elit, aliquam sit amet nulla sed, dictum gravida turpis.'],
        ['Fernada Carolina', Person3, 'Professora de Inglês', 'Suspendisse gravida ipsum sagittis, suscipit tortor egestas, varius ligula. Proin lorem elit, aliquam sit amet nulla sed, dictum gravida turpis. Mauris dapibus accumsan tortor eget auctor.'],
        ['Paulo Freira', Person4, 'Educador financeiro', 'Suspendisse gravida ipsum sagittis, suscipit tortor egestas, varius ligula. Proin lorem elit, aliquam sit amet nulla sed, dictum gravida turpis.'],
    ]

    const professorMap = professorArray.map((professor, index) => (
        <SwiperSlide key={index}>
            <Testimonial name={professor[0]} photo={professor[1]} profission={professor[2]} message={professor[3]}/>
        </SwiperSlide>
    ))

    return (
        <div id='testimonial'>
            <div className='testimonial-content'>
                <Swiper              
                    slidesPerGroup={1} slidesPerView={'auto'} loop={true} loopFillGroupWithBlank={true} speed={1200}
                    autoplay={{
                        disableOnInteraction: false,
                        delay: 5000
                    }}                    
                    className="testimonial-swiper"
                >         
                    {professorMap}
                </Swiper>
            </div>
        </div>
    )

}

export default Testimonials;