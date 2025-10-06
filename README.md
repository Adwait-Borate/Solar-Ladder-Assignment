# Canva2D - Simple 2D Canvas Editor

A lightweight, web-based canvas editor built with React, Fabric.js, and Firebase Firestore. Create, edit, and save canvas designs with shapes, text, and freehand drawing.

## 🚀 Features

- **Home Page**: Landing page with "Create New Canvas" button
- **Canvas Editor**: Full-featured editor with Fabric.js
  - Add rectangles, circles, and text
  - Pen tool for freehand drawing
  - Move, resize, rotate objects
  - Delete objects (Delete key or button)
  - Change colors of selected objects
  - Bring forward / send backward
  - Real-time save status indicator
- **Firebase Integration**: Save and load canvas designs using Firestore
- **URL-based Canvas**: Each canvas has unique ID in URL (`/canvas/:id`)

## 📁 Project Structure

```
canvas-editor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomePage.jsx       # Landing page
│   │   ├── CanvasEditor.jsx   # Main editor component
│   │   └── Router.jsx         # React Router setup
│   ├── config/
│   │   └── firebase.js        # Firebase configuration & helpers
│   ├── App.jsx                # Main App component
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables (create this)
├── .env.example              # Environment template
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

- **React** 18.2.0 - UI library
- **Fabric.js** 5.3.0 - Canvas manipulation
- **Firebase** 10.7.0 - Firestore database
- **React Router** 6.20.0 - Client-side routing
- **Vite** 5.0.5 - Build tool & dev server

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier works fine)

## 🔧 Setup Instructions

### Step 1: Clone/Download Project

The project files are already in your directory:
```
C:\Users\ADWAIT P BORATE\Desktop\Canva2D
```

### Step 2: Install Dependencies

Open PowerShell and run:

```powershell
cd 'C:\Users\ADWAIT P BORATE\Desktop\Canva2D'
npm install
```

### Step 3: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Add a web app:
   - Click the web icon (</>) on project overview
   - Register app with a nickname (e.g., "Canva2D")
   - Copy the configuration object

4. Enable Firestore:
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Start in **test mode** (for development)
   - Choose a location
   - Click "Enable"

### Step 4: Configure Environment Variables

Create a `.env` file in the project root:


Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Replace** the values with your actual Firebase config from Step 3.

### Step 5: Run Development Server

```powershell
npm run dev
```

The app will open automatically at `http://localhost:5173`

## 🎯 Usage

1. **Create Canvas**: Click "Create New Canvas" on home page
2. **Add Shapes**: Use toolbar buttons to add rectangles, circles, or text
3. **Draw**: Click "Pen (Draw)" to enable freehand drawing
4. **Edit**: Select objects to move, resize, rotate
5. **Change Colors**: Select object, then use color picker
6. **Delete**: Select object and press Delete/Backspace or click Delete button
7. **Save**: Click "💾 Save Canvas" button
8. **Load**: Open same URL again to continue editing

## 🔑 Keyboard Shortcuts

- `Delete` or `Backspace` - Delete selected object

## 📦 Build for Production

```powershell
npm run build
```

Build output will be in `dist/` folder.

## 🚀 Deployment

### Option 2: Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard: Settings → Environment Variables

## 📝 Assignment Requirements Checklist

✅ Home page with "Create New Canvas" button
✅ Creates Firestore document and navigates to `/canvas/:id`
✅ Canvas editor with Fabric.js
✅ Add rectangles, circles, text, and pen tool
✅ Move, resize, rotate, delete objects
✅ Edit text and colors of selected objects
✅ Save button to persist to Firestore
✅ Load canvas when opening same URL
✅ Clean component architecture
✅ Proper React hooks usage
✅ Firebase Firestore integration
✅ URL-based routing with canvas IDs
