import { RightOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React from 'react'

function SortDropDown() {
    const items=[
        {
            key: "1",
            label: <p >Company Name</p>,
    },{
        key: "2",
        label: <p>Position Added</p>,
},{
    key: "3",
    label: <p>Oldest Added</p>,
},{
    key: "4",
    label: <p>Newest Added</p>,
}]
  return (<>
  <Dropdown items={{items}}>
   
  </Dropdown>
  </>
  )
}

export default SortDropDown