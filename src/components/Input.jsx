import { Button, Input } from "antd";
import React, { useState } from "react";
import { SearchOutlined,CloseOutlined } from "@ant-design/icons";
function InputForm({ setFilterSearch }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Input 
       
        allowClear=     {{clearIcon:<CloseOutlined onClick={()=>{setFilterSearch('');setSearchValue('');}}></CloseOutlined>}}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="rounded-r-none outline-none"
        placeholder="Search for any job"
      ></Input>
      <Button
        onClick={() => setFilterSearch(searchValue)}
        className="bg-blue-400 rounded-l-none border-transparent items-center flex text-white h-full rounded-r-lg"
      >
        <SearchOutlined className=""></SearchOutlined>
      </Button>
    </>
  );
}

export default InputForm;
