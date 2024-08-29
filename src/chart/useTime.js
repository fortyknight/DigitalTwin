import React, { useState,useEffect } from 'react';
import { Card } from 'antd';
import { Row, Col, Statistic } from 'antd';
import axios from 'axios';


const tabListNoTitle = [
  {
    key: 'r1',
    label: '取料机器人',
  },
  {
    key: 'r2',
    label: '打标机器人',
  },
  {
    key: 'r3',
    label: '货架机器人',
  },
  {
    key: 'agv',
    label: 'AGV',
  },
];


const UseTime = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const [robotState,setRobotState] = useState('关机')
  const [startTime, setStartTime] = useState(null);
  const [usageTime, setUsageTime] = useState('');
  const [agvState,setagvState] = useState('关机')
  const [agvstartTime, setagvStartTime] = useState(null);
  const [agvusageTime, setagvUsageTime] = useState('');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/potsition');
        setRobotState('开机');
        const currentTime = new Date();
        setStartTime(currentTime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // seconds elapsed
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        setUsageTime(`${hours}小时 ${minutes}分钟 ${seconds}秒`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/agv');
        setagvState('开机');
        const currentTime = new Date();
        setagvStartTime(currentTime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (agvstartTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // seconds elapsed
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        setagvUsageTime(`${hours}小时 ${minutes}分钟 ${seconds}秒`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);
  const contentListNoTitle = {
    r1: <div><Row gutter={16}>
    <Col span={6}>
      <Statistic title="模式" value={'jog'} />
    </Col>
    <Col span={6}>
      <Statistic title="状态" value={robotState}  />
    </Col>
    <Col span={6}>
      <Statistic title="开机时间" value={startTime ? startTime.toLocaleTimeString() : ''}  />
    </Col>
    <Col span={6}>
      <Statistic title="使用时间" value={usageTime}  />
    </Col>
  </Row></div>,
    r2: <div><Row gutter={16}>
    <Col span={6}>
      <Statistic title="模式" value={'jog'} />
    </Col>
    <Col span={6}>
      <Statistic title="状态" value={robotState}  />
    </Col>
    <Col span={6}>
      <Statistic title="开机时间" value={startTime ? startTime.toLocaleTimeString() : ''}  />
    </Col>
    <Col span={6}>
      <Statistic title="使用时间" value={usageTime}  />
    </Col>
  </Row></div>,
    r3: <div><Row gutter={16}>
    <Col span={6}>
      <Statistic title="模式" value={'jog'} />
    </Col>
    <Col span={6}>
      <Statistic title="状态" value={robotState}  />
    </Col>
    <Col span={6}>
      <Statistic title="开机时间" value={startTime ? startTime.toLocaleTimeString() : ''}  />
    </Col>
    <Col span={6}>
      <Statistic title="使用时间" value={usageTime}  />
    </Col>
  </Row></div>,
  agv:<div><Row gutter={16}>
  <Col span={6}>
    <Statistic title="模式" value={'jog'} />
  </Col>
  <Col span={6}>
    <Statistic title="状态" value={agvState}  />
  </Col>
  <Col span={6}>
    <Statistic title="开机时间" value={agvstartTime ? agvstartTime.toLocaleTimeString() : ''}  />
  </Col>
  <Col span={6}>
    <Statistic title="使用时间" value={agvusageTime}  />
  </Col>
  </Row></div>
  };
  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop:'30px'
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default UseTime;