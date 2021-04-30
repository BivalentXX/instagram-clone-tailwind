import User from './user';
import Suggestions from './suggestions';
import useUser from '../../hooks/use-user';;


export default function Sidebar() {
  const { user } = useUser();

  return (
    <div className="p-4">
      <User user={user} fullName={user.fullName} />
      <Suggestions user={user} userId={user.userId} following={user.following} loggedInUserDocId={user.docId}/>
    </div>
  );

}