import styled from 'styled-components'
import { userdataType } from '../types/userdatatype'
import { useRef } from 'react'

const Wrapper = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;
`
const ProjectMenus = styled.nav`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 5%;
  background-color: #534aff;
  height: 100%;
  overflow: hidden;
  padding: 2em;

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
      display: flex;
      flex-direction: column;
      padding-block-start: 0.5em;
      gap: 0.5em;
      border-radius: 5px;
      & > h2 {
        font-weight: 400;
      }

      & > *:not(div) {
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

      &.active {
        background-color: #7e77f4;
      }

      &:hover {
        cursor: pointer;
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

const Dashboard = ({
  errors,
  userData,
}: {
  errors: { messages: string }
  userData: userdataType
}) => {
  const projectNavRef = useRef<HTMLElement>(null)

  console.log(errors)

  function sortByPriority(a, b) {
    return a.priority > b.priority ? -1 : 1
  }

  function handleToggleProjectMenus() {
    projectNavRef.current?.classList.toggle('display')
  }

  return (
    <Wrapper>
      <ProjectMenus ref={projectNavRef} className="display">
        <button onClick={handleToggleProjectMenus}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="29"
            viewBox="0 0 34 29"
            fill="none"
          >
            <path
              d="M1 1H33"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 14.2874H33"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 27.5749H33"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <ul>
          {userData.projects
            .sort(sortByPriority)
            .map((projects, id) => {
              const status =
                projects.status === 0 ? 'todo' : projects.status === 1 ? 'doing' : 'done'
              return (
                <li key={projects.id} className={id === 0 ? ' active' : ''}>
                  <h2>{projects.name}</h2>
                  <p>{projects.description}</p>
                  <div className={`project${status[0].toUpperCase() + status.substring(1)}`}>
                    <p>{status}</p>
                  </div>
                </li>
              )
            })
            .sort(sortByPriority)}
        </ul>
        <button onClick={handleToggleProjectMenus}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
          >
            <path
              d="M20.1617 2.36835L20.1143 38.535"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 20.4517H38.1667"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </ProjectMenus>
    </Wrapper>
  )
}

export default Dashboard
