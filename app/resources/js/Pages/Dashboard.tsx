import { userdataType } from '../types/userdatatype'
import React, { useEffect, useRef, useState } from 'react'
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
import { projectStore } from '../store/project.store'
import { taskStore } from '../store/task.store'
import ModalComponent from '../components/ModalComponent'
import { DivModal } from '../styles/Modale.style'
import AddProjectModal from '../components/AddProjectModal'
import AddTaskModal from '../components/Add_task_modal'
import ProfileModal from '../components/Profile_modal'
import { erroreMessageStore } from '../store/error_message.store'
import MessageComponent from '../components/MessageComponent'
import { AnimatePresence } from 'framer-motion'
const Dashboard = ({
  errors,
  projects,
  tasks,
  userData,
}: {
  errors: string
  userData: userdataType
  projects: projectsType
  tasks: TasksType
}) => {
  const projectNavRef = useRef<HTMLElement>(null)
  const [allProjects, setAllProjects] = projectStore((state) => [
    state.allProjects,
    state.setAllProjects,
  ])

  const setAllTasks = taskStore((state) => state.setAllTasks)
  const [error, setError] = erroreMessageStore((state) => [
    state.errorMessage,
    state.setErrorMessage,
  ])
  const [currentProject, setCurrentProject] = useState<projectsType[0]>(
    projects.sort(sortByPriority)[0]
  )
  useEffect(() => {
    setAllTasks(tasks)
    setAllProjects(projects)
    setCurrentProject(projects.sort(sortByPriority)[0])
  }, [tasks, projects])
  useEffect(() => {
    setError(errors)
    setTimeout(() => {
      setError('')
    }, 3000)
  }, [errors])

  const [modal, setModal] = useState<string>('')

  function sortByPriority(a: { priority: number }, b: { priority: number }) {
    return a.priority > b.priority ? -1 : 1
  }

  function handleToggleProjectMenus() {
    projectNavRef.current?.classList.toggle('display')
  }

  function projectToDisplay(e: EventTarget | null, project: projectsType[0] | null) {
    if (e && project !== null) {
      document.querySelector('.activeProject')?.classList.remove('activeProject')
      ;(e as HTMLElement).classList.add('activeProject')

      setCurrentProject(project)
    } else {
      setCurrentProject(projects.sort(sortByPriority)[0])
    }
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
      const filterdArray = (allProjects.length > 0 ? allProjects : projects).filter((p) =>
        p.id === project.id ? false : true
      )
      setAllProjects(filterdArray)

      projectToDisplay(
        document.getElementById('projectContainer')?.firstChild!,
        filterdArray.sort(sortByPriority)[0]
      )
    }
  }

  return (
    <Wrapper>
      <AnimatePresence>
        {error ? <MessageComponent message={error} open={error ? true : false} /> : null}
      </AnimatePresence>
      {modal ? (
        <DivModal onClick={() => setModal('')}>
          <ModalComponent
            open={modal}
            setOpen={setModal}
            title={
              modal === 'addProject'
                ? 'Add project'
                : modal === 'addTask'
                  ? 'Add task'
                  : 'Profile settings'
            }
          >
            {modal === 'addProject' ? (
              <AddProjectModal setOpen={setModal} />
            ) : modal === 'addTask' ? (
              <AddTaskModal setOpen={setModal} projectId={currentProject.id} />
            ) : (
              <ProfileModal userData={userData} setOpen={setModal} />
            )}
          </ModalComponent>
        </DivModal>
      ) : null}

      <img src={bgImage} alt="" />
      <ProjectMenus ref={projectNavRef} className="display">
        <button onClick={handleToggleProjectMenus}>
          <img src={burgerIcon} alt="" />
        </button>
        <ul id="projectContainer">
          {allProjects?.length || projects
            ? allProjects.sort(sortByPriority).map((projects, index) => {
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
                        {'priority : ' + priority}
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
            setModal('addProject')
          }}
        >
          <img src={createProjectIcon} alt="" />
        </button>
      </ProjectMenus>
      <TasksContainer currentProject={currentProject} setAdding={setModal}>
        <HeaderDashboard currentProject={currentProject} setOpen={setModal} />
      </TasksContainer>
    </Wrapper>
  )
}

export default Dashboard
