import { TasksType } from 'App/types/adminDataTypes'
import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

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
  }
`

const TasksContainer = ({ tasks, children }: { tasks: TasksType; children: ReactNode }) => {
  const [progression, setProgression] = useState<number>(0 || getProgression(tasks))
  const [dinamicTasks, setDinamicTasks] = useState<TasksType>(tasks)
  useEffect(() => {
    setDinamicTasks(tasks)
    setProgression(getProgression(tasks))
  }, [tasks])

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

  function handleChangeStatus(e: React.ChangeEvent, currentTask: TasksType[0]) {
    let value = parseInt((e.target as HTMLElement).dataset.value!) as 0 | 1 | 2
    let newStatusObject = Object.assign(currentTask, {
      status: value,
    })
    const newDynamiqueTask: TasksType = dinamicTasks!

    dinamicTasks!.map((task, index) => {
      task === currentTask ? (newDynamiqueTask[index] = newStatusObject) : null
    })

    setDinamicTasks(newDynamiqueTask)
    setProgression(getProgression(newDynamiqueTask))
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
            step={1}
            title={progression.toString()}
            disabled
          />
        </label>
      </div>
      <ol id="tasksCont">
        {dinamicTasks?.map((task, index) => {
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
                <p>{status}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </WrapperTasks>
  )
}

export default TasksContainer