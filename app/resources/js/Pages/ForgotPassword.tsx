import { useForm } from '@inertiajs/inertia-react'
import { AnimatePresence } from 'framer-motion'
import { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import MessageComponent from '../components/MessageComponent'
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
  const [validation, setValidation] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      validation ? setValidation('') : null
    }, 3000)
  }, [validation])

  const { post, data, setData, processing } = useForm({
    password: '',
    confirmPassword: '',
  })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (data.password.length >= 8) {
      if (data.password === data.confirmPassword) {
        post(window.location.href, {
          data,
          onError: (msg) => {
            setValidation(msg as unknown as string)
          },
        })
      } else {
        setValidation('Password and the confirmation password does not matchs')
      }
    } else {
      setValidation("Password's length must further than 8")
    }
  }
  return (
    <MainWrapperForgotPassword>
      <AnimatePresence>
        {validation ? (
          <MessageComponent open={validation ? true : false} message={validation} />
        ) : null}
      </AnimatePresence>
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
