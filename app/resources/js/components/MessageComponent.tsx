import { motion } from 'framer-motion'
import styled from 'styled-components'
const MessageContainer = styled.dialog`
  position: absolute;
  display: grid;
  place-items: center;
  padding: 1.5em;
  border-radius: 5px;
  opacity: 0;
  top: 0.5em;
  left: 50%;
  border: none;
  background-color: #fff;
  font-size: 1em;
  z-index: 100;
  text-align: center;
`
const MessageComponent = ({ message, open }: { message: string; open: boolean }) => {
  return (
    <MessageContainer
      open={open}
      as={motion.dialog}
      initial={{ opacity: 0, y: '-10%', x: '-50%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-10%' }}
    >
      <p>{message}</p>
    </MessageContainer>
  )
}

export default MessageComponent
