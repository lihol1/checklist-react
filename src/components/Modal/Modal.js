import './Modal.css';

function Modal ({modal, tmpId, delItem, removeModal}){
    return <div className={modal ? "checklist__modal" : "hidden"}>
    <div className="checklist__modal-window">
      <p className="checklist__modal-text">Are you sure you want to delete the note?</p>
      <button onClick={()=>delItem(tmpId)} className="checklist__modalbtn">Yes</button>
      <button onClick={()=>removeModal()} className="checklist__modalbtn">Cancel</button>           
    </div>           
  </div>
}
export default Modal;