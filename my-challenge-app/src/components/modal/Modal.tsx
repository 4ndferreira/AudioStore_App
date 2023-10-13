import { useEffect, useRef, useState } from "react"
import classes from "./Modal.module.css"

const Modal = (props: {
  onClose: () => void; 
  isOpen: boolean; 
  children: React.ReactNode 
}) => {
  const [ isModalOpen, setIsModalOpen ] = useState(props.isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {setIsModalOpen(props.isOpen)}, [props.isOpen]);

  const handleCloseModal = () => {
    props.onClose && props.onClose();
    setIsModalOpen(false)
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    e.key === "Escape" && handleCloseModal();
  };

  useEffect(() => {
    setIsModalOpen(props.isOpen)
  }, [props.isOpen]);
  
  useEffect(() => {
    const modalElement = modalRef.current;
    modalElement && (isModalOpen ? modalElement.showModal() : modalElement.close());
  },[isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={classes.modal}>
      {props.children}
    </dialog>
  )
}

export default Modal