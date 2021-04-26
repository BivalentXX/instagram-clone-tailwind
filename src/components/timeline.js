import Skeleton from 'react-loading-skeleton';
import useUser from '../hooks/use-user'
import usePhotos from '../hooks/use-photos';
import Post from './post/index'

export default function Timeline() {
  const { user } = useUser()
  const { photos } = usePhotos(user);
  // console.log('photo', photos);

  return (
  <div className="container col-span-2">
    {!photos ? (
      <Skeleton count={4} width={640} height={500} className="mb-5" />
    ) : photos?.length > 0 ? (
      photos.map((content) => <Post key={content.docId} content={content} />)
    ) : (
      <p className="text-center text-2xl">Follow</p>
    )}   
  </div>
  )
}
