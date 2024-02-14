import { useForm } from '@inertiajs/inertia-react'
import { FormEvent } from 'react'
import { erroreMessageStore } from '../store/error_message.store'
import { FormModalContainer } from '../styles/FormModal.style'

const ForgotPassword = ({ setOpen }: { setOpen(v: string): void }) => {
  const { post, data, setData } = useForm({
    email: '',
  })
  const setError = erroreMessageStore((state) => state.setErrorMessage)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    post('/password', {
      data,
      onSuccess: () => {
        setOpen('')
      },
      onError: (msg) => {
        setError(msg as unknown as string)
      },
    })
  }
  return (
    <FormModalContainer onSubmit={handleSubmit}>
      <label htmlFor="emailForgot">
        Email
        <input
          type="email"
          id="emailForgot"
          name="emailForgot"
          autoComplete="email"
          placeholder="Type your email"
          value={data.email}
          onChange={(e) => setData({ email: e.target.value })}
          required
        />
      </label>
      <input type="submit" value="Send email --" />
    </FormModalContainer>
  )
}

export default ForgotPassword
