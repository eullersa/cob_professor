import { Link } from "react-router-dom"
import Menina from './../../imgs/dashboard/meninaestudando.jpg'
import { Fragment } from "react";
import dayjs from 'dayjs'

function Progress({progress}) {

    const studied = progress?.studied?.map((value) => {
        return dayjs(new Date(value)).format('DD/MM/YYYY')
    })

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1)
        return new Date(d.setDate(diff));
    }
    
    const firstDay = [dayjs(getMonday(progress?.dateNow)).format("DD")]
    
    for (let i = 1; i < 7; i++) {
        firstDay.push(dayjs(getMonday(progress?.dateNow)).add(i, 'day').format("DD"))
    }

    const nameDays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']
    
    const days = firstDay?.map((value, index) => {
        const date = `${value}/${dayjs(progress?.dateNow).format("MM")}/${dayjs(progress?.dateNow).format("YYYY")}`

        if(dayjs(progress?.dateNow)?.format("DD/MM/YYYY") === date) {
            return (
                <li key={index} className={`days today`}>
                    <div className={`namedays`}>{isNaN(nameDays[index]) ? nameDays[index] : ''}</div>
                    {isNaN(value) ? '...' : value}
                    <div className={studied?.indexOf(date) > -1 ? `ball studied` : 'ball'}></div>
                    
                    <i className="fas fa-caret-up arrow"></i>
                </li>
            )
        } else {
            return (
                <li key={index} className='days'>
                    <div className={`namedays`}>{isNaN(nameDays[index]) ? nameDays[index] : ''}</div>
                    {isNaN(value) ? '...' : value}
                    <div className={studied?.indexOf(date) > -1 ? `ball studied` : 'ball'}></div>
                </li>
            )
        }
    })

    const monthNames = progress?.dateNow ? ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] : []
    
    const calendar = progress?.dateNow ? monthNames[new Date(progress?.dateNow)?.getMonth()].toUpperCase() + ' DE ' + new Date(progress?.dateNow)?.getFullYear() : undefined

    return (
        <Fragment>
            <div className="progressCard">
                <h6 className="card-title">Sua pontuação <span className='emoji'>🏆</span></h6>
                <span className="card-text">A pontuação é sua métrica de estudos.</span>
                <div className='pointsText'>Sequências: <span className='points sequence'>{progress?.sequence >= 0 ? progress?.sequence || 0 : '...'} <span className='emoji'>🔥</span></span>
                <div className='pointsText'>Pontos: <span className='points'>{progress?.points >= 0 ? progress?.points || 0 : '...'}<span className='emoji'>🐰</span></span></div>
                </div>
            </div>
            <div className="progressCard">
                <h6 className="card-title">Progresso da semana <span className='emoji'>📆</span></h6>
                <span className="card-text">Veja o seu progresso semanal e divirta-se!</span>
                <ul>
                    {days}
                </ul>
                <span className={'calendar'}>{progress?.dateNow ? calendar : undefined}</span>
            </div>
            <div className="progressCard">
                <img src={Menina} alt="Menina estudando" className='image' />
                <h6 className="card-title">Tire suas dúvidas com os professores ao vivo! <span className='emoji'>👨‍🏫</span></h6>
                <span className="card-text">Participe de uma aula on-line na Cobaye e receba orientação especializada de docentes certificados.</span>
                <Link to='/live' className='button-form'>Participar da aula ao vivo</Link>
            </div>
            <div className="progressCard">
                <h6 className="card-title">Convide amigos e ganhe um presente <span className='emoji'>🎁</span></h6>
                <span className="card-text">Convide os seus amigos para usar um mês de Cobaye e ganhe descontos nos seus cursos!</span>
                <Link to='/dashboard' className='button-form'>Convidar amigos</Link>
            </div>
        </Fragment>
    );
}

export default Progress;