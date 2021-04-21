import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar/index';
import Timeline from '../components/timeline';



export default function Dashboard(user) {

  useEffect(() => {
      document.title = 'Instagram Dashboard';
  }, [])



  return (

    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>

  )
} 