import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"
import GridViewIcon from '@mui/icons-material/GridView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', background: '#333', color: 'white', padding: '20px', height:"100vh" }}>
        {/* <h3 style={{marginBottom:30}}>Dashboard</h3> */}
        <img   style={{ objectFit: 'contain', width:"70%",  height: 'auto' }}   src={logo} alt='logo' />

        <hr style={{width:"100%",}}/>
       
      <ul style={{ listStyle: 'none', padding: 0 }}>
      <div style={{display:"flex", gap:5, cursor:"pointer", marginBottom:"20px"}}>
      <GridViewIcon />
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
        </div>
        <div style={{display:"flex" ,gap:5, marginBottom:10}}>
      <ViewModuleIcon />  <li><Link  to="/view-registration" style={{ color: 'white', textDecoration: 'none' }}>View Registration</Link></li>
        </div>
        <div style={{display:"flex",gap:5}}>
   <LogoutIcon />   <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link></li>
   </div>
      </ul>

    </div>
  );
};

export default Sidebar;
