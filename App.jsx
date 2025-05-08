import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CallLogs from './pages/CallLogs'; // ✅ Make sure the path is correct
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/call-logs" element={<CallLogs />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

