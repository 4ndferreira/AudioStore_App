import Modal from "../modal/Modal";
import { XCircle } from "./XCircle";

export default function LoadingError(props: { error: string | null }) {
  return (
    <Modal 
      onClose={() => undefined} 
      isOpen={props.error ? true : false}
    >
      <div 
        style={{display: "flex", 
        justifyContent: "center"
      }}>
        <XCircle />
      </div>
      <h3>Loading Error</h3>
      <p>Unable to fetch data. Try again later...</p>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </Modal>
  );
}