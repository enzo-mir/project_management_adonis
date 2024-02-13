import styled from 'styled-components'

export const FormModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;
  width: 100%;
  gap: 1em;
  & > label > select {
    padding: 1em;
  }
  & input,
  & select {
    background-color: hsla(241, 39%, 20%, 0.5);
    border: none;
    border-radius: 5px;
    padding: 1em;
    color: white;
    border-radius: 3px;

    &:focus:is(:invalid) {
      outline: 1px solid red;
    }

    &[type='date'] {
      padding-inline-end: 0.5em;

      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
      &::-webkit-calendar-picker-indicator:hover {
        cursor: pointer;
      }
    }
  }

  & option {
    background-color: hsla(241, 39%, 20%, 1);
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    place-items: center;
    width: 100%;
  }
  & label {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;

    &:nth-child(5) {
      grid-area: 3 / 1 / 4 / 3;
    }
  }

  & input[type='submit'] {
    padding: 0.75em 1.75em;
    grid-area: 4 / 1 / 5 / 3;
    align-self: start;
    transition: all 0.25s ease-out;

    &:hover {
      cursor: pointer;
      scale: 1.15;
    }
  }
`
