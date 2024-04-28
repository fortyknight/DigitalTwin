import React, { useState } from 'react';
import { Card } from 'antd';
import { Row, Col, Statistic } from 'antd';


const tabListNoTitle = [
  {
    key: 'article',
    label: '取料机器人',
  },
  {
    key: 'app',
    label: '打标机器人',
  },
  {
    key: 'project',
    label: '货架机器人',
  },
  {
    key: 'agv',
    label: 'AGV',
  },
];
const contentListNoTitle = {
  article: <div><Row gutter={16}>
  <Col span={6}>
    <Statistic title="设备名称" value={112893} />
  </Col>
  <Col span={6}>
    <Statistic title="状态" value={112893} precision={2} />
  </Col>
  <Col span={6}>
    <Statistic title="开机时间" value={112893} precision={2} />
  </Col>
  <Col span={6}>
    <Statistic title="使用时间" value={112893} precision={2} />
  </Col>
</Row></div>,
  app: <p>app content</p>,
  project: <p>project content</p>,
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
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
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