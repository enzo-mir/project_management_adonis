import styled from 'styled-components'
const MessageContainer = styled.dialog`
  position: absolute;
  display: grid;
  place-items: center;
  padding: 1.5em;
  border-radius: 1em;
  opacity: 0;
  top: 0.5em;
  left: 50%;
  transform: translate(-50%, -10%);
  background-color: #fff;
  font-size: 1em;
  z-index: 100;
  animation: animate forwards 0.5s ease-out;

  @keyframes animate {
    from {
      opacity: 0;
      transform: translate(-50%, -10%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0%);
    }
  }
`
const MessageComponent = ({ message, open }: { message: string; open: boolean }) => {
  return (
    <MessageContainer open={open}>
      <p>{message}</p>
    </MessageContainer>
  )
}

export default MessageComponent
