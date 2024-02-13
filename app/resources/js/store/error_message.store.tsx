import { create } from 'zustand'
type ErrorStore = {
  errorMessage: string
  setErrorMessage: (val: string) => void
}
export const erroreMessageStore = create<ErrorStore>((set) => ({
  errorMessage: '',
  setErrorMessage: (val) => set(() => ({ errorMessage: val })),
}))
