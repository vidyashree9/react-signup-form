import React,  {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./Modal.scss";
import { IModal } from '../../interfaces/ModalInterface';

const Modal = (props: IModal):JSX.Element => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
  setOpen(open => props.open)
    }, [props.open]);

  return (
    <div>
      <Popup open={open} className="popup" closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          {props.message === "success" && (
            <p className="success">Congratulations! You are registered Successfully.</p>
          )}
          {props.message === "error" && (
            <p className="error">Oops! Something wasn't right. Please try again</p>
          )}
          <div className='modal-btn'>
            <button type="button" className="button-primary" onClick={closeModal}>OK</button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Modal;