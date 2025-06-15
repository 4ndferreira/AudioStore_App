import styles from "./ImageBackground.module.scss"

export default function ImageBackground() {
  return (
    <picture className={styles.picture}>
      <source type="image/webp" srcSet="/img/image10.webp" />
      <source type="image/png" srcSet="/img/image10.png" />
      <img src="/img/image10.png" alt="" />
    </picture>
  )
}
