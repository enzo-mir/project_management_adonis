import { userdataType } from '../types/userdatatype'
import React, { FormEvent, useRef, useState } from 'react'
// @ts-ignore: Unreachable code error
import bgImage from '../images/backgroundImage.png'
import { DeleteBtn, ProjectMenus, Wrapper } from '../styles/DashboardStyle'
import TasksContainer from '../components/TasksContainer'
import { TasksType, projectsType } from 'App/types/adminDataTypes'
import HeaderDashboard from '../components/HeaderDashboard'
// @ts-ignore: Unreachable code error
import burgerIcon from '../images/burger.svg'
// @ts-ignore: Unreachable code error
import createProjectIcon from '../images/createProjectIcon.svg'
import { useForm } from '@inertiajs/inertia-react'
import { projectStore } from '../store/project.store'
const Dashboard = ({
  errors,
  userData,
}: {
  errors: { messages: string }
  userData: userdataType
}) => {
  const projectNavRef = useRef<HTMLElement>(null)
  console.log(errors)

  const { data, setData, processing, post } = useForm({
    nameValue: '',
    descValue: '',
    startDateValue: null,
    endDateValue: null,
    priorityValue: 0,
  })

  const [currentProject, setCurrentProject] = useState<projectsType[0]>(
    userData.projects.sort(sortByPriority)[0]
  )
  const [allProjects, setAllProjects] = projectStore((state) => [
    state.allProjects,
    state.setAllProjects,
  ])

  const [currentTasks, setCurrentTasks] = useState<TasksType | null>(
    currentProject ? getTasks(currentProject) : null
  )
  const [addingProject, setAddingProject] = useState<boolean>(false)

  function sortByPriority(a: { priority: number }, b: { priority: number }) {
    return a.priority > b.priority ? -1 : 1
  }

  function handleToggleProjectMenus() {
    projectNavRef.current?.classList.toggle('display')
  }

  function projectToDisplay(e: EventTarget | null, projects: projectsType[0] | null) {
    if (e && projects) {
      document.querySelector('.activeProject')?.classList.remove('activeProject')
      ;(e as HTMLElement).classList.add('activeProject')

      setCurrentProject(projects)

      projects && setCurrentTasks(getTasks(projects)!)
    } else {
      setCurrentProject(userData.projects.sort(sortByPriority)[0])
      setCurrentTasks([])
    }
  }

  function getTasks(projects: projectsType[0] | null) {
    return !!projects
      ? userData.tasks.filter((task) => {
          return task.project_id === projects.id ? true : false
        })
      : null
  }

  function addProject(e: FormEvent) {
    e.preventDefault()
    post('/project/add', { data })
    setAddingProject(false)
  }

  async function deleteProject(project: projectsType[0], e: React.MouseEvent) {
    e.stopPropagation()
    const r = fetch('/project/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project }),
    })

    if ((await r.then()).ok) {
      const filterdArray = (allProjects.length > 0 ? allProjects : userData.projects).filter((p) =>
        p.id === project.id ? false : true
      )
      setAllProjects(filterdArray)

      projectToDisplay(
        document.getElementById('projectContainer')?.firstChild!,
        filterdArray.sort(sortByPriority)[0]
      )
    }
  }

  function handleChangeValues(e: React.ChangeEvent) {
    ;(e.target as HTMLInputElement).name === 'priorityValue'
      ? setData({
          ...data,
          [(e.target as HTMLInputElement).name]: parseInt((e.target as HTMLInputElement).value),
        })
      : setData({
          ...data,
          [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        })
  }

  return (
    <Wrapper>
      <img src={bgImage} alt="" />
      <ProjectMenus ref={projectNavRef} className="display">
        <button onClick={handleToggleProjectMenus}>
          <img src={burgerIcon} alt="" />
        </button>
        <ul id="projectContainer">
          {addingProject && (
            <li className="adding" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={addProject}>
                <label htmlFor="nameValue">
                  Name :
                  <input
                    type="text"
                    name="nameValue"
                    id="nameValue"
                    onChange={handleChangeValues}
                    required
                  />
                </label>
                <label htmlFor="descValue">
                  Description :
                  <input
                    type="text"
                    name="descValue"
                    id="descValue"
                    onChange={handleChangeValues}
                    required
                  />
                </label>
                <label htmlFor="startDateValue">
                  Start date :
                  <input
                    type="date"
                    name="startDateValue"
                    id="startDateValue"
                    onChange={handleChangeValues}
                    required
                  />
                </label>
                <label htmlFor="endDateValue">
                  End date :
                  <input
                    type="date"
                    name="endDateValue"
                    id="endDateValue"
                    onChange={handleChangeValues}
                    required
                  />
                </label>
                <label htmlFor="priorityValue">
                  priority :{' '}
                  <select
                    name="priorityValue"
                    id="priorityValue"
                    onChange={handleChangeValues}
                    required
                  >
                    <option value={0}>Low</option>
                    <option value={1}>Mid</option>
                    <option value={2}>Hight</option>
                  </select>
                </label>
                <input type="submit" value="Add project" disabled={processing} />
              </form>
            </li>
          )}
          {allProjects?.length || userData.projects
            ? (allProjects?.length ? allProjects : userData.projects)
                .sort(sortByPriority)
                .map((projects, index) => {
                  const status =
                    projects.status === 0 ? 'todo' : projects.status === 1 ? 'doing' : 'done'
                  const priority =
                    projects.priority === 0 ? 'low' : projects.priority === 1 ? 'mid' : 'high'
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
                      <DeleteBtn onClick={(e) => deleteProject(projects, e)}>x</DeleteBtn>
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
                        <p
                          onClick={(e) => {
                            e.stopPropagation()
                            projectToDisplay(
                              (e.target as HTMLElement).parentNode?.parentNode!,
                              projects
                            )
                          }}
                        >
                          {status}
                        </p>
                        <p
                          onClick={(e) => {
                            e.stopPropagation()
                            projectToDisplay(
                              (e.target as HTMLElement).parentNode?.parentNode!,
                              projects
                            )
                          }}
                        >
                          priority : {priority}
                        </p>
                      </div>
                    </li>
                  )
                })
            : null}
        </ul>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setAddingProject(true)
            window.addEventListener('click', () => setAddingProject(false))
          }}
        >
          <img src={createProjectIcon} alt="" />
        </button>
      </ProjectMenus>
      {currentTasks && (
        <TasksContainer tasks={currentTasks} currentProject={currentProject}>
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
