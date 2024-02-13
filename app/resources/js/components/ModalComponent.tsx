import { useRef } from 'react'
import { ModalComponentWrapper } from '../styles/Modale.style'

const ModalComponent = ({
  children,
  open,
  setOpen,
  title,
}: {
  open: string
  children: JSX.Element
  setOpen(val: string): void
  title: string
}) => {
  const dialogref = useRef<HTMLDialogElement>(null)
  return (
    <ModalComponentWrapper
      open={open !== '' ? true : false}
      ref={dialogref}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={() => setOpen('')}>X</button>
      <h1>{title}</h1>
      {children}
    </ModalComponentWrapper>
  )
}

export default ModalComponent
