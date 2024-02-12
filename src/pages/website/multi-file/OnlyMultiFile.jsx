import React, { useState } from 'react'
import axios from "axios"

function OnlyMultiFile() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`image`, selectedFiles[i]);
    }
    
    formData.append('name', name);
    formData.append('email', email);

    await axios.post("http://localhost:5000/upload/create", formData)
      .then(
        (success) => {
          console.log(success);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    // try {
    //   await axios.post("http://localhost:5000/upload/create", formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('Files uploaded successfully');
    // } catch (error) {
    //   console.error('Error uploading files:', error);
    // }
  };
  return (
    <form action="" onSubmit={handleUpload}>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            name='name'
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            name='email'
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Files:</label>
          <input
            name='images'
            type="file"
            multiple
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        // onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </form>
  )
}

export default OnlyMultiFile