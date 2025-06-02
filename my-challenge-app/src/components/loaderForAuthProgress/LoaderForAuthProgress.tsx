import classes from './LoaderForAuthProgress.module.css'

export default function LoaderForAuthProgress() {
  return (
    <div className={classes.wrapper}>
      <span className={classes.loader}></span>
    </div>
  );
}