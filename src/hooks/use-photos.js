import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        // re-arrange array to be newest photos first by dateCreated
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
        console.log(user.userId, user.following)
      }
    }
    
    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
}



  //solution should there be no need to check if the user follows anyone
  // export default function usePhotos(user) {
  //   const [photos, setPhotos] = useState(null);
  //   const { 
  //   //uid: userId (sets uid argument to an alias name as userId)
  //     user: { uid: userId = ''}
  //     } = useContext(UserContext)
  
  //     useEffect(() => {
  //       async function getTimelinePhotos() {
  
  //         if (user?.following?.length > 0) {
  //           const followedUserPhotos = await getPhotos(user.userId, user.following);
  
  //           followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
  //           setPhotos(followedUserPhotos);
  //         }
  //       }
    
  //       getTimelinePhotos();
  //     }, [user?.userId]);
    
  //     return { photos };
  //   }