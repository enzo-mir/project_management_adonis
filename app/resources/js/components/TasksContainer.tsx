import { TasksType } from 'App/types/adminDataTypes'
import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

const WrapperTasks = styled.section`
  display: grid;
  grid-template-rows: auto auto 1fr;
  place-items: center;
  color: white;
`

const TasksContainer = ({ tasks, children }: { tasks: TasksType; children: ReactNode }) => {
  const [progression, setProgression] = useState<number>(0 || getProgression(tasks))
  const [dinamicTasks, setDinamicTasks] = useState<TasksType>()
  useEffect(() => {
    setDinamicTasks(tasks)
    setProgression(getProgression(dinamicTasks || tasks))
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
          ProgressBar
          <input
            type="range"
            name="progressBar"
            id="progressBar"
            value={progression.toPrecision(2)}
            min={0}
            max={100}
            disabled
          />
        </label>
      </div>
      <ol id="tasksCont">
        {dinamicTasks?.map((task, index) => {
          const status = task.status === 0 ? 'todo' : task.status === 1 ? 'doing' : 'done'
          return (
            <li key={task.id}>
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
