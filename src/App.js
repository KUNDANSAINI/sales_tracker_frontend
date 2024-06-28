import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Component/Auth/Login';
import Signin from './Component/Admin/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashbord from './Component/Admin/AdminDashbord';
import Service from './Component/Admin/Service';
import AddService from './Component/Admin/AddService';
import ServiceUpdate from './Component/Admin/ServiceUpdate';
import PrivateRoute from './Component/Admin/PrivateRoute';
import UserPrivateRoute from './Component/User/UserPrivateRoute';
import Empolyee from './Component/Admin/Empolyee';
import EmpolyeeUpdate from './Component/Admin/EmpolyeeUpdate';
import ViewEmpolyee from './Component/Admin/ViewEmpolyee';
import TaskUpdate from './Component/Admin/TaskUpdate';
import UserService from './Component/User/UserService';
import UserTask from './Component/User/UserTask';

function App() {



  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/createaccount' element={<PrivateRoute element={<Signin/>}/>}/>
        <Route path='/admin/dashbord' element={<PrivateRoute element={<AdminDashbord/>}/>}/>
        <Route path='/admin/service' element={<PrivateRoute element={<Service/>}/>}/>
        <Route path='/admin/addservice' element={<PrivateRoute element={<AddService/>}/>}/>
        <Route path='/admin/serviceupdate/:id' element={<PrivateRoute element={<ServiceUpdate/>}/>}/>
        <Route path='/admin/employee' element={<PrivateRoute element={<Empolyee/>}/>}/>
        <Route path='/admin/employeeupdate/:id' element={<PrivateRoute element={<EmpolyeeUpdate/>}/>}/>
        <Route path='/admin/viewempolyee/:id' element={<PrivateRoute element={<ViewEmpolyee/>}/>}/>
        <Route path='/admin/taskupdate/:id' element={<PrivateRoute element={<TaskUpdate/>}/>}/>
        <Route path='/dashbord' element={<UserPrivateRoute element={<UserService/>}/>}/>
        <Route path='/usertask' element={<UserPrivateRoute element={<UserTask/>}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
