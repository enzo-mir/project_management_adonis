import styled from 'styled-components'
const HeaderWrapper = styled.header``

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
