import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowing, updateLoggedInUserFollowing } from '../../services/firebase';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
  
  const [followed, setFollowed] = useState(false)

  async function handleFollowUser() {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)

    await updateFollowedUserFollowing(profileDocId, userId, false)

  }

  return !followed ? (
    <div className="flex flex-row items-cneter algin-items justify-between">
      <div className="flex items-center justify-between">
        <img 
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt={`user suggestion of ${username}`}
          />
          <Link to={`/p/${username}`}>
            <p className="font-bold text-sm">{username}</p>
          </Link>
      </div>

      <button 
        className="text-cs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>

    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
}