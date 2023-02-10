import Boards from "./components/Boards";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "antd/dist/reset.css";
import Board from "./components/Board";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="flex h-screen">
      <div
        onClick={() => setShowSideBar(false)}
        className={
          `absolute  transition-all ease-in-out overflow-y-hidden  bg-black h-full w-full z-20` +
          ` ${
            showSideBar
              ? "opacity-30 "
              : "opacity-0 -translate-x-full -translate-y-full"
          }  `
        }
      ></div>

      <Sidebar show={showSideBar} setShowSideBar={setShowSideBar}></Sidebar>
      <div className="flex flex-col w-full h-full overflow-x-hidden  bg-gray-50">
        <Header setShowSideBar={setShowSideBar}></Header>
        <Routes>
          
        <Route path="board/:boardId" element={<Board></Board>}> </Route>
          <Route path="/" element={<Boards></Boards>}></Route>
        </Routes>
      </div>
    </div>
  );
}
