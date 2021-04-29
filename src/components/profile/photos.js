/* eslint-disable no-nested-ternary */

import { React, useState } from 'react'
import Hearticon from '../icons/hearticon'
import Commenticon from '../icons/commenticon'
import SinglePostViewer from '../post/single-post-viewer';
import ReactDom from 'react-dom'



export default function Photos({ photo, profile }) {
  // console.log('profile photos component level', photo)

  
  const [ toggleSinglePostViewer, setToggleSinglePostViewer ] = useState(false)

  const handleToggleSinglePostViewer = async () => {
    setToggleSinglePostViewer((toggleSinglePostViewer) => !toggleSinglePostViewer);  
    console.log(toggleSinglePostViewer)
  }




return (
        
        <>

          <button
            key={photo.docId}
            className="cursor-pointer z-5"
            type="button"
            title="toggle Single Post Viewer"
            onClick={() => handleToggleSinglePostViewer()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {handleToggleSinglePostViewer()}
                }
              }
            >
              <img src={photo.imageSrc} alt={photo.caption} />
            </button>




            {toggleSinglePostViewer ? (
   
            <>
         
           <button type="button" onClick={() => handleToggleSinglePostViewer()} className="z-25 bg-black-light fixed w-full h-full top-0 left-0 opacity-50"> 
             </button>
            <SinglePostViewer photo={photo} profile={profile} toggleSinglePostViewer={toggleSinglePostViewer} />
     
                  
            </>
            ) : ( null)
              }
          
        </>
  
  )
}



