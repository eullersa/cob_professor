import Adobe from "./../../imgs/marks/adobe-gray.png";
import College from "./../../imgs/marks/college-board-gray.png";
import Gates from "./../../imgs/marks/gates-foundation-gray.png";
import Google from "./../../imgs/marks/google-gray.png";
import Lemann from "./../../imgs/marks/lemann-foundation-gray.png";
import Att from "./../../imgs/marks/att-gray.png";
import Fastly from "./../../imgs/marks/fastly-gray.png";
import Norvatis from "./../../imgs/marks/novartis-gray.png";

function Marks() {

    return (
        <div id='marks'>
            <div  className='marks-content'>
                <div className='marks-title'>
                    <h1><span>Empresas</span> que nos apoiam</h1>
                </div>
                <div className='marks-cards'>
                    <div className="lineOne">
                        <div>
                            <img src={Adobe} alt="adobe" />
                        </div>
                        <div>
                            <img src={College} alt="adobe" />
                        </div>
                        <div>
                            <img src={Att} alt="adobe" />
                        </div>
                        <div>
                            <img src={Fastly} alt="adobe" />
                        </div>
                    </div>
                    <div className="lineTwo">
                        <div>
                            <img src={Google} alt="adobe" />
                        </div>
                        <div>
                            <img src={Lemann} alt="adobe" />
                        </div>
                        <div>
                            <img src={Norvatis} alt="adobe" />
                        </div>
                        <div>
                            <img src={Gates} alt="adobe" />
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Marks;