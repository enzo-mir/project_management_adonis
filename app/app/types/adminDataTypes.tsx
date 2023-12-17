export type projectsType = Array<{
  id: number
  name: string
  description: string
  start_date: Date
  end_date: Date
  status: 0 | 1 | 2
  priority: 0 | 1 | 2
}>

export type TasksType = Array<{
  id: number
  project_id: number
  name: string
  description: string
  status: 0 | 1 | 2
  priority: 0 | 1 | 2
}>
