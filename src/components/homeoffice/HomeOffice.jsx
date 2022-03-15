import ImageHomeOffice from "./../../imgs/homeoffice/image3.png";
import WidgetText from "./../widgettext/WidgetText.jsx"

function HomeOffice() {

    const toUpperCase = (string) => {
        return string.toUpperCase()
    }

    return (
        <div id='homeoffice'>
            <div  className='homeoffice-content'>
                <div className='left'>
                    <h6>{toUpperCase('Produtividade e suporte')}</h6>
                    <h1>Otimize o seu Home Office</h1>
                    <p>Tenha a sua plataforma com super ferramentas para ensinar seus alunos de uma forma revolucionária.</p>
                    <div className='widgets'>
                        <WidgetText name='Faturamento' description='Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.' selected/>
                        <WidgetText name='Chats em grupo' description='Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.' />
                    </div>                    
                </div>
                <div className='right'>
                    <img src={ImageHomeOffice} alt="homeoffice" />
                </div>
            </div>
        </div>
    );
}

export default HomeOffice;