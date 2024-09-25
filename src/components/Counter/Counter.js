import './Counter.css';
import {useEffect} from 'react';

function Counter({notes, allItems, allComleted, setAllCompleted, allActive, setAllActive}){

    useEffect(()=>{
        setAllActive(notes.filter(note=>note.done!==true).length);
        setAllCompleted(notes.filter(note=>note.done===true).length)
      }, [notes])

    return <div className="checklist__counter">
          <span>All tasks: {allItems}</span>
          <span>Active: {allActive}</span>
          <span>Completed: {allComleted}</span>
      </div>
}
export default Counter;