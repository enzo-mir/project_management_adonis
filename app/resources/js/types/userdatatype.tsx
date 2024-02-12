export type userdataType = {
  id: number
  username: string
  email: string
  password: string
}

export type ProjectType = Array<{
  id: number
  name: string
  description: string
  start_date: Date
  end_date: Date
  status: 0 | 1 | 2
  priority: 0 | 1 | 2
}>

export type TaskType = Array<{
  id: number
  project_id: number
  name: string
  description: string
  status: 0 | 1 | 2
  priority: 0 | 1 | 2
}>
