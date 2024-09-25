import './App.css';
import React, {useState, useEffect} from 'react'; 
import Counter from '../Counter/Counter'
import FilterButtons from '../Filter-buttons/Filter-buttons';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
 
function App(){
  const [notes, setNotes]= useState(getInitNotes()); 
  const [editId, setEditId] = useState(null);
  const [value, setValue] = useState('');
  const [allItems, setAllItems]= useState(notes.length);
  const [allComleted, setAllCompleted]= useState(0);
  const [allActive, setAllActive]= useState(0);
  const [status, setStatus] = useState('all');
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [tmpId, setTmpId] = useState(null);
  
  function getInitNotes(){
    const savedNotes= localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
    }
  
  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  



  const result = filter(notes, status).map(note=>{
    return (      
      <li className="checklist__item" key={note.id}>
        <label className="checklist__checkbox">
          <input type="checkbox" checked={note.done ? true : false} className="checklist__checkbox-inp" onChange={() => crossOut(note.id)} />
          {/* <img src="./checkmarkblue.svg" alt="checkmark" className="checklist__checkbox-checkmark"></img> */}
          <span className="checklist__checkbox-circle"></span>        
        </label>
        {
        editId===note.id  
          ?
          <input className="checklist__item-input" value={value} onChange={e=>{setValue(e.target.value)}} onBlur={finishEdit}/>
          :
          <span className={note.done ? "checklist__item-text lthr" : "checklist__item-text"} onClick={()=>edit(note.id, note.text)}>{note.text}</span>
        }
        <img src="./garbage-bin.svg" alt="garbage-bin" className="checklist__item-bin" onClick={()=>clickHandler(note.id)}/>
         
               
      </li>
    )}      
  )
  function clickHandler(id){      
    setModalId(id);
    setModal(true);
    setTmpId(id);
  } 
 
  function removeModal (){
    setModal(false);
    setModalId(null);
  }

  function crossOut(id){
    setNotes(notes.map(note=>note.id===id ? {...note, done: !note.done} : note)) 
  }

  function edit (id, text){
    setEditId(id);
    setValue(text);
  }

  function finishEdit (){
    setEditId(null);
    return setNotes(notes.map(note=>note.id=== editId ? {...note, text: value} : note))
  }

  function addItem (value){
    if(value) {
       setNotes([...notes, {id: Date.now(), text: value, done: false}]); 
       setAllItems(allItems + 1);      
    } else {
      alert('Введите текст');
    }  
  }

  function delItem(id){     
    if (modalId===id) {
      setNotes(notes.filter(note=>note.id!==id));
      setAllItems(allItems - 1);
      setModalId(null); 
      setModal(false);
    }  
  } 

  function filter (notes, status){
    return status ==='all'? notes : notes.filter(note=>note.done===status)
    }

  function clearNotes(){
    setNotes([]);
    setAllItems(0);
  }

  return <div className="checklist">
    <div className="container">
      <h1 className="checklist__title">Checklist</h1>
      <Form addItem={addItem} />
      <div className="checklist__funcpanel">
        <FilterButtons status={status} setStatus={setStatus} />
        <Counter notes={notes}  allItems={allItems} allComleted={allComleted} setAllCompleted={setAllCompleted} allActive={allActive} setAllActive={setAllActive} />        
      </div>
      <ul className="checklist__list">
        {result}
      </ul>
      <button className="checklist__clear-btn" onClick={()=>clearNotes()}>Clear all</button> 
          <Modal modal={modal} tmpId={tmpId} delItem={delItem} removeModal={removeModal}/>    
    </div>
  </div>
}

export default App;
