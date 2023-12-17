import { userdataType } from '../types/userdatatype'

const Dashboard = ({
  errors,
  userData,
}: {
  errors: { messages: string }
  userData: userdataType
}) => {
  console.log(userData)
  console.log(errors)

  return <div>Dashboard</div>
}

export default Dashboard
