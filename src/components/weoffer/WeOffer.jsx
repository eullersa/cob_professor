import Offer from './Offer'

function WeOffer() {

    return (
        <div id='weoffer'>
            <div className='weofferContent'>
                <div className='titlesection'>
                    <h5>O que oferecemos?</h5>
                    <p>Donec malesuada lectus nec vehicula vulputate.
                    Cras porttitor, lectus sit amet.</p>
                </div>
                <div className='hiddenEffects'>
                    <div className="offers">
                        <Offer 
                            name='Transmissão ao vivo' 
                            description='Donec malesuada lectus nec vehicula vulputate. 
                                        Cras porttitor, lectus sit amet ultrices consequat. 
                                        Maecenas eget arcu.'
                            selected={true}
                        />
                        <Offer 
                            name='Feedback inteligente' 
                            description='Donec malesuada lectus nec vehicula vulputate. 
                                        Cras porttitor, lectus sit amet ultrices consequat. 
                                        Maecenas eget arcu.'
                        />
                        <Offer 
                            name='Gerenciamento de aulas' 
                            description='Donec malesuada lectus nec vehicula vulputate. 
                                        Cras porttitor, lectus sit amet ultrices consequat. 
                                        Maecenas eget arcu.'
                        />
                        <Offer 
                            name='Recursos exclusivos' 
                            description='Donec malesuada lectus nec vehicula vulputate. 
                                        Cras porttitor, lectus sit amet ultrices consequat. 
                                        Maecenas eget arcu.'
                        />
                    </div>
                </div>
                <div className='titlesection secondary'>
                    <h5>E muito mais...</h5>
                    <p>Donec malesuada lectus nec vehicula vulputate.
                    Cras porttitor, lectus sit amet.</p>
                </div>
            </div>
        </div>
    );

}

export default WeOffer;