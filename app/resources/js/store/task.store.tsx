import { TasksType } from 'App/types/adminDataTypes'
import { create } from 'zustand'

type store = {
  allTasks: TasksType
  setAllTasks: (val: TasksType) => void
}

export const taskStore = create<store>((set) => ({
  allTasks: [],
  setAllTasks: (val) => set(() => ({ allTasks: val })),
}))
