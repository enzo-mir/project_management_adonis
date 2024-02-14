import { useForm } from '@inertiajs/inertia-react'
import { FormEvent } from 'react'
import styled from 'styled-components'
import { FormModalContainer } from '../styles/FormModal.style'

const MainWrapperForgotPassword = styled.main`
  display: grid;
  place-items: center;
  height: 100%;

  & > section {
    display: grid;
    place-items: center;
    border-radius: 10px;
    gap: 2em;
    width: clamp(350px, 40svw, 900px);
    color: white;
    background-color: hsl(241, 50%, 50%);
    padding: 1.5em;
  }
`

const ForgotPassword = () => {
  const { get, data, setData, processing } = useForm({
    password: '',
    confirmPassword: '',
  })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (data.password.length >= 8) {
      if (data.password === data.confirmPassword) {
        get(window.location.href, { data })
      }
    }
  }
  return (
    <MainWrapperForgotPassword>
      <section>
        <h1>Reset your password</h1>
        <FormModalContainer onSubmit={handleSubmit}>
          <label htmlFor="password">
            Password*
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
              minLength={8}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm password*
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              value={data.confirmPassword}
              minLength={8}
              required
            />
          </label>
          <input type="submit" value="Enrgistrer --" disabled={processing} />
        </FormModalContainer>
      </section>
    </MainWrapperForgotPassword>
  )
}

export default ForgotPassword
