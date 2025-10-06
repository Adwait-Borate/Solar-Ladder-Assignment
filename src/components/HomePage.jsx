import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCanvasDoc } from '../config/firebase';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateCanvas = async () => {
    try {
      setLoading(true);
      const canvasId = await createCanvasDoc();
      navigate(`/canvas/${canvasId}`);
    } catch (error) {
      console.error('Error creating canvas:', error);
      alert('Failed to create canvas. Please check your Firebase configuration.');
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Canva2D</h1>
      <p>Simple 2D Canvas Editor built with React, Fabric.js & Firebase</p>
      <button onClick={handleCreateCanvas} disabled={loading}>
        {loading ? 'Creating...' : 'Create New Canvas'}
      </button>
    </div>
  );
}

export default HomePage;
