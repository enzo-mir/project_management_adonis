import { TasksType, projectsType } from 'App/types/adminDataTypes'
import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import { projectStore } from '../store/project.store'
// @ts-ignore: Unreachable code error

import createTaskIcon from '../images/createProjectIcon.svg'
import { useForm } from '@inertiajs/inertia-react'
import { DeleteBtn } from '../styles/DashboardStyle'
import { Wrapper, WrapperTasks } from '../styles/TasksStyle'

const TasksContainer = ({
  tasks,
  children,
  currentProject,
}: {
  tasks: TasksType
  children: ReactNode
  currentProject: projectsType[0]
}) => {
  const [progression, setProgression] = useState<number>(0 || getProgression(tasks))
  const [dynamicTasks, setDynamicTasks] = useState<TasksType>(tasks)
  const [allProjects, setAllProjects] = projectStore((state) => [
    state.allProjects,
    state.setAllProjects,
  ])
  const [addingTasks, setAddingTasks] = useState(false)
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
    setDynamicTasks(tasks)
    setProgression(getProgression(tasks))
  }, [tasks])

  function NewTask() {
    const { data, setData } = useForm({
      name: '',
      description: '',
      priority: 0,
      project_id: currentProject.id,
    })

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      setData({
        ...data,
        [e.target.name]: parseInt(e.target.value) || e.target.value,
      })
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      const responseData = fetch('/task/add', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const response = await responseData
      if (response.ok) {
        responseData
          .then((r) => r.json())
          .then((dataResponse: { id: number }) => {
            setDynamicTasks([
              ...dynamicTasks,
              {
                id: dataResponse.id,
                project_id: currentProject.id,
                name: data.name,
                description: data.description,
                status: 0,
                priority: data.priority as 0 | 1 | 2,
              },
            ])
          })
        setAddingTasks(false)
      }
    }
    return (
      <Wrapper onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Title :
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Description :
          <input type="text" name="description" id="description" onChange={handleChange} />
        </label>
        <label htmlFor="priority">
          Priority :
          <select name="priority" id="priority" onChange={handleChange}>
            <option value={0}>Low</option>
            <option value={1}>Mid</option>
            <option value={2}>Hight</option>
          </select>
        </label>
        <input type="submit" value="Ajouter" />
      </Wrapper>
    )
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
        .then((r) => r.json())
        .then((data: TasksType) => {
          setDynamicTasks(data)
        })
    }
  }

  async function handleChangeStatus(e: FormEvent<HTMLInputElement>, currentTask: TasksType[0]) {
    let statusValue = parseInt((e.target as HTMLElement).dataset.value!) as 0 | 1 | 2

    const changeStatusResponse = await fetch('/task/status', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId: currentTask.id, status: statusValue }),
    })
    if (changeStatusResponse.ok) {
      setDynamicTasks(actionChangeStatus(currentTask, statusValue, dynamicTasks) as TasksType)

      const progress = getProgression(
        actionChangeStatus(currentTask, statusValue, dynamicTasks) as TasksType
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
        {dynamicTasks?.map((task, index) => {
          const status = task.status === 0 ? 'todo' : task.status === 1 ? 'doing' : 'done'
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
              </div>
            </li>
          )
        })}
        {addingTasks && <NewTask />}

        {currentProject && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setAddingTasks(true)
              window.addEventListener('click', () => setAddingTasks(false))
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
