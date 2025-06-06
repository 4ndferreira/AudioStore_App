import Modal from "../modal/Modal"
//React
import { useContext } from "react";
//Context
import { CartContext } from "../../store/CartContext";
//Components
import Button from "../button/Button";
import { CheckIcon } from "../icons/CheckIcon";
import IconClose from "../icons/IconClose";
//CSS
import classes from "./DeletionDialogBox.module.css"

const DeletionDialogBox = (props: {
  itemId: number | null; 
  isOpen: boolean 
  onClose: () => void;
}) => {
  const { removeFromCart } = useContext(CartContext)
  return (
    <Modal 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    >
      <h3>Are you sure you want to delete this item?</h3>
      <p className={classes.options}>
        <Button 
          type={"button"} 
          onClick={() => {
            if (props.itemId !== null) {
              removeFromCart(props.itemId);
            }
            props.onClose();
          }}
        >
          <CheckIcon />
          Yes
        </Button>
        <Button 
          type={"button"} 
          onClick={() => {props.onClose()}} 
        >
          <IconClose color={"white"} />
          No
        </Button>
      </p>
    </Modal>
  );
};

export default DeletionDialogBox;
