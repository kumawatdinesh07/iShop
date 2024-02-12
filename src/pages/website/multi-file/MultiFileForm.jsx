/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'

function MultiFileForm() {

  const [name, setName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setSelectedFiles(e.target.files);
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const formHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    formData.append("name", name);
    console.log(formData);
  }

  return (
    <div className="container mx-auto my-8">
      <form className="max-w-lg mx-auto" encType='multipart/form-data' onSubmit={formHandler}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input onChange={(e) => {
            setName(
              {
                name: e.target.value
              }
            )
          }}
            name="name"
            type="text"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input
          name='images'
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            setImages({
              files: e.target.files
            })
          }}
          className="mt-1 mb-4 p-2 border rounded-md"
        />

        {
          images.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Uploaded Images</label>
              <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                  images.map(
                    (image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 p-1 px-2 bg-red-600 rounded-tr text-white opacity-75 group-hover:opacity-100"
                        >
                          X
                        </button>
                      </div>
                    )
                  )
                }
              </div>
            </div>
          )}

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default MultiFileForm