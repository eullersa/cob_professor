import { Fragment } from "react"

function Footer({over = true}) {

    let contact = [
        'Contate nos',
        'Central de ajuda',
        'Suporte da comunidade'
    ]

    let workwithus = [
        'Mande seu currículo',
        'Veja nossas vagas',
        'Conheça nossa equipe'
    ]

    let courses = [
        'Linguísticos',
        'Ensino Médio',
        'Ensino Universitário',
        'Cursos específico',
    ]

    let aboutus = [
        'Nossa equipe',
        'Nossos contribuidores',
        'Nossa liderança',
        'Carreiras',
    ]

    const listMap = (array) => {
        return array.map((li, id) => (
            <a href='#local' key={id} className='text'><li>{li}</li></a>
        ))
    }

    const overText = (over) => {
        if(over === true) {
            return (
                <Fragment>
                <div className="footer-content">
                    <div className="title">
                    <p className='normal'>Our mission is to provide a free, world-class education to anyone, anywhere.</p>
                    <p className='normal'>Cobaye is a plataform educational. Donate or volunteer today!</p>
                </div>
                    <div className="list">
                        <div className="listOne">
                            <ul>
                                <li className='description'>Contato</li>
                                {listMap(contact)}
                            </ul>
                            <ul>
                                <li className='description'>Sobre nós</li>
                                {listMap(aboutus)}
                            </ul>
                        </div>
                        <div className="listTwo">
                            <ul>
                                <li className='description'>Trabalhe conosco</li>
                                {listMap(workwithus)}
                            </ul>
                            <ul>
                                <li className='description'>Cursos</li>
                                {listMap(courses)}
                            </ul>
                        </div>
                </div>
                </div>
                <div className="divider"></div>
                </Fragment>
            )
        } else {
            return null
        }
    }

    return (
        <div id='footer'>
            <div className="content" style={over === false ? {padding: '30px 30px'} : {}}>
                {overText(over)}
                <div className="footerbrand">
                    <div className="left">
                        <div className="copyright">{`© ${new Date().getFullYear()} Cobaye`}</div>
                        <div className="terms"><a href="#terms" className='text'>Termos de uso</a></div>
                        <div className="privacy"><a href="#privacy" className='text'>Política de Privacidade</a></div>
                    </div>
                    <div className="right">
                        <a href="#instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#facebook"><i className="fab fa-facebook-square"></i></a>
                        <a href="#twitter"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Footer;