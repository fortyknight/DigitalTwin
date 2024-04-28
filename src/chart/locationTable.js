import React from 'react';
import { Table,ConfigProvider } from 'antd';

const columns_1 = [
  { title: '设备名称', dataIndex: 'name' },
  { title: 'X', dataIndex: 'x' },
  { title: 'Y', dataIndex: 'y' },
  { title: 'Z', dataIndex: 'z' },
  { title: 'A', dataIndex: 'a' },
];

const columns_2 = [
  { title: '设备名称', dataIndex: 'name' },
  { title: 'C1', dataIndex: 'C1' },
  { title: 'C2', dataIndex: 'C2' },
  { title: 'C3', dataIndex: 'C3' },
  { title: 'C4', dataIndex: 'C4' },
];

const LocationTable = ({ choose }) => {
  const columnsToUse = choose === 2 ? columns_1 : columns_2;

  const data = [
    { name: '取料机器人', x: 2, y: 1 ,z:1,a:3,b:1,c:1},
    { name: '打标机器人', x: 2, y: 1 ,z:1,a:3,b:1,c:1},
    { name: '货架机器人', x: 2, y: 1 ,z:1,a:3,b:1,c:1},
    // Add more data items as needed
  ];

  return (
    <>
    <ConfigProvider
    theme={{
      components: {
        Table: {
            headerBg:'#00BAFF',
            bodySortBg:"#00BAFF",
            borderColor:'#00BAFF',
    rowHoverBg:'#000a3b',
    colorBgContainer: 'transparent',
    colorText: 'white',
    headerColor:'white'

            
        },
      },
    }}
  >
 <Table columns={columnsToUse} dataSource={data} size="small" />
  </ConfigProvider>
     
    </>
  );
};

export default LocationTable;
