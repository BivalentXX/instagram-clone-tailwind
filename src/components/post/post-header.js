import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ profile }) {
  return profile ? (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${profile.username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={profile.avatarSrc}
            alt={`${profile.username} profile`}
          />
          <p className="font-bold">{profile.username}</p>
        </Link>
      </div>
    </div>
  ) : (null);
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
