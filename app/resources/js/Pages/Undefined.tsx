import { Link } from '@inertiajs/inertia-react'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1em;
  width: 100%;
  height: 100%;
  & > h1 {
    color: white;
  }
  & > a {
    text-decoration: none;
    font-size: 1.25em;
    padding: 0.5em;
    border-radius: 3px;
    background: hsl(242, 50%, 50%);
    color: white;
    z-index: 50;
  }
`

const Undefined = ({ title }: { title: string | undefined }) => {
  return (
    <Wrapper>
      <h1>{title || 'Error 404 : Undefined path'}</h1>
      <Link href="/">Go home</Link>
    </Wrapper>
  )
}

export default Undefined
