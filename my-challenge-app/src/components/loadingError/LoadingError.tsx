//Components
import Button from "../button/Button";
//Icons
import { XCircle } from "../icons/XCircle";
import { IconRefresh } from "../icons/IconRefresh";
//CSS
import classes from "./LoadingError.module.css"

export default function LoadingErrorPage() {
  return (
    <div className={classes.container}>
      <XCircle />
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
    </div>
  );
}