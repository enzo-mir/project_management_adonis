import { projectsType } from 'App/types/adminDataTypes'
import { create } from 'zustand'

type store = {
  allProjects: projectsType
  setAllProjects: (val: projectsType) => void
}

export const projectStore = create<store>((set) => ({
  allProjects: [],
  setAllProjects: (val) => set(() => ({ allProjects: val })),
}))
