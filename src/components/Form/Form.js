import './Form.css';
import {useState} from 'react';

function Form ({addItem}){
    const [value, setValue]=useState('');

    function finishEdit(e){
        e.preventDefault();
        addItem(value);
        setValue('');
    }
    return (
        <form className="checklist__form" onSubmit={e=>{finishEdit(e)}}>
           <input className='checklist__input' value={value} 
           onChange={e=>{setValue(e.target.value)}} placeholder="Введите текст"  
           />                                    
        </form>         
    )
}
export default Form;