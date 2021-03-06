import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowing, updateLoggedInUserFollowing } from '../../services/firebase';
import Avataricon from '../icons/avatar-icon'

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId, profile}) {
  
  const [followed, setFollowed] = useState(false)
  // console.log(profile)

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
    await updateFollowedUserFollowing(profileDocId, userId, false)

  }
  //loggedInUserDocID is null in testing
  // return (<Avataricon user={profile} />)
  // : null; 
  // !followed ? : (null);
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
   
      <div className="flex items-center justify-between">
        <div className="mr-4">
          <Avataricon user={profile} />
        </div>
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
  ) : (null);
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
}