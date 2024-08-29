import React, { useState, useEffect } from 'react';
import { Table, ConfigProvider } from 'antd';
import axios from 'axios';

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

const LocationTable = ({ choose,setDeviceNumber }) => {
  const columnsToUse = choose === 2 ? columns_1 : columns_2;
  const [pickdata, setPickData] = useState([]);
  const [markdata, setMarkData] = useState([]);
  const [warehousedata, setWarehouseData] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchData, 5000); // 每秒执行一次fetchData

    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/potsition');
      setMarkData(response.data.data[0].Marking[0]);
      setPickData(response.data.data[0].Picking[0]);
      setWarehouseData(response.data.data[0].Warehousing[0]);
      setDeviceNumber('4')
    } catch (error) {
      console.error(error);
    }
  };

  const data = [];

  if (pickdata.length !== 0) {
    data.push({
      name: '取料机器人',
      x: pickdata.end_position.X,
      y: pickdata.end_position.Y,
      z: pickdata.end_position.Z,
      a: pickdata.end_position.A,
      b: pickdata.end_position.B,
      c: pickdata.end_position.C,
      C1: pickdata.joint_position.C1,
      C2: pickdata.joint_position.C2,
      C3: pickdata.joint_position.C3,
      C4: pickdata.joint_position.C4,
    });
  }

  if (markdata.length !== 0) {
    data.push({
      name: '打标机器人',
      x: markdata.end_position.X,
      y: markdata.end_position.Y,
      z: markdata.end_position.Z,
      a: markdata.end_position.A,
      b: markdata.end_position.B,
      c: markdata.end_position.C,
      C1: markdata.joint_position.C1,
      C2: markdata.joint_position.C2,
      C3: markdata.joint_position.C3,
      C4: markdata.joint_position.C4,
    });
  }

  if (warehousedata.length !== 0) {
    data.push({
      name: '货架机器人',
      x: warehousedata.end_position.X,
      y: warehousedata.end_position.Y,
      z: warehousedata.end_position.Z,
      a: warehousedata.end_position.A,
      b: warehousedata.end_position.B,
      c: warehousedata.end_position.C,
      C1: warehousedata.joint_position.C1,
      C2: warehousedata.joint_position.C2,
      C3: warehousedata.joint_position.C3,
      C4: warehousedata.joint_position.C4,
    });
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#00BAFF',
            bodySortBg: '#00BAFF',
            borderColor: '#00BAFF',
            rowHoverBg: '#000a3b',
            colorBgContainer: 'transparent',
            colorText: 'white',
            headerColor: 'white',
          },
        },
      }}
    >
      <Table columns={columnsToUse} dataSource={data} size="small" />
    </ConfigProvider>
  );
};

export default LocationTable;
