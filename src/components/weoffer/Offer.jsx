import './offer.scss'

function Offer({name, description, selected}) {

    return (
        <div className={selected ? 'offer selected' : 'offer'}>
            <div className="offerContent">
                <div>
                    <h6>{name}</h6>
                </div>
                <p className='normal'>{description}</p>                
            </div>            
        </div>
    );

}

export default Offer;