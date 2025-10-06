import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fabric } from 'fabric';
import { saveCanvas, loadCanvas, createCanvasDoc } from '../config/firebase';

function CanvasEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  
  const [tool, setTool] = useState('select');
  const [color, setColor] = useState('#ff6b6b');
  const [textValue, setTextValue] = useState('Hello World');
  const [isSaved, setIsSaved] = useState(true);
  const [loading, setLoading] = useState(true);

  // Initialize Fabric.js canvas
  useEffect(() => {
    console.log('Initializing Fabric.js canvas for ID:', id);
    
    // Cleanup any existing canvas first
    if (fabricCanvasRef.current) {
      console.log('Disposing existing canvas...');
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    if (!canvasRef.current) {
      console.error('Canvas element not found!');
      return;
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Initialize canvas with the canvas element
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: '#f6f5f5ff',
        width: 1620,
        height: 500,
        selection: true
      });

      fabricCanvasRef.current = canvas;
      console.log('Fabric canvas created:', canvas);

      // Track changes
      canvas.on('object:modified', () => setIsSaved(false));
      canvas.on('object:added', () => {
        console.log('Object added event triggered');
        setIsSaved(false);
      });
      canvas.on('object:removed', () => setIsSaved(false));

      // Load existing canvas data
      loadCanvasData(canvas);
    }, 50);

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      const activeObject = fabricCanvasRef.current?.getActiveObject();
      if ((e.key === 'Delete' || e.key === 'Backspace') && activeObject) {
        fabricCanvasRef.current?.remove(activeObject);
        fabricCanvasRef.current?.requestRenderAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [id]);

  // Load canvas from Firestore
  const loadCanvasData = async (canvas) => {
    try {
      setLoading(true);
      const data = await loadCanvas(id);
      if (data) {
        const canvasToLoad = canvas || fabricCanvasRef.current;
        canvasToLoad.loadFromJSON(data, () => {
          canvasToLoad.requestRenderAll();
          setIsSaved(true);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading canvas:', error);
      setLoading(false);
    }
  };

  // Handle drawing mode
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (tool === 'pen') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = 3;
    } else {
      canvas.isDrawingMode = false;
    }
  }, [tool, color]);

  // Add rectangle
  const addRectangle = () => {
    if (!fabricCanvasRef.current) {
      console.error('Canvas not initialized');
      return;
    }
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 150,
      height: 100,
      fill: color,
      stroke: '#000',
      strokeWidth: 2
    });
    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    fabricCanvasRef.current.renderAll();
    console.log('Rectangle added:', rect);
    setTool('select');
  };

  // Add circle
  const addCircle = () => {
    if (!fabricCanvasRef.current) {
      console.error('Canvas not initialized');
      return;
    }
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 60,
      fill: color,
      stroke: '#000',
      strokeWidth: 2
    });
    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    fabricCanvasRef.current.renderAll();
    console.log('Circle added:', circle);
    setTool('select');
  };

  // Add text
  const addText = () => {
    if (!fabricCanvasRef.current) {
      console.error('Canvas not initialized');
      return;
    }
    const text = new fabric.Textbox(textValue, {
      left: 200,
      top: 200,
      width: 250,
      fontSize: 24,
      fill: color
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
    console.log('Text added:', text);
    setTool('select');
  };

  // Change color of selected object
  const changeColor = (newColor) => {
    setColor(newColor);
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject && activeObject.set) {
      activeObject.set('fill', newColor);
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Delete selected object
  const deleteSelected = () => {
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.remove(activeObject);
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Bring to front
  const bringForward = () => {
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.bringForward(activeObject);
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Send to back
  const sendBackward = () => {
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.sendBackwards(activeObject);
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Save canvas to Firestore
  const handleSave = async () => {
    try {
      const json = JSON.stringify(fabricCanvasRef.current.toJSON());
      await saveCanvas(id, json);
      setIsSaved(true);
      alert('Canvas saved successfully! ✅');
    } catch (error) {
      console.error('Error saving canvas:', error);
      alert('Failed to save canvas. Please try again.');
    }
  };

  // Create new canvas
  const handleNewCanvas = async () => {
    try {
      const newCanvasId = await createCanvasDoc();
      navigate(`/canvas/${newCanvasId}`);
    } catch (error) {
      console.error('Error creating new canvas:', error);
      alert('Failed to create new canvas. Please try again.');
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>Canvas Editor</h2>
        <p>
          Canvas ID: <strong>{id}</strong>
          <span className={`status-indicator ${isSaved ? 'status-saved' : 'status-unsaved'}`}>
            {isSaved ? '✓ Saved' : '● Unsaved'}
          </span>
        </p>
      </div>

      <div className="toolbar">
        <button onClick={() => setTool('select')} style={{ opacity: tool === 'select' ? 1 : 0.7 }}>
          Select
        </button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => setTool('pen')} style={{ opacity: tool === 'pen' ? 1 : 0.7 }}>
          Pen (Draw)
        </button>
        
        <input
          type="color"
          value={color}
          onChange={(e) => changeColor(e.target.value)}
          title="Fill Color"
        />
        
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Text content"
        />
        
        <button className="delete-btn" onClick={deleteSelected}>
          Delete
        </button>
        <button onClick={bringForward}>Bring Forward</button>
        <button onClick={sendBackward}>Send Backward</button>
        
        <button className="save-btn" onClick={handleSave}>
          Save Canvas
        </button>
        <button className="new-canvas-btn" onClick={handleNewCanvas}>
          New Canvas
        </button>
      </div>

      <div className="canvas-wrapper">
        {loading && <div className="loading">Loading canvas data...</div>}
        <canvas ref={canvasRef} key={id} />
      </div>
    </div>
  );
}

export default CanvasEditor;
