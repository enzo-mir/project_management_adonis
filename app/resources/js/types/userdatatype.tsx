export type userdataType = {
  projects: Array<{
    id: number
    name: string
    description: string
    start_date: Date
    end_date: Date
    status: 0 | 1 | 2
    priority: 0 | 1 | 2
  }>
  tasks: Array<{
    id: number
    project_id: number
    name: string
    description: string
    status: 0 | 1 | 2
    priority: 0 | 1 | 2
  }>
}
