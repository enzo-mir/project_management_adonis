import styled from 'styled-components'

const LayoutWrapper = styled.section`
  display: grid;
  place-items: center;
  grid-template-rows: 20vh 1fr;
  width: 100%;
  height: 100%;
  background-color: hsl(242, 50%, 20%);
  color: white;

  & > h1 {
    font-size: clamp(2em, 3vw, 3em);
  }

  & > main {
    align-self: start;
    width: clamp(400px, 50svw, 700px);
  }

  & a {
  position: relative;
  background: linear-gradient(45deg, hsl(242, 51%, 38%), hsl(243, 100%, 74%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}

`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <h1>
        Project Managment by{' '}
        <a href="https://github.com/enzo-mir" target="_blank">
          #Github
        </a>
      </h1>
      <main>{children}</main>
    </LayoutWrapper>
  )
}

export default Layout
