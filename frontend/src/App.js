import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreateActivity from './pages/CreateActivity';
import CreateNutrition from './pages/CreateNutrition';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />   
      <Route path='/signup' element={<SignUp/>} />   
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
