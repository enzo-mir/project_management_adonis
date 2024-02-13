import { Link } from '@inertiajs/inertia-react'
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
    font-size: 0.8em;
    padding: 0.5em;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 2px solid hsl(242, 50%, 50%);
    color: white;
  }

  & > div.cta_button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    right: 10px;
    top: 10px;
    padding: 0.5em;

    & > button {
      font-size: 1em;
      padding: 0.5em;
      border-radius: 3px;
      background: hsl(242, 50%, 50%);
      color: white;
      border: none;
      transition: all 0.2s ease-out;

      &:hover {
        cursor: pointer;
        scale: 1.15;
      }
    }

    & > a {
      font-size: 1em;
      padding: 0.5em;
      border-radius: 3px;
      color: white;
    }
  }
`

const HeaderDashboard = ({
  projectTitle,
  projectDescription,
  startDate,
  endDate,
  setOpen,
}: {
  projectTitle: string
  projectDescription: string
  startDate: Date
  endDate: Date
  setOpen(val: string): void
}) => {
  return (
    <HeaderWrapper>
      <span>
        <p>Start date : {new Date(startDate).toLocaleDateString()}</p>
        <p>End date : {new Date(endDate).toLocaleDateString()}</p>
      </span>
      <h1>{projectTitle}</h1>
      <p>{projectDescription}</p>
      <div className="cta_button">
        <button
          onClick={() => {
            setOpen('profileSettings')
          }}
        >
          Profile
        </button>
        <Link href="/logout">Log out</Link>
      </div>
    </HeaderWrapper>
  )
}

export default HeaderDashboard
