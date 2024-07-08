import './Modal.scss'
import ReactDOM from 'react-dom';
import Button from '../Button/Button';


const Modal = ({ openModal, setOpenModal, url }) => {
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    if (!openModal) return null; 

    return ReactDOM.createPortal(
        <div className='modal'>
            <img src={url} alt={'fullscreen'}/>

            <div className='modal-button-container'>
                <Button clickFunction={handleCloseModal}>Close</Button>
            </div>
        </div>,
        document.getElementById('modal') || document.body
    );
}


export default Modal
