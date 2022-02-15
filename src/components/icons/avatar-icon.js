import { Link } from 'react-router-dom';

export default function Avataricon({ user: { username, avatarSrc } }) {
  return !avatarSrc ? (
    <Link to={`/login`}>
    <img
        className="rounded-full h-8 w-8 flex"
        src={"/images/avatars/default.png"}
        alt={`${username}`}
      />
     </Link>
  ) : (
    <Link to={`/p/${username}`}>
      <img
        className="rounded-full h-8 w-8 flex"
        src={avatarSrc}
        alt={`${username} `}
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
