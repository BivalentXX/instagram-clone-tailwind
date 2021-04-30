import React, { useState } from 'react';
import firebase from 'firebase';
// import { Button, Input } from '@material-ui/core';
import { storage, db } from "../lib/firebase.js"

export default function PostUploader({ user }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const [successToast, setSuccessToast] = useState(false)

  //toast notifcation upon succesful upload
  

  const handleChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };

  const handleUpload = () => {  
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round( 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            if (progress = 100) {setSuccessToast(true)}
        }, 
        (error) => {
            console.log(error);
            alert(error.message);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  db.collection("photos").add({
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      dateCreated: Date.now(),
                      caption: caption,
                      imageSrc: url,
                      userId: user.userId,
                      likes: [],
                      comments: []
                  });
                  
                  setProgress(0);
                  setCaption("");
                  setImage(null)

              })
        }
        
      )
      }

      return (
      <>
    <div className="py-4 text-left px-6 rounded col-span-4 border bg-white border-gray-primary">

      <div className="flex justify-between items-center pb-3 mb-12">
        <p className="text-2xl font-bold">Share a photo on your Timeline!</p>
      </div>

      <div className="mb-12 flex content-center mx-auto flex justify-center">
        <div>
        <input className="mx-auto" type="file" onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <div className>
          <progress value={progress} max="100"/>
          <p className="text-xs ml-4">upload progress bar....</p>
        </div>
        <input className="pl-4" type="text" placeholder="Enter a caption" value={caption} 
          onChange={event => setCaption(event.target.value)} />
          <button class="bg-blue-medium hover:bg-blue-dark font-bold text-sm rounded text-white w-20 h-8" onClick={handleUpload}>
            Upload
          </button>
        </div>
        {successToast ? ( <button
        class="btn-fade-in bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mr-2 transition-all duration-500 ease-in-out">2: Fade
        in image</button>
        ) : (null)}
  
    </div>

    </>
    )
}

    
