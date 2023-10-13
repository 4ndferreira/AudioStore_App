import Modal from "../modal/Modal"
import Button from "../button/Button";

const DeletionDialogBox = (props: { 
  onClose: () => void; 
  isOpen: boolean 
}) => {
  return (
    <Modal 
      onClose={props.onClose} 
      isOpen={props.isOpen}
    >
      <h3>Are you sure you want to delete this item?</h3>
      <Button 
        type={"button"} 
        onClick={() => {throw new Error("Function not implemented.");}} 
        name={"Yes"} 
      />
      <Button 
        type={"button"} 
        onClick={() => {throw new Error("Function not implemented.");}} 
        name={"No"} 
      />
    </Modal>
  );
};

export default DeletionDialogBox;
