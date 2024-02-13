import { useForm } from '@inertiajs/inertia-react'
import { ChangeEvent, FormEvent } from 'react'
import { FormModalContainer } from '../styles/FormModal.style'
import { TasksType } from 'App/types/adminDataTypes'
import { TaskType } from '../types/userdatatype'
import { projectStore } from '../store/project.store'

const AddTaskModal = ({
  setOpen,
  projectId,
}: {
  setOpen(val: string): void
  projectId: number
}) => {
  const setAllProjects = projectStore((state) => state.setAllProjects)
  const { data, setData, processing, post } = useForm({
    name: '',
    description: '',
    priority: 0,
    project_id: projectId,
  })

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setData({
      ...data,
      [e.target.name]: parseInt(e.target.value) || e.target.value,
    })
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    post('/task/add', {
      data,
      onSuccess: (success) => {
        const currentTasks = (success.props.tasks as TaskType).filter(
          (task) => task.project_id === projectId
        )
        const progress = getProgression(currentTasks)

        fetch('/project/status', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId,
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

        setOpen('')
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  return (
    <FormModalContainer onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
      <label htmlFor="name">
        Title
        <input type="text" name="name" id="name" onChange={handleChange} required />
      </label>
      <label htmlFor="description">
        Description
        <input type="text" name="description" id="description" onChange={handleChange} required />
      </label>
      <label htmlFor="priority">
        Priority
        <select name="priority" id="priority" onChange={handleChange}>
          <option value={0}>Low</option>
          <option value={1}>Mid</option>
          <option value={2}>Hight</option>
        </select>
      </label>
      <input type="submit" value="Ajouter" disabled={processing} />
    </FormModalContainer>
  )
}

export default AddTaskModal
