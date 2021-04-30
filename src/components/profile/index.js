import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';

export default function UserProfile({ user }) {
 
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    getProfileInfoAndPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username]); 

  // console.log('photosCollection', photosCollection)

  return (
    <>

      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />

      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
          {photosCollection.length > 0 ? (
              photosCollection.map((photo) => (
          <Photos key={photo.photoId} photo={photo} profile={profile}/>
              ))
          ) : (
            <p className="text-center text-2xl">No Posts Yet</p>)}
      </div>
    </div>
      
    </>
  );
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