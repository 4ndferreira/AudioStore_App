import { ReactNode, useState } from "react";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import styles from "./ShowLoginForm.module.scss"

interface ShowLoginFormProps {
  isDesktop: boolean;
  children: ReactNode
}

export default function ShowLoginForm({ isDesktop, children }: ShowLoginFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen)
  };

  return (isDesktop ? (
      <>
        <Button
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          type={"submit"}
          onClick={handleModal}
          children={"Login"}
          className={styles.button}
        />
        {isOpen &&
          <Modal
            onClose={handleModal}
            isOpen={isOpen}
          >
            {children}
          </Modal>}
      </>
    ) : (
      <>{children}</>
    )
  )
}