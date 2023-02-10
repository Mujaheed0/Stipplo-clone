import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import {Link} from 'react-router-dom'
function Header({setShowSideBar}) {
  return (
   <div className="flex  p-6  sticky top-0 z-10 shadow-md   bg-gray-50 items-center md:justify-end justify-between  z">
   <Button  onClick={()=>setShowSideBar(true)} className="md:hidden flex items-center "><MenuOutlined></MenuOutlined></Button>
  
      {false ? (
        <div className={`flex flex-row flex-wrap justify-center items-center gap-6`}>
          <Link
            to="sign-up"
            onClick={()=>{}}
            className="text-lg "
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className={`flex flex-row flex-wrap justify-center items-center gap-6`}>
          <Link to="/login" className="text-lg">
            Sign In
          </Link>
          <Link to="sign-up" className="text-lg">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
