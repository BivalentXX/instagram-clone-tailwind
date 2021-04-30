import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



export default function Avataricon({ user }) {

  return !user.avatarSrc ? (
    <Skeleton count={1} width={50} height={50} />
  ) : (
    
    <Link to={`/p/${user.username}`}>
      <img
        className="rounded-full h-8 w-8 flex"
        src={user.avatarSrc}
        alt={`${user.username} `}
      />
    </Link>
  
  )
  }


//removed for production implementation until we get avatar upload functionality
  // src={`/images/avatars/${username}.jpg`}

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
