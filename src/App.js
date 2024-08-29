import "./App.css";
import { Model } from "./Model";
import { Shuilunji } from "./Shuilunji";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Area } from '@antv/g2plot';
import { useEffect, useState, useRef } from "react";
import { Gauge, G2 } from '@antv/g2plot';
import { Pie } from '@antv/g2plot';
import { Line } from '@antv/g2plot';
import { Decoration6, Decoration11, BorderBox8 } from '@jiaminghi/data-view-react'
import { ScrollBoard, Decoration5 } from '@jiaminghi/data-view-react';
import { Input, Radio, Space, ConfigProvider, Tooltip } from 'antd';
import LocationTable from "./chart/locationTable";
import UseTime from "./chart/useTime";

import {
  ArrowDownOutlined,
  QuestionCircleTwoTone
} from '@ant-design/icons';
import { title } from "@jiaminghi/data-view-react/lib/index-fcdce9c7";

import React, { createRef } from 'react';




const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());


  const [showModel, setShowModel] = useState(true);
  const [deviceNumber, setDeviceNumber] = useState('4');

  const toggleModel = () => {
    setShowModel(!showModel);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const gauge = new Gauge(containerRef.current, {
        height: 100,
        percent: 0.75,
        range: {
          color: 'l(0) 0:#B8E1FF 1:#3D76DD',
        },
        startAngle: Math.PI,
        endAngle: 2 * Math.PI,
        indicator: null,
        statistic: {
          title: {
            offsetY: -36,
            style: {
              fontSize: '36px',
              color: '#4B535E',
            },
            formatter: () => deviceNumber,
          },
          content: {
            style: {
              fontSize: '24px',
              lineHeight: '44px',
              color: '#4B535E',
            },
            formatter: () => '在线设备',
          },
        },
      });

      gauge.render();

      return () => {
        gauge.destroy();
      };
    }
  }, [containerRef]);

  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    let intervalId; // 保存定时器的ID

    if (chartContainerRef.current && !chart) {
      const now = new Date(); // 获取当前时间
      const date = [];
      const data = [];

      // 创建图表
      const newChart = new G2.Chart({
        container: chartContainerRef.current,
        width: 500, // 宽度自适应
        height: 260,
      });

      // 声明字段度量类型
      newChart.source(data);
      newChart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      newChart.line().position('date*value').color('#f80').size(3);
      newChart.area().position('date*value').color('#f80');
      newChart.render();

      setChart(newChart);

      intervalId = setInterval(function () {
        const item = {};
        const currentTime = new Date(now.getTime() + (data.length * 1000)); // 计算当前时间
        item.date = currentTime.toLocaleTimeString(); // 格式化时间，只显示时间部分
        item.value = Math.round(Math.max(0, (Math.random() - 0.4) * 10 + (data.length > 0 ? data[data.length - 1].value : 0))); // 确保值不为负数
        data.push(item);
        newChart.changeData(data); // 动态更新数据
      }, 1000); // 每秒更新一次
    }

    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, []); // 移除依赖，确保只在组件挂载时执行一次
  const piecontainerRef = useRef(null);

  useEffect(() => {
    if (piecontainerRef.current) {
      const data = [
        { type: '取料机器人', value: 27 },
        { type: '打标机器人', value: 25 },
        { type: '货架机器人', value: 18 },
        { type: 'AGV', value: 15 },
      ];

      const piePlot = new Pie(piecontainerRef.current, {
        appendPadding: 10,
        data,
        height: 280,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [{ type: 'element-active' }],
      });

      piePlot.render();
      setInterval(() => {
        piePlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
      }, 1200);
      return () => {
        piePlot.destroy();
      };
    }
  }, []);

  const lineChartContainerRef = useRef(null);
const [lineChart, setLineChart] = useState(null);

useEffect(() => {
  let intervalId; // 保存定时器的ID

  if (lineChartContainerRef.current && !lineChart) {
    const oneSecond = 1000;
    const data = [];

    const values1 = [Math.floor(Math.random() * 150)]; // 取整
    const values2 = [Math.floor(Math.random() * 150)]; // 取整
    const values3 = [Math.floor(Math.random() * 150)]; // 取整
    

    let now = new Date();

    function addData() {
      const item = {
        time: now.toLocaleTimeString(),
        value1: Math.max(0, (Math.random() - 0.2) * 50 + values1[values1.length - 1]), // 限制变化范围并确保非负
        value2: Math.max(0, (Math.random() - 0.2) * 50 + values2[values2.length - 1]), // 限制变化范围并确保非负
        value3: Math.max(0, (Math.random() - 0.2) * 50 + values3[values3.length - 1]), // 限制变化范围并确保非负
      };
      item.value1 = Math.round(item.value1/10);
      item.value2 = Math.round(item.value2/10);
      item.value3 = Math.round(item.value3/10);

      values1.push(item.value1);
      values2.push(item.value2);
      values3.push(item.value3);
      now = new Date(now.getTime() + oneSecond);
      data.push(item);
    }

    // 创建图表
    const newChart = new G2.Chart({
      container: lineChartContainerRef.current,
      width: 500, // 宽度自适应
      height: 200,
    });

    // 声明字段度量类型
    newChart.data(data);
    newChart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });
    newChart.legend({
      layout: 'horizontal',
      position: 'bottom',
    });
    newChart.line().position('time*value1').color('#1979C9').size(3);
    newChart.line().position('time*value2').color('#D62A0D').size(3);
    newChart.line().position('time*value3').color('#FAB527').size(3);
    newChart.render();

    setLineChart(newChart);

    let init = true;
    intervalId = setInterval(function () {
      if (init) {
        // 第一次载入数据
        for (let i = 1; i < 100; i++) {
          addData();
        }
        init = false;
      }
      addData();
      newChart.changeData(data); // 动态更新数据
    }, oneSecond);
  }

  return () => {
    clearInterval(intervalId); // 在组件卸载时清除定时器
  };
}, []);
  const [warnData, setWarnData] = useState([]);
  useEffect(() => {

    //  ('list数据',res.Data);
    setWarnData([[`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds()}秒`, '正常', '正常', '正常', '正常', '正常'],
    [`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds() - 1}秒`, '正常', '正常', '正常', '正常', '正常'],
    [`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds() - 2}秒`, '正常', '正常', '正常', '正常', '正常'],
    [`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds() - 3}秒`, '正常', '正常', '正常', '正常', '正常'],
    [`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds() - 4}秒`, '正常', '正常', '正常', '正常', '正常'],
    [`${currentTime.getFullYear()}/${currentTime.getMonth() + 1
      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds() - 5}秒`, '正常', '正常', '正常', '正常', '正常']
    ])


  }, []);
  const config = {
    header: ['时间', 'PLC', '取料机器人', '打标机器人', '货架机器人', 'AGV'],
    data: warnData,
    evenRowBGC: ['#021950'], // 偶数行
    oddRowBGC: ['#000a3b'], // 奇数行
    headerHeight: 55, // 表头高度
    width: '900px',
    columnWidth: [200]
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <body>
        <header>
          <h1>
            <div class="neon">数据可视化</div></h1>
          <Decoration5 style={{ width: '300px', height: '40px', marginTop: '-50px', marginLeft: '820px' }} />
          <div class="show-time">
            当前时间：
            {currentTime.getFullYear()}年
            {currentTime.getMonth() + 1}月
            {currentTime.getDate()}日-
            {currentTime.getHours()}时
            {currentTime.getMinutes()}分
            {currentTime.getSeconds()}秒
          </div>
        </header>


        <section class="mainbox">

          <div class="column">
            <div class="panel bar">
              <h2  ><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >设备数据量</Decoration11></h2>
              <div style={{ marginTop: '-10px', marginLeft: '50px' }}><div ref={chartContainerRef}></div></div>

              <div class="panel-footer"></div>
            </div>
            <div class="panel line">
              <h2  ><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >设备数据量占比</Decoration11></h2>
              <div style={{ marginTop: '-10px', marginLeft: '80px' }}><div ref={piecontainerRef} id="container"></div>
              </div>
              <div class="panel-footer"></div>
            </div>
            <div class="panel pie">
              <h2  ><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >设备情况</Decoration11></h2>
              <UseTime></UseTime>

              <div class="panel-footer"> </div>
            </div>
          </div>

          <div class="column">

            <div class="no">
              <div class="no-hd">

                <button class="edge"><a href="http://localhost:8002/" target="_blank"><span class="button-text">云端管理系统</span></a></button>

                <div ref={containerRef}></div>
                <button class="cloud"> <a href="http://localhost:8003/" target="_blank"><span class="button1-text">边端管理系统</span></a></button>
              </div>
            </div>
            <div class="map">
              <div class="buttons" >
                <button class="blob-btn" onClick={toggleModel}>
                  场景切换
                  <span class="blob-btn__inner">
                    <span class="blob-btn__blobs">
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                    </span>
                  </span>
                </button>
                <br />
              </div>
              <div style={{ marginTop: '0px' }}>
                <Canvas camera={{ fov: 64, position: [200, 700, 200] }}>
                  {/* 调整光源的位置 */}
                  <ambientLight intensity={5} position={[-2, 2, 2]} />
                  {/* 添加一个点光源 */}
                  <pointLight intensity={1} position={[5, 5, 5]} />
                  <OrbitControls enableZoom={true} />
                  {/* 根据状态决定展示哪个模型 */}
                  {showModel ? <Model /> : <Shuilunji />}
                </Canvas>
              </div>
            </div>
            <BorderBox8 style={{ marginTop: '-300px', height: '300px' }}> <ScrollBoard config={config} style={{ width: '800px', height: '250px', paddingTop: '20px', paddingLeft: '90px' }} /></BorderBox8>
          </div>


          {/* <div class="glass-container" id="glass" ></div> */}

          <div class="column">
            <div class="panel bar2">

              <h2><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >设备坐标</Decoration11></h2>


              <div style={{ marginTop: '20px', marginLeft: '20px' }}><div ref={lineChartContainerRef}></div><Radio.Group onChange={onChange} value={value} style={{ marginTop: '80px' }}>

                <ConfigProvider
                  theme={{
                    components: {
                      Radio: {
                        borderRadius: 2,
                        buttonColor: '#FFFFFF',
                        radioSize: 20,
                        buttonSolidCheckedColor: '#FFFFFF'
                      },
                    },
                  }}
                >
                  <Space direction="vertical">
                    <Radio value={1}><span style={{ color: 'white' }}> 轴位置</span></Radio>
                    <Radio value={2}><span style={{ color: 'white' }}> 末端坐标</span></Radio>
                  </Space>
                </ConfigProvider>

              </Radio.Group></div>
              <div class="panel-footer"></div>

            </div>
            <div class="panel line2">
              <h2><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >设备坐标</Decoration11></h2>

              <div class="chart">
                <div style={{ marginTop: '40px', width: '500px', marginLeft: '30px' }}><LocationTable choose={value} setDeviceNumber={setDeviceNumber}></LocationTable> </div></div>
              <div class="panel-footer"></div>
            </div>
            <div class="panel pie2">
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <h2><Decoration11 style={{ width: '220px', height: '60px', marginLeft: '160px' }} >数字孪生场景</Decoration11></h2>
                {/* <Tooltip title="该视频由大模型生成" color={'blue'} key={'blue'}>
                  <QuestionCircleTwoTone style={{ fontSize: '30px', color: '#08c', marginTop: '10px' }} />
                </Tooltip> */}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* <img
                  alt="example"
                  src={require('./image.png')}
                  width="auto"
                  height="30px"
                  style={{ marginTop: '10px' }}
                />
                <ArrowDownOutlined style={{ fontSize: '30px', color: '#08c', marginBottom: '0px' }} /> */}
                <video
                  width="100%"
                  height="auto"
                  controls
                  style={{
                    maxHeight: '220px',
                    objectFit: 'contain',
                  }}
                >
                  <source src={require('./display.mp4')} type="video/mp4" />
                </video>
              </div>
              <div class="panel-footer"></div>
            </div>
          </div>
        </section>

      </body>

    </>
  );
}

export default App;