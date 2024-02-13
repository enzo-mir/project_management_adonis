import styled from 'styled-components'

export const FormAddProject = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;
  gap: 1em;
  & input {
    padding: 0.5em 0.75em;
  }

  & > div {
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
  }
  & label {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    width: 100%;

    &:nth-child(5) {
      grid-area: 3 / 1 / 4 / 3;
    }
  }

  & input[type='submit'] {
    grid-area: 4 / 1 / 5 / 3;
  }
`
