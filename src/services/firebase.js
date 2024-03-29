import { firebaseApp, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.map((user) => user.data().length > 0)
  }

export async function getUserByUsername(username) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebaseApp.firestore().collection('users').where('userId', '==', userId).get(); 
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));  
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebaseApp.firestore().collection('users').limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebaseApp
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowing (
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile,
) {
  return firebaseApp
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
      ? FieldValue.arrayRemove(loggedInUserDocId)
      : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export async function getPhotos(userId, following) {
  const result = await firebaseApp
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();
    console.log(userId)
    console.log(following)
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));
  console.log(userFollowedPhotos)
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      console.log(user[0])
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}


// export async function getUserPhotosByUsername(username) {
//   const [user] = await getUserByUsername(username);
//   const result = await firebaseApp
//     .firestore()
//     .collection('photos')
//     .where('userId', '==', user.userId)
//     .get();
    
//   return result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id
//   }))
// }
export async function getUserPhotosByUsername(loggedInUser, username) {
  // console.log('loggedInUser', loggedInUser.userId)
  const [user] = await getUserByUsername(username);
  const result = await firebaseApp
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();
  const profilePhotos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
  const photosWithUserDetails = await Promise.all(
    profilePhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(loggedInUser.userId)) {
        userLikedPhoto = true;
      }

      // console.log('photo.likes.includes', photo.likes)
      const user = await getUserByUserId(photo.userId)
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails
  
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

    const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));

    return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)

  await updateFollowedUserFollowing(profileDocId, followingUserId, isFollowingProfile);
}