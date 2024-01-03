import { TasksType, projectsType } from 'App/types/adminDataTypes'
import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { projectStore } from '../store/project.store'
// @ts-ignore: Unreachable code error

import createTaskIcon from '../images/createProjectIcon.svg'
import { useForm } from '@inertiajs/inertia-react'
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5em;
  border-radius: 5px;
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
const WrapperTasks = styled.section`
  position: relative;
  padding: 2em 10%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2em;
  place-items: center;
  color: white;

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
  }
  & > ol#tasksCont {
    display: flex;
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

    & button {
      background-color: transparent;
      align-self: end;
      border: none;
      width: 40px;
      height: 41px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`

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
      }).finally()
    }
  }

  return (
    <WrapperTasks>
      {children}
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
      <ol id="tasksCont">
        {dynamicTasks?.map((task, index) => {
          const status = task.status === 0 ? 'todo' : task.status === 1 ? 'doing' : 'done'
          return (
            <li key={task.id} className={status}>
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
