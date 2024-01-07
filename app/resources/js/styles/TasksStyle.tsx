import styled from 'styled-components'

const WrapperTasks = styled.section`
  position: relative;
  padding: 2em 10%;
  max-height: 100svh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2em;
  place-items: center;
  color: white;
  overflow: auto;

  & > div.rangeProgressContainer {
    width: 75%;
    max-width: 750px;
    & > label {
      display: flex;
      gap: 1em;
      align-items: center;
      justify-content: center;
      width: 100%;

      & > input[type='range'] {
        width: 100%;
      }
    }

    @media screen and (max-width: 650px) {
      width: 100%;

      & > label {
        flex-direction: column;
        width: 100%;
      }
    }
  }
  & > ol#tasksCont {
    display: flex;
    justify-content: center;
    gap: 2em;
    flex-wrap: wrap;
    justify-self: start;
    align-self: start;
    width: 100%;
    & > li {
      position: relative;
      display: grid;
      grid-template-rows: auto auto 75px;
      padding-block: 1em;
      gap: 1em;
      text-align: center;
      width: clamp(250px, 25%, 350px);
      border-radius: 10px;
      overflow: hidden;

      &.todo {
        background-color: rgba(27, 25, 77, 0.75);
        & > .statusOverlay {
          background-color: hsl(242, 50%, 20%);
        }
      }
      &.doing {
        background-color: rgba(51, 136, 239, 0.75);
        & > .statusOverlay {
          background-color: #3389ef;
        }
      }
      &.done {
        background-color: rgba(111, 218, 92, 0.75);
        & > .statusOverlay {
          background-color: #6eda5c;
        }
      }

      & > p {
        font-size: 1.25em;
        padding-inline: 1em;
      }

      & > h2 {
        padding-inline: 1em;
      }
      & > .inputStatus {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        & > label {
          display: flex;
          font-size: 0.9em;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.25em;
          margin-top: 1em;

          & input:hover {
            cursor: pointer;
          }
        }
      }

      &:hover {
        & > .statusOverlay {
          transform: translateY(100%);
        }
      }

      & > .statusOverlay {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease-out;
        bottom: 0;
        width: 100%;
        transform: translateY(0%);
        height: 75px;
        border-radius: 0 0 8px 8px;
      }
    }

    & > button {
      background-color: transparent;
      align-self: end;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 650px) {
  }
`
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5em;
  border-radius: 5px;
  gap: 1em;
  & input {
    background: hsl(242, 50%, 40%);
    color: white;
    border: 1px solid black;
    padding: 0.5em;
    border-radius: 3px;

    &[type='submit'] {
      width: fit-content;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }
`
export { Wrapper, WrapperTasks }
