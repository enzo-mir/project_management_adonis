import styled from 'styled-components'

export const DivModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 40;
`
export const ModalComponentWrapper = styled.dialog`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: clamp(350px, 40svw, 900px);
  gap: 1em;
  top: 50%;
  left: 50%;
  border: none !important;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  padding: 2rem;
  z-index: 50;
  color: white;
  background-color: hsl(241, 50%, 50%);

  & > button {
    position: absolute;
    background-color: hsla(241, 39%, 20%, 0.5);
    border: none;
    top: 5px;
    right: 5px;
    width: 30px;
    border-radius: 5px;
    color: white;
    aspect-ratio: 1 / 1;
  }
  & > button:focus-visible {
    background-color: hsla(241, 39%, 20%, 1);
  }
  & > button:hover {
    cursor: pointer;
  }
`
