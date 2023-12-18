import styled from 'styled-components'
const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  & > h1 {
    font-size: 3em;
    font-weight: lighter;
  }
  & > p {
    font-size: 1.5em;
  }
`

const HeaderDashboard = ({
  projectTitle,
  projectDescription,
}: {
  projectTitle: string
  projectDescription: string
}) => {
  return (
    <HeaderWrapper>
      <h1>{projectTitle}</h1>
      <p>{projectDescription}</p>
    </HeaderWrapper>
  )
}

export default HeaderDashboard
