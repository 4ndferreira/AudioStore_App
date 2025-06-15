import classes  from "./Title.module.scss"

export default function Title() {
  return (
    <div className={classes.wrapperText}>
      <h1 className={classes.title}>Audio</h1>
      <h2 className={classes.subtitle}>It's modular and designed to last</h2>
    </div>
  )
}