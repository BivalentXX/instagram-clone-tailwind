import User from './user';
import Suggestions from './suggestions';
import useUser from '../../hooks/use-user';;


export default function Sidebar() {
  const { user } = useUser();
  // console.log('user', JSON.stringify(user))
  // const userString = JSON.stringify(user)

  //removed user from being a prop to Suggestions
  //Need to cleanup the logic and have it follow the same path as following on the profile page
  return (
    <div className="p-4">   
      <User user={user} fullName={user.fullName} />
      <Suggestions  userId={user.userId} following={user.following} loggedInUserDocId={user.docId}/>
    </div>
  )
}

