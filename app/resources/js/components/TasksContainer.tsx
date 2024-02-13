import { TasksType, projectsType } from 'App/types/adminDataTypes'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { projectStore } from '../store/project.store'
// @ts-ignore: Unreachable code error

import createTaskIcon from '../images/createProjectIcon.svg'
import { DeleteBtn } from '../styles/DashboardStyle'
import { WrapperTasks } from '../styles/TasksStyle'
import { taskStore } from '../store/task.store'

const TasksContainer = ({
  children,
  currentProject,
  setAdding,
}: {
  children: ReactNode
  currentProject: projectsType[0]
  setAdding(val: string): void
}) => {
  const [allTasks, setAllTasks] = taskStore((state) => [state.allTasks, state.setAllTasks])
  const tasks = allTasks.filter((task) => task.project_id === currentProject.id)

  const [progression, setProgression] = useState<number>(0 || getProgression(tasks))
  const [allProjects, setAllProjects] = projectStore((state) => [
    state.allProjects,
    state.setAllProjects,
  ])
  useEffect(() => {
    setAllProjects(
      actionChangeStatus(
        currentProject,
        progression > 0 && progression < 100 ? 1 : progression === 100 ? 2 : 0,
        allProjects
      ) as projectsType
    )
  }, [progression])

  useEffect(() => {
    setProgression(getProgression(tasks))
  }, [allTasks, currentProject])

  function sortByPriority(a: { priority: number }, b: { priority: number }) {
    return a.priority > b.priority ? -1 : 1
  }

  function getProgression(tasks: TasksType) {
    let percentage = 0
    const tasksLength = tasks.length
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      switch (task.status) {
        case 1:
          percentage += 0.5
          break
        case 2:
          percentage += 1
          break

        case 0:
          percentage += 0
          break

        default:
          break
      }
    }
    percentage = (percentage / tasksLength) * 100

    return percentage | 0
  }

  function actionChangeStatus(
    current: TasksType[0] | projectsType[0],
    status: 0 | 1 | 2,
    geter: TasksType | projectsType
  ) {
    if (current) {
      let newStatusObject = Object.assign(current, {
        status,
      })
      const dynamicStatus = geter
      geter.map((element: TasksType[0] | projectsType[0], index: number) => {
        element === current ? (dynamicStatus[index] = newStatusObject) : null
      })
      return dynamicStatus
    }
  }

  async function deleteTask(task_id: number) {
    const deleteResponse = fetch('/task/delete', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: task_id }),
    })

    if ((await deleteResponse).ok) {
      deleteResponse
        .then((response) => response.json())
        .then((data: { tasks: TasksType }) => {
          setAllTasks(data.tasks)
          const currentTasks = data.tasks.filter((task) => task.project_id === currentProject.id)

          const progress = getProgression(currentTasks)
          setProgression(progress)

          fetch('/project/status', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectId: currentProject.id,
              status: currentTasks.length
                ? progress > 0 && progress < 100
                  ? 1
                  : progress === 100
                    ? 2
                    : 0
                : 0,
            }),
          })
            .then((response) => response.json())
            .then((data) => setAllProjects(data.projects))
        })
    }
  }

  async function handleChangeStatus(e: FormEvent<HTMLInputElement>, currentTask: TasksType[0]) {
    let statusValue = parseInt((e.target as HTMLElement).dataset.value!) as 0 | 1 | 2

    const changeStatusTasks = fetch('/task/status', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId: currentTask.id, status: statusValue }),
    })
    if ((await changeStatusTasks).ok) {
      changeStatusTasks.then((response) => response.json()).then((data) => setAllTasks(data.tasks))

      const progress = getProgression(
        actionChangeStatus(currentTask, statusValue, tasks) as TasksType
      )

      setProgression(progress)

      fetch('/project/status', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: currentProject.id,
          status: progress > 0 && progress < 100 ? 1 : progress === 100 ? 2 : 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => setAllProjects(data.projects))
    }
  }

  return (
    <WrapperTasks>
      {children}
      {currentProject && (
        <div className="rangeProgressContainer">
          <label htmlFor="progressBar">
            Progression
            <input
              type="range"
              name="progressBar"
              id="progressBar"
              value={progression.toPrecision(2)}
              min={0}
              max={100}
              title={progression.toString()}
              disabled
            />
          </label>
        </div>
      )}
      <ol id="tasksCont">
        {tasks.length
          ? tasks.sort(sortByPriority)?.map((task, index) => {
              const status = task.status === 0 ? 'todo' : task.status === 1 ? 'doing' : 'done'
              const priority = task.priority === 0 ? 'low' : task.priority === 1 ? 'mid' : 'high'
              return (
                <li key={task.id} className={status}>
                  <DeleteBtn onClick={() => deleteTask(task.id)}>x</DeleteBtn>
                  <h2>{task.name}</h2>
                  <p>{task.description}</p>
                  <div className="inputStatus">
                    <label htmlFor={`task${task.project_id + index}`}>
                      Todo
                      <input
                        type="radio"
                        name={`task${task.project_id + index}`}
                        id={`task${task.project_id + index}`}
                        data-value={0}
                        onChange={(e) => handleChangeStatus(e, task)}
                        defaultChecked={task.status === 0 ? true : false}
                      />
                    </label>
                    <label htmlFor={`task${task.project_id + index}`}>
                      Doing
                      <input
                        type="radio"
                        name={`task${task.project_id + index}`}
                        id={`task${task.project_id + index}`}
                        data-value={1}
                        onChange={(e) => handleChangeStatus(e, task)}
                        defaultChecked={task.status === 1 ? true : false}
                      />
                    </label>
                    <label htmlFor={`task${task.project_id + index}`}>
                      Done
                      <input
                        type="radio"
                        name={`task${task.project_id + index}`}
                        id={`task${task.project_id + index}`}
                        data-value={2}
                        onChange={(e) => handleChangeStatus(e, task)}
                        defaultChecked={task.status === 2 ? true : false}
                      />
                    </label>
                  </div>
                  <div className="statusOverlay">
                    <p>{status[0].toUpperCase() + status.substring(1)}</p>
                    <span>Priority : {priority}</span>
                  </div>
                </li>
              )
            })
          : null}

        {currentProject && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setAdding('addTask')
            }}
          >
            <img src={createTaskIcon} alt="" />
          </button>
        )}
      </ol>
    </WrapperTasks>
  )
}

export default TasksContainer
