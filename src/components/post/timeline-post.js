import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './post-header';
import Image from './post-image'
import Actions from './post-actions'
import Footer from './post-footer'
import Comments from './post-comments';


export default function TimelinePost({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus()

  // const user = getUserByUserId(content.userId)
// console.log('content', content)
  return (
  <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
    <Header content={content} username={content.username} />
    <Image src={content.imageSrc} caption={content.caption} />
    <Actions
      docId={content.docId}
      totalLikes={content.likes.length}
      likedPhoto={content.userLikedPhoto}
      handleFocus={handleFocus} />
    <Footer caption={content.caption} username={content.username} />
    <Comments 
      docId={content.docId}
      comments={content.comments}
      posted={content.dateCreated}
      commentInput={commentInput}
      />
  </div>
  ) 
}


TimelinePost.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
