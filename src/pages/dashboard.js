import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar/index';
import Timeline from '../components/timeline';
// import UserContext from '../context/user'
// import useUser from '../hooks/use-user';



export default function Dashboard() {
  // const { user: loggedInUser } = useContext(UserContext);
  // const { user } = useUser(loggedInUser?.uid);

  useEffect(() => {
      document.title = 'Instagram Dashboard';
  }, [])

  return (

    <div className="bg-gray-background">
      <Navbar />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>

  )
} 