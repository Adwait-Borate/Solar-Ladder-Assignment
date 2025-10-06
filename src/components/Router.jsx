import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CanvasEditor from './CanvasEditor';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/canvas/:id" element={<CanvasEditor />} />
    </Routes>
  );
}

export default Router;
