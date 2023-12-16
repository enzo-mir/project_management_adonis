import { Head, InertiaLink } from '@inertiajs/inertia-react'
import Layout from './Layout'
import styled from 'styled-components'

const WrapperHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;

  & > a {
    position: relative;
    text-align: center;
    text-decoration: none;
    width: 150px;
    font-size: 1.25em;
    padding: 0.5em;
    border-radius: 3px;
    outline: none;
    border: none;
    background: hsl(242, 50%, 50%);
    color: white;
    -webkit-text-fill-color: initial;
    z-index: 50;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      transition: all 0.25s ease-out;
      left: 0;
      background-color: rgba(143, 140, 217, 0.2);
      z-index: -10;
    }
    &:hover {
      &::before {
        transform: scale(1.15);
      }
    }
  }
`

const Home = () => {
  return (
    <>
      <Head title="Project_managment - Register" />
      <WrapperHome>
        <InertiaLink href="/register">Register</InertiaLink>
        <InertiaLink href="/login">Login</InertiaLink>
      </WrapperHome>
    </>
  )
}
Home.layout = (page: HTMLElement) => <Layout children={page} />

export default Home
