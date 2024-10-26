
import Footer from './components/Footer';
import Nav from './components/Nav';
import '../src/App.css'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ShowProduct from './components/showproduct';
import { BrowserRouter, Routes,Route  } from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import ProfileComponent from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
     <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/product" element={<ShowProduct/>}>

      </Route>

      <Route path="/add" element={<AddProduct/>}>

      </Route>

      <Route path="/update/:id" element={<UpdateProduct/>}>

      </Route>
      <Route path="/logout" element={<h1>
        <center>
        Thanks, visit again
        </center>
        
        
      </h1>}>

      </Route>
      <Route path="/profile" element={<ProfileComponent/>}>




      </Route>

      </Route>

      <Route path="/SignUp" element={<SignUp/>}>

      </Route>

      <Route path="/login" element={<Login/>}>

</Route>







     </Routes>

     
      </BrowserRouter>
      <Footer/>
      
      
    </div>
  );
};

export default App;
