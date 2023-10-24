//Components
import Modal from "../modal/Modal";
import Button from "../button/Button";
//Icons
import { XCircle } from "../icons/XCircle";
import { IconRefresh } from "../icons/IconRefresh";
//CSS
import classes from "./LoadingError.module.css"

export default function LoadingError(props: { error: string | null }) {
  return (
    <Modal 
      onClose={() => undefined} 
      isOpen={props.error ? true : false}
    >
      <div className={classes.icon}>
        <XCircle />
      </div>
      <h3>Loading Error</h3>
      <div className={classes.errorText}>
        <p>Unable to fetch data.</p>
        <p>Try again later...</p>
      </div>
      <div className={classes.customButton}>
        <Button type={"button"} onClick={() => window.location.reload()}>
          <IconRefresh />
          <span>Reload</span>
        </Button>
      </div>
    </Modal>
  );
}