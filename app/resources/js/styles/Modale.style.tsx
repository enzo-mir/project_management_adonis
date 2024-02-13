import styled from 'styled-components'

export const DivModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
`
export const ModalComponentWrapper = styled.dialog`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 1em;
  top: 50%;
  left: 50%;
  border: none !important;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  padding: 1rem;
  z-index: 50;

  & > button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    aspect-ratio: 1 / 1;
  }
`
