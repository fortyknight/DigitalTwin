import React, { useState } from 'react';
import { Card } from 'antd';
import { Row, Col, Statistic } from 'antd';


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
const contentListNoTitle = {
  r1: <div><Row gutter={16}>
  <Col span={6}>
    <Statistic title="模式" value={'jog'} />
  </Col>
  <Col span={6}>
    <Statistic title="状态" value={'关机'}  />
  </Col>
  <Col span={6}>
    <Statistic title="开机时间" value={''}  />
  </Col>
  <Col span={6}>
    <Statistic title="使用时间" value={''}  />
  </Col>
</Row></div>,
  r2: <div><Row gutter={16}>
  <Col span={6}>
    <Statistic title="模式" value={'jog'} />
  </Col>
  <Col span={6}>
    <Statistic title="状态" value={'关机'}  />
  </Col>
  <Col span={6}>
    <Statistic title="开机时间" value={''}  />
  </Col>
  <Col span={6}>
    <Statistic title="使用时间" value={''}  />
  </Col>
</Row></div>,
  r3: <div><Row gutter={16}>
  <Col span={6}>
    <Statistic title="模式" value={'jog'} />
  </Col>
  <Col span={6}>
    <Statistic title="状态" value={'关机'}  />
  </Col>
  <Col span={6}>
    <Statistic title="开机时间" value={''}  />
  </Col>
  <Col span={6}>
    <Statistic title="使用时间" value={''}  />
  </Col>
</Row></div>,
agv:<div><Row gutter={16}>
<Col span={6}>
  <Statistic title="模式" value={'jog'} />
</Col>
<Col span={6}>
  <Statistic title="状态" value={'关机'}  />
</Col>
<Col span={6}>
  <Statistic title="开机时间" value={''}  />
</Col>
<Col span={6}>
  <Statistic title="使用时间" value={''}  />
</Col>
</Row></div>
};
const UseTime = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
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