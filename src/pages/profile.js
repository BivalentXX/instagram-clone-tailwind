import { useParams, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes'
import Navbar from '../components/navbar'
import UserProfile from '../components/profile'
import UserContext from '../context/user'
import useUser from '../hooks/use-user';


export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const history = useHistory()
  const { user: loggedInUser } = useContext(UserContext);
  const { activeUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);

      if (user) {
        setUser(user[0])
      } else {

        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history])
  
  return user ? (
    <div className="bg-gray-background">
      <Navbar user={activeUser}/>
      <UserProfile user={user}/>
    </div>
  ) : null;
  
}
