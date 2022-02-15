import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Avataricon from '../icons/avatar-icon';
// import { Link } from 'react-router-dom';
// Changed the Link to div since Avatar Icon now has Link built in

export default function User({ user, fullName }) {
  return !user || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center jsutify-between col-span-1">
       <Avataricon user={user} />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{user.username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </div>  
  );
  }

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};