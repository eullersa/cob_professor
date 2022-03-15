import Quotation from './../../imgs/testimonial/quotation.png'

function Testimonial({message, name, photo, profission}) {

    return (
        <div className='testimonial'>
            <div className='testimonial-text'>
                <div className='quotation'><img src={Quotation} alt="quotation" /></div>
                <div><p className='normal'>{message}</p></div>                
            </div>
            <div className='testimonial-person'>
                <div className='testimonial-name'>
                    <div className="name">{name}</div>
                    <div className="country"><i>{profission}</i></div>
                </div>
                <div className="image">
                    <div className="ball-image"></div>
                    <img src={photo} alt='person' className="person" />
                </div>
            </div>
        </div>
    )

}

export default Testimonial;


