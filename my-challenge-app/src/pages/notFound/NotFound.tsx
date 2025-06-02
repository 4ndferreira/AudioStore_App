// React Router
import { Link } from 'react-router-dom';
//Icon
import IconAlert from '../../components/icons/IconAlert';
//CSS
import classes from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={classes.notFoundMessage}>
      <IconAlert width={"96"} height={"96"} />
      <h1 className={classes.notFoundText}>404 - Page Not Found</h1>
      <Link to={"/"} state={{ isPush: true }} className={classes.notFoundLink}>
        Get me out of here!
      </Link>
    </div>
  );
}