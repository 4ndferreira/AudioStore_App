import classes from './Loader.module.css'

const Loader = () => {

  return (
    <div className={classes.loaderWrapper}>
      <p className={classes.loader}></p>
    </div>
  );
}

export default Loader