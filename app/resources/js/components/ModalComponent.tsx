import { useRef } from 'react'
import { ModalComponentWrapper } from '../styles/Modale.style'

const ModalComponent = ({
  children,
  open,
  setOpen,
  title,
}: {
  open: boolean
  children: JSX.Element
  setOpen(val: boolean): void
  title: string
}) => {
  const dialogref = useRef<HTMLDialogElement>(null)
  return (
    <ModalComponentWrapper open={open} ref={dialogref} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(false)}>X</button>
      <h1>{title}</h1>
      {children}
    </ModalComponentWrapper>
  )
}

export default ModalComponent
