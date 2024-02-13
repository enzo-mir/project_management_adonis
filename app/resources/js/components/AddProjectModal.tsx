import { useForm } from '@inertiajs/inertia-react'
import React, { FormEvent } from 'react'
import { FormModalContainer } from '../styles/FormModal.style'

const AddProjectModal = ({ setOpen }: { setOpen(val: string): void }) => {
  const { data, setData, processing, post } = useForm({
    nameValue: '',
    descValue: '',
    startDateValue: null,
    endDateValue: null,
    priorityValue: 0,
  })

  function handleChangeValues(e: React.ChangeEvent) {
    ;(e.target as HTMLInputElement).name === 'priorityValue'
      ? setData({
          ...data,
          [(e.target as HTMLInputElement).name]: parseInt((e.target as HTMLInputElement).value),
        })
      : setData({
          ...data,
          [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        })
  }

  async function addProject(e: FormEvent) {
    e.preventDefault()
    post('/project/add', {
      data,
      onSuccess: () => {
        setOpen('')
      },
    })
  }

  return (
    <FormModalContainer onSubmit={addProject}>
      <label htmlFor="nameValue">
        Name*
        <input type="text" name="nameValue" id="nameValue" onChange={handleChangeValues} required />
      </label>
      <label htmlFor="descValue">
        Description*
        <input type="text" name="descValue" id="descValue" onChange={handleChangeValues} required />
      </label>
      <div>
        <label htmlFor="startDateValue">
          Start date*
          <input
            type="date"
            name="startDateValue"
            id="startDateValue"
            onChange={handleChangeValues}
            required
          />
        </label>
        <label htmlFor="endDateValue">
          End date*
          <input
            type="date"
            name="endDateValue"
            id="endDateValue"
            onChange={handleChangeValues}
            required
          />
        </label>
      </div>
      <label htmlFor="priorityValue">
        priority
        <select name="priorityValue" id="priorityValue" onChange={handleChangeValues} required>
          <option value={0}>Low</option>
          <option value={1}>Mid</option>
          <option value={2}>Hight</option>
        </select>
      </label>
      <input type="submit" value="Add project" disabled={processing} />
    </FormModalContainer>
  )
}

export default AddProjectModal
