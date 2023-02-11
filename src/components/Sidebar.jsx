import { MenuOutlined } from "@ant-design/icons";
import React from "react";

function Sidebar({ show, setShowSideBar }) {
  return (
    <div
      className={`md:relative md:top-0 md:left-64 w-64 ${
        show ? "translate-x-0 z-30" : "-translate-x-full"
      } transition-transform ease-in-out  fixed top-0 bg-slate-600  text-white h-full  flex flex-shrink-0 flex-col p-4`}
    >
      <div className=""></div>
      <div className="text-white font-bold text-3xl flex mb-3 items-center px-1 ">
        jobtrack
      </div>
      <div className="links_container mt-10 ">
        <div className=" flex items-center w-full  mb-5 px-2 gap-2">
          <span class=" bg-blue-400 h-6 w-7  rounded-full text-sm flex justify-center items-center ">
            M
          </span>{" "}
          <span className="w-full flex justify-center font-bold">
            Mujaheed Hussain
          </span>
        </div>

        <div className="flex flex-col gap-3 justify-items-center list-none">
          <li className=" flex items-center gap-5   w-full py-2 rounded-md font-bold hover:font-bold px-3 bg-blue-300 ">
            <MenuOutlined className=" material-symbols-outlined flex justify-center text-sm items-center pl-3" />
            <span className="flex justify-center items-center font-medium">
              Boards
            </span>
          </li>{" "}
          {/* <li className=" flex items-center gap-5 hover:bg-gray-400 w-full py-2 rounded-md hover:font-bold  px-3">
            <FileTextOutlined className="material-symbols-outlined flex justify-center text-sm items-center pl-3" />
            <span className="flex justify-center items-center font-medium">
              Documents
            </span>
          </li>
          <li className=" flex items-center gap-5 hover:bg-gray-400 w-full py-2 rounded-md hover:font-bold  px-3">
            <WechatOutlined className="material-symbols-outlined flex justify-center text-sm items-center pl-3" />
            <span className="flex justify-center items-center font-medium">
              Interviews
            </span>
          </li> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
