
// import Closeicon from '../icons/closeicon'
// import PropTypes from 'prop-types';
import { useRef } from 'react';

import Header from './post-header';
import Image from './post-image'
import Actions from './post-actions'
import Footer from './post-footer'
import Comments from './post-comments';
// import Closeicon from '../icons/closeicon';


export default function SinglePostViewer({ photo, profile, toggleSinglePostViewer}) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus

  // const [ toggleSinglePostViewer, setToggleSinglePostViewer ] = useState(false)

  // const handleToggleSinglePostViewer = async () => {
  //   setToggleSinglePostViewer((toggleSinglePostViewer) => !toggleSinglePostViewer);  
  //   console.log(toggleSinglePostViewer)
  // }

  
// console.log('photo', photo)
return (

<>

<div className="fixed w-400 h-400 top-2 left-1/3  flex items-center justify-center "> 


    <div className="bg-white w-11/12 max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      

    <Header profile={profile} />
 
    <Image src={photo.imageSrc} caption={photo.caption} />
    <Actions
      docId={photo.docId}
      totalLikes={photo.likes.length}
      likedPhoto={photo.userLikedPhoto}
      handleFocus={handleFocus} />
    <Footer caption={photo.caption} username={profile.username} />
    <Comments 
      docId={photo.docId}
      comments={photo.comments}
      posted={photo.dateCreated}
      commentInput={commentInput}
      />
</div>
    
    </div>
 </>


)
}


/* <div className="h-screen flex items-center justify-center">
  <div className="w-3/5 rounded-lg shadow-lg bg-blue-medium">
    <div className="border-b border-blue-800 text-blue-400">
      <div className="object-right">X</div>
      <div className="p-4 pl-20 relative">body</div>
    </div>
  </div>
</div> */

