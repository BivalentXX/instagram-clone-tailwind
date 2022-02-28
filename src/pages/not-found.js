import { useEffect } from 'react';
import Navbar from '../components/navbar'

export default function NotFound() {

  useEffect(() => {
      document.title = 'Not Found - Instagram';
  }, [])

  return (
    <div className="bg-gray-background">
      <Navbar />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Page Not Found!</p>
      </div>
    </div>
  )
}
