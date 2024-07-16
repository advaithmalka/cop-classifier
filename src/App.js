import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './App.css';

// Import sample images
import sample1 from './images/sample1.jpeg';
import sample2 from './images/sample2.jpeg';
import sample3 from './images/sample3.jpeg';
import sample4 from './images/sample4.jpeg';

const SEVER_URL = 'https://advaithmalka.github.io/cop-classifier/predict'

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    setError('');
  };

  const handleUrlSubmit = () => {
    axios.get(imageUrl, { responseType: 'blob' })
      .then(response => setSelectedImage(response.data))
      .catch(error => {
        console.error('Error fetching the image:', error)
        setError('Error fetching the image');
      });
  };

  const handlePredict = () => {
    const formData = new FormData();
    formData.append('file', selectedImage);

    axios.post(SEVER_URL, formData)
      .then(response => {
        setPrediction(response.data.prediction ? "Cop" : "Not a Cop")
        setError('')
  })
      .catch(error => {
        console.error('Error predicting the image:', error)
        setError(error.toString());
      });
  };

  const handleSampleImageClick = (image) => {
    fetch(image)
    .then(res => res.blob())
    .then(blob => {
      setSelectedImage(blob)
      setError('')
    })
  };

  useEffect(() => {
    setPrediction(false)
  }, [selectedImage]); 

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Cop Car Classifier</h1>
      <p className="text-sm font-bold mb-4">By: Advaith Malka</p>
      <Dropzone onDrop={handleDrop} accept="image/jpeg, image/png">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="w-full max-w-md p-4 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer text-center">
            <input {...getInputProps()} />
            <p>Drag and drop an image, or click to select one (jpg, jpeg, png)</p>
          </div>
        )}
      </Dropzone>
      <div className="w-full max-w-md mt-4 flex">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white border border-gray-700"
        />
        <button onClick={handleUrlSubmit} className="p-2 rounded-r-lg bg-blue-600 hover:bg-blue-700 fetch-button">Fetch Image</button>
      </div>
      <div className="text-xl font-bold mt-8">Sample images</div>
      <div className="mt-4  sample-images">
        <img src={sample1} alt="Sample 1" className="cursor-pointer object-cover" onClick={() => handleSampleImageClick(sample1)} />
        <img src={sample2} alt="Sample 2" className="cursor-pointer  object-cover" onClick={() => handleSampleImageClick(sample2)} />
        <img src={sample3} alt="Sample 3" className="cursor-pointer  object-cover" onClick={() => handleSampleImageClick(sample3)} />
        <img src={sample4} alt="Sample 4" className="cursor-pointer  object-cover" onClick={() => handleSampleImageClick(sample4)} />
      </div>
      {selectedImage && (
        <div className="w-full max-w-md mt-4">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full rounded-lg" />
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 text-rose-600 rounded-lg">
          <h2 className="text-2xl font-bold">Error: {error}</h2>
        </div>
      )}
      <button onClick={handlePredict} className="mt-4 p-2 rounded-lg predict-button">Predict</button>
      {prediction && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
         <h2 className={`text-2xl font-bold`}>
            Prediction: <span className={`${prediction === "Cop" ? 'text-red-500' : 'text-green-500'}`}>
              {prediction}
            </span>
          </h2>
        </div>
      )} 
    </div>
  );
}

export default App;