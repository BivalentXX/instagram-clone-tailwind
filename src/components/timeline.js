import Skeleton from 'react-loading-skeleton';
import useUser from '../hooks/use-user'
import usePhotos from '../hooks/use-photos';
import TimelinePost from './post/timeline-post';


export default function Timeline() {
  const { user } = useUser()
  const { photos } = usePhotos(user);
  
  // console.log('photo', photos);
  // console.log('timeline photos content object', photos)

  return (
  <div className="container col-span-2">
    {!photos ? (
      <Skeleton count={4} width={640} height={500} className="mb-5" />
    ) : photos?.length > 0 ? (
      photos.map((content) => 
      <>
      
      <TimelinePost key={content.docId} content={content} />
      </>
      )
    ) : (
      <p className="text-center text-2xl">Follow a user to view posts</p>
    )}   
  </div>
  )
}
