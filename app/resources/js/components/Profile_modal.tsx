import { useForm } from '@inertiajs/inertia-react'
import { FormModalContainer } from '../styles/FormModal.style'
import { userdataType } from '../types/userdatatype'
import { FormEvent } from 'react'

const ProfileModal = ({
  userData,
  setOpen,
}: {
  userData: userdataType
  setOpen(val: string): void
}) => {
  const { data, setData, post, processing } = useForm({
    username: userData.username,
    email: userData.email,
    password: '',
  })

  function handleChangeValues(e: React.ChangeEvent) {
    setData({
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (
      userData.email !== data.email ||
      userData.username !== data.username ||
      data.password !== ''
    ) {
      post('/profile/update', {
        data,
        onError: () => {},
        onSuccess: () => {
          setOpen('')
        },
      })
    }
  }
  return (
    <FormModalContainer onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username*
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChangeValues}
          required
          value={data.username}
        />
      </label>
      <label htmlFor="email">
        Email*
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChangeValues}
          required
          value={data.email}
        />
      </label>
      <label htmlFor="password">
        Change password
        <input type="password" name="password" id="password" onChange={handleChangeValues} />
      </label>

      <input type="submit" value="Save --" disabled={processing} />
    </FormModalContainer>
  )
}

export default ProfileModal
