import { useRef } from 'react'
import { ModalComponentWrapper } from '../styles/Modale.style'

const ModalComponent = ({
  children,
  open,
  setOpen,
}: {
  open: boolean
  children: JSX.Element
  setOpen(val: boolean): void
}) => {
  const dialogref = useRef<HTMLDialogElement>(null)
  return (
    <ModalComponentWrapper open={open} ref={dialogref}>
      {children}
      <button onClick={() => setOpen(false)}> close</button>
    </ModalComponentWrapper>
  )
}

export default ModalComponent
