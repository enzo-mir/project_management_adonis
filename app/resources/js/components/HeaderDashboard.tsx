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

  & > span {
    position: absolute;
    left: 10px;
    top: 10px;
    text-decoration: none;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 2px solid hsl(242, 50%, 50%);
    color: white;
    z-index: 50;
  }
`

const HeaderDashboard = ({
  projectTitle,
  projectDescription,
  startDate,
  endDate,
}: {
  projectTitle: string
  projectDescription: string
  startDate: Date
  endDate: Date
}) => {
  return (
    <HeaderWrapper>
      <span>
        <p>Start date : {new Date(startDate).toLocaleDateString()}</p>
        <p>End date : {new Date(endDate).toLocaleDateString()}</p>
      </span>
      <h1>{projectTitle}</h1>
      <p>{projectDescription}</p>
    </HeaderWrapper>
  )
}

export default HeaderDashboard
