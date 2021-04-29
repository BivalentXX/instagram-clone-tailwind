import { useParams, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes'
import Navbar from '../components/navbar'
import UserProfile from '../components/profile'
import UserContext from '../context/user'
import useUser from '../hooks/use-user';
import PostUploader from '../components/postuploader';


export default function Upload() {
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

// console.log(loggedInUser.uid)
// console.log('active', activeUser)

  return user ? (

    <div className="bg-gray-background">

    <Navbar />
      <PostUploader loggedInUserUid={activeUser} />
 
      

    </div>
  ) : null;
  
}
