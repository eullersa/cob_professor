import './../widgettext/index.scss'

function WidgetText({name, description, selected}) {

    return (
        <div className={selected ? 'widgetText selected' : 'widgetText'}>
            <div className="widgetTextContent">
                <div>
                    <h6>{name}</h6>
                </div>
                <p className='normal'>{description}</p>                
            </div>            
        </div>
    );

}

export default WidgetText;