import React, { useContext, useEffect } from 'react'
import { Context } from '../../MainContext'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  // const {admin} = useContext(Context);
  const { admin } = useSelector(store => store.admin)
  const navigate = useNavigate();

  useEffect(
    () =>{
      if(admin === null){
        navigate("/admin/login");
      }
    },
    []
  )
  

  return (
    <div className='border shadow p-3'>
      
    </div>
  )
}

export default Header