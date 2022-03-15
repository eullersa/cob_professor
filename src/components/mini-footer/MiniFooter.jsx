function MiniFooter({align = 'center', message = 'Ao entrar no Cobaye, você concorda com nossos termos de serviço.'}) {

    return (
        <div id='minifooter'>
            <div className="content">
                <div className="footerbrand" style={{justifyContent: align}}>
                    <div className="left">
                        <div className="privacy">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MiniFooter;