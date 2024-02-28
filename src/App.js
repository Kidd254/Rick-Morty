import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import ResidentDetails from './components/ResidentDetails';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="/resident-details/:residentId" element={<ResidentDetails />} />
      <Route path="/note-form/:residentId" element={<NoteForm />} />
    </Routes>
  );
}

export default App;
