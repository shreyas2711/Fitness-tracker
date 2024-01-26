import './App.css';
import Navbar from './components/NavbarComp';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateActivity from './pages/CreateActivity';
import CreateNutrition from './pages/CreateNutrition';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />   
     {/* <ProtectedRoute path="/home" element={<Home/>}  /> */}
       
  
      <Route path='/home' element={<Home/>} />   
      <Route path='/createactivity' element={<CreateActivity/>} />   
      <Route path='/createnutrition' element={<CreateNutrition/>} />   
  
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
