import './Filter-buttons.css';

function FilterButtons ({status, setStatus}) {

    const buttons=[
        {status: 'all', text: 'All'},
        {status: false, text: 'Active'},
        {status: true, text: 'Completed'}
    ];

    const filtButtons = buttons.map(button => {
                return <button className={button.status!==status? 'checklist__filters-btn' :'checklist__filters-btn btn-active'} key={button.status} onClick={()=>setStatus(button.status)}>{button.text}</button>
            });  
    return <div className="checklist__filters">
        {filtButtons}   
        </div>
}

export default FilterButtons;
