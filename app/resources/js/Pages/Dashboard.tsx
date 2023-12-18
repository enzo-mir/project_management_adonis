import { userdataType } from '../types/userdatatype'
import { useRef, useState } from 'react'
// @ts-ignore: Unreachable code error
import bgImage from '../images/backgroundImage.png'
import { ProjectMenus, Wrapper } from '../styles/DashboardStyle'
import TasksContainer from '../components/TasksContainer'
import { TasksType, projectsType } from 'App/types/adminDataTypes'
import HeaderDashboard from '../components/HeaderDashboard'

const Dashboard = ({
  errors,
  userData,
}: {
  errors: { messages: string }
  userData: userdataType
}) => {
  const projectNavRef = useRef<HTMLElement>(null)
  console.log(errors)

  const [currentProject, setCurrentProject] = useState<projectsType[0]>(
    userData.projects.sort(sortByPriority)[0]
  )
  const [currentTasks, setCurrentTasks] = useState<TasksType>(getTasks(currentProject))

  function sortByPriority(a: { priority: number }, b: { priority: number }) {
    return a.priority > b.priority ? -1 : 1
  }

  function handleToggleProjectMenus() {
    projectNavRef.current?.classList.toggle('display')
  }

  function projectToDisplay(e: EventTarget, projects: projectsType[0]) {
    document.querySelector('.activeProject')?.classList.remove('activeProject')
    ;(e as HTMLElement).classList.add('activeProject')

    setCurrentProject(projects)
    setCurrentTasks(getTasks(projects))
  }

  function getTasks(projects: projectsType[0]) {
    const filterTasks = userData.tasks.filter((task) => {
      return task.project_id === projects.id ? true : false
    })
    return filterTasks
  }

  return (
    <Wrapper>
      <img src={bgImage} alt="" />
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 14.2874H33"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 27.5749H33"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <ul>
          {userData.projects.sort(sortByPriority).map((projects, index) => {
            const status = projects.status === 0 ? 'todo' : projects.status === 1 ? 'doing' : 'done'
            return (
              <li
                key={projects.id}
                className={index === 0 ? 'activeProject' : ''}
                onClick={(e) => projectToDisplay(e.target, projects)}
              >
                <h2
                  onClick={(e) => {
                    e.stopPropagation()
                    projectToDisplay((e.target as HTMLElement).parentNode!, projects)
                  }}
                >
                  {projects.name}
                </h2>
                <p
                  onClick={(e) => {
                    e.stopPropagation()
                    projectToDisplay((e.target as HTMLElement).parentNode!, projects)
                  }}
                >
                  {projects.description}
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    projectToDisplay((e.target as HTMLElement).parentNode!, projects)
                  }}
                  className={`project${status[0].toUpperCase() + status.substring(1)}`}
                >
                  <p>{status}</p>
                </div>
              </li>
            )
          })}
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
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 20.4517H38.1667"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </ProjectMenus>
      {currentTasks && (
        <TasksContainer tasks={currentTasks}>
          {currentProject && (
            <HeaderDashboard
              projectTitle={currentProject.name}
              projectDescription={currentProject.description}
            />
          )}
        </TasksContainer>
      )}
    </Wrapper>
  )
}

export default Dashboard
