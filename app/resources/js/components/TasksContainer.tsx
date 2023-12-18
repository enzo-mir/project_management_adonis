import { TasksType } from 'App/types/adminDataTypes'
import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

const WrapperTasks = styled.section`
  display: grid;
  grid-template-rows: auto auto 1fr;
  place-items: center;
  color: white;
`

const TasksContainer = ({ tasks, children }: { tasks: TasksType; children: ReactNode }) => {
  useEffect(() => {
    setProgression(getProgression(tasks))
  }, [tasks])
  const [progression, setProgression] = useState<number>(0 || getProgression(tasks))
  function getProgression(tasks) {
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
    </WrapperTasks>
  )
}

export default TasksContainer
