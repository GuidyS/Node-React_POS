import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import StaffDashboard from './pages/StaffDashboard';
import FoodPage from './pages/FoodPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaffDashboard />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
        <Route path="/foodpage" element={<FoodPage />} />
      </Routes>
    </Router>
  );
}

export default App;
