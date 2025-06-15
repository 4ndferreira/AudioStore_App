import styles from "./VideoBackground.module.scss"

export default function VideoBackground() {
  return (
    <>
      <div className={styles.backdrop} />
      <video className={styles.video} autoPlay loop muted preload="auto">
        <source src="/video/welcome.webm" type="video/webm" />
        <source src="/video/welcome.mp4" type="video/mp4" />
        <source src="/video/welcome.ogv" type="video/ogv" />
      </video>
    </>
  )
}
