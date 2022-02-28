import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user.js';
import Homeicon from './icons/homeicon'
import Logouticon from './icons/logouticon'
import Avataricon from './icons/avatar-icon'
import Uploadicon from './icons/uploadicon';


export default function Navbar() {
  const { firebaseApp } = useContext(FirebaseContext);
  const history = useHistory(); 
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);


  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">

        <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
          <h1 className="flex justify-center w-full">
            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
              <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
            </Link>
          </h1>
          </div>

          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <Homeicon />
                </Link>
                <Link to={`/upload/${user.username}`} aria-label="Upload">
                  <Uploadicon />
                </Link>

                <button
                  data-testid="sign-out"
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    firebaseApp.auth().signOut()
                    history.push(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebaseApp.auth().signOut()
                      history.push(ROUTES.LOGIN);
                    }
                  }}>
                  <Logouticon />
                </button>
                  
                <div className="flex items-center cursor-pointer">
                  <Avataricon user={user}/>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}  

          </div>
        </div>
      </div>
    </header> 

  );
}
