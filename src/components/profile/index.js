import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types';
import Header from './header'
import Photos from './photos'
import { getUserPhotosByUsername } from '../../services/firebase';


export default function UserProfile({ user }) {
  console.log('user', user)

  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followersCount: 0
  }

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);


useEffect(() => {
  async function getProfileInfoAndPhotos() {
//placing await here allowed the photocollection object to properly load when application was delivered to client
    const photos = await getUserPhotosByUsername(user.username)
    dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length })
    }

    if (user.username) {
    getProfileInfoAndPhotos();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username]) 

  return (
  <>
    <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
    <Photos photos={photosCollection} />
  </>
  )
}


UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
}