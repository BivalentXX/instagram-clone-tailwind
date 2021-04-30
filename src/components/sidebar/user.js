import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Avataricon from '../icons/avatar-icon';


export default function User({ user, fullName }) {
  return !user || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${user.username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center jsutify-between col-span-1">
       <Avataricon user={user} />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{user.username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>  
  );
  }

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};