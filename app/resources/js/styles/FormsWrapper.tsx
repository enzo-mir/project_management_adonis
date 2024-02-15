import styled from 'styled-components'
const WrapperForms = styled.article`
  display: grid;
  place-items: center;
  gap: 2em;
  width: 100%;
  padding: 2em 1em;
  border-radius: 3px;
  background: hsl(242, 50%, 50%);
  & .error_text {
    color: #ff4e4e;
  }
  & > h2 {
    text-align: left;
    width: clamp(300px, 75%, 500px);
  }
  & > form {
    display: flex;
    flex-direction: column;
    width: clamp(300px, 75%, 500px);
    gap: 2.5em;

    & > label {
      display: flex;
      flex-direction: column;
      gap: 1em;
      & input {
        background-color: hsla(241, 39%, 20%, 0.5);
        border: none;
        padding: 1em 2em;
        color: white;
        border-radius: 3px;
      }
      & > p:last-child {
        color: #f96a6a;
      }
    }

    & > .cta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 1);
      width: 75%;
      min-width: 300px;
      align-self: center;
      padding: 1em;
      & > button {
        background: hsl(242, 50%, 50%);
        border: 1px solid hsl(242, 50%, 50%);
        color: white;
        border-radius: 3px;
        padding: 0.25em 1em;
        font-size: 1em;
      }

      & > a {
        font-weight: 600;
      }
    }
  }
`
const ForgotPasswordButton = styled.button`
  width: max-content;
  padding: 0.5em;
  border: none;
  border-radius: 5px;
  color: hsl(242, 50%, 50%);
  background-color: white;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
`

export { WrapperForms, ForgotPasswordButton }
