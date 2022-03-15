import { useState } from "react";
import '../datas/datas.scss'

function Datas({setCoursesDrop}) {

    return (
        <div id='datas'>
            <p>Você ainda não possui nenhum site</p>
            <button className='button'>Criar site</button>
        </div>
    );
}

export default Datas;