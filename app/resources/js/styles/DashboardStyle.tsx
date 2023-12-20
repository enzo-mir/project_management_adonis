import styled from 'styled-components'

const Wrapper = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: brightness(50%);
    object-fit: cover;
  }
`
const ProjectMenus = styled.nav`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 5%;
  background-color: rgba(83, 74, 255, 0.2);
  height: 100%;
  overflow: hidden;
  padding: 2em;
  box-shadow: 5px 0 50px rgba(0, 0, 0, 0.5);

  & button {
    width: 34px;
    height: 29px;
    background-color: transparent;
    border: none;

    &:last-child {
      width: 40px;
      height: 41px;
    }
    &:hover {
      cursor: pointer;
    }
  }

  & ul {
    display: flex;
    flex-direction: column;
    gap: 2em;
    width: 0px;
    color: white;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 0.5s ease-out;

    & > li {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-block-start: 0.5em;
      gap: 0.5em;
      border-radius: 5px;
      transition: all 0.25s ease-out;
      & > button {
        display: grid;
        position: absolute;
        place-items: center;
        right: 0;
        top: 0;
        color: hsl(242, 50%, 20%);
        background-color: rgba(255, 255, 255, 1);
        font-weight: bolder;
        border-bottom-left-radius: 0.5em;
      }
      & > h2 {
        font-weight: 400;
      }

      & > *:not(div, button) {
        padding-inline-start: 10px;
        width: 100%;
      }
      & > div {
        padding: 0.5em 10px;
        font-size: 0.75em;

        &.projectTodo {
          background-color: hsl(242, 50%, 20%);
        }
        &.projectDoing {
          background-color: #3389ef;
        }
        &.projectDone {
          background-color: #6eda5c;
        }
      }

      &.activeProject {
        &:has(div.projectTodo) {
          background-color: rgba(27, 25, 77, 0.7);
        }
        &:has(div.projectDoing) {
          background-color: rgba(51, 136, 239, 0.7);
        }
        &:has(div.projectDone) {
          background-color: rgba(111, 218, 92, 0.7);
        }
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(125, 119, 244, 0.5);
      }

      &.adding {
        padding-block: 1em;
        & > form {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
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
          & > label {
            display: flex;
            gap: 0.5em;
          }
        }
        &:hover {
          cursor: initial;
        }
      }
    }
  }

  &.display {
    width: 100%;

    & ul {
      width: clamp(250px, 20vw, 350px);
    }
  }
`

export { Wrapper, ProjectMenus }
