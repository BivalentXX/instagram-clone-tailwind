import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



export default function NavbarUser({ username }) {
  return !username ? (
    <Skeleton count={1} width={50} height={50} />
  ) : (
    
    <Link to={`/p/${username}`}>
      <img
        className="rounded-full h-8 w-8 flex"
        src={`/images/avatars/${username}.jpg`}
        alt={`${username} `}
      />
    </Link>
  
  )
  }



// Replacing...
  // {!user ? (
  //   <Skeleton count={1} width={50} height={50} />
  //   ) : user ? (
  //   <div className="flex items-center cursor-pointer">
  //     <Link to={`/p/${user?.username}`}>
  //       <img
  //         className="rounded-full h-8 w-8 flex"
  //         src={`/images/avatars/${user?.username}.jpg`}
  //         alt={`${user?.username} `}
  //       />
  //     </Link>
  //   </div>
  //   ) : null }
