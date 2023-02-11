import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
function Header({ setShowSideBar }) {
  return (
    <div className="flex  p-6  sticky top-0 z-10 shadow-md   bg-gray-50 items-center md:justify-end justify-between  z">
      <Button
        onClick={() => setShowSideBar(true)}
        className="md:hidden flex items-center "
      >
        <MenuOutlined></MenuOutlined>
      </Button>
    </div>
  );
}

export default Header;
