import Increase from './../../imgs/forwho/scalability.png';
import LineChart from './../../imgs/forwho/line-chart.png';
import Community from './../../imgs/forwho/community.png';

function ForWho() {

    return (
        <div id='forwho'>
            <div  className='forwho-content'>
                <div className='forwho-title'>
                    <h1>Você precisa da <span>Cobaye</span> para</h1>
                </div>
                <div className='forwho-cards'>
                    <div className="topicOne">
                        <h5>Fidelizar sua comunidade</h5>
                        <p className='normal'>Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.</p>
                        <img src={Community} alt="increase" />
                    </div>
                    
                    <div className="topicOne">
                        <h5>Escalar o seu negócio</h5>
                        <p className='normal'>Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.</p>
                        <img src={Increase} alt="increase" />
                    </div>
                    
                    <div className="topicOne">
                        <h5>Ver seus alunos crescerem</h5>
                        <p className='normal'>Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.</p>
                        <img src={LineChart} alt="increase" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForWho;