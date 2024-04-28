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
import { Decoration6 ,Decoration11,BorderBox8} from '@jiaminghi/data-view-react'
import { ScrollBoard,Decoration5 } from '@jiaminghi/data-view-react';
import { Input, Radio, Space,ConfigProvider } from 'antd';
import LocationTable from "./chart/locationTable";
import UseTime from "./chart/useTime";

import { title } from "@jiaminghi/data-view-react/lib/index-fcdce9c7";

import React, {  createRef } from 'react';



const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());


  const [showModel, setShowModel] = useState(true);

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
            formatter: () => '4',
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
      const base = +new Date(2014, 9, 3);
      const oneDay = 24 * 3600 * 1000;
      const date = [];

      const data = [];
      const values = [Math.random() * 150];
      let now = new Date(base);

      function addData(shift) {
        const item = {};
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
        item.date = now;
        item.value = (Math.random() - 0.4) * 10 + values[values.length - 1];
        values.push(item.value);
        now = new Date(+new Date(now) + oneDay);
        data.push(item);
      }

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

      let init = true;
      intervalId = setInterval(function () {
        if (init) { // 第一次载入数据
          for (let i = 1; i < 100; i++) {
            addData();
          }
          init = false;
        }
        addData();
        newChart.changeData(data); // 动态更新数据
      }, 700);
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
        { type: '智能相机', value: 10 },
      ];

      const piePlot = new Pie(piecontainerRef.current, {
        appendPadding: 10,
        data,
        height:280,
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
      const base = +new Date(2014, 9, 3);
      const oneDay = 24 * 3600 * 1000;
      const data = [];
      const values1 = [Math.random() * 150];
      const values2 = [Math.random() * 150];
      const values3 = [Math.random() * 150];
      let now = new Date(base);

      function addData() {
        const item = {
          date: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          value1: (Math.random() - 0.4) * 10 + values1[values1.length - 1],
          value2: (Math.random() - 0.4) * 10 + values2[values2.length - 1],
          value3: (Math.random() - 0.4) * 10 + values3[values3.length - 1],
        };
        values1.push(item.value1);
        values2.push(item.value2);
        values3.push(item.value3);
        now = new Date(+new Date(item.date) + oneDay);
        data.push(item);
      }

      // 创建图表
      const newChart = new G2.Chart({
        container: lineChartContainerRef.current,
        width: 500, // 宽度自适应
        height: 200,
        seriesField: 'category',
      });
      // 声明字段度量类型

      newChart.source(data);
      newChart.tooltip({
        crosshairs: {
          type: 'line',
        },
      });
      newChart.legend({
        layout: 'horizontal',
        position: 'bottom',
        title: 'aa',
        itemName: 'a',
      });
      newChart.line().position('date*value1').color('#1979C9').size(3);
      newChart.line().position('date*value2').color('#D62A0D').size(3);
      newChart.line().position('date*value3').color('#FAB527').size(3);
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
      }, 700);
    }

    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, []);
  const [warnData, setWarnData] = useState([]);
  useEffect(() => {
    
        //  ('list数据',res.Data);
       setWarnData([[`${currentTime.getFullYear()}/${
                        currentTime.getMonth() + 1
                      }/${currentTime.getDate()}-${currentTime.getHours()}时${currentTime.getMinutes()}分${currentTime.getSeconds()}秒`,'行1列1', '行1列2', '行1列3','a','a'],
       ['行1列1', '行1列2', '行1列3','a','a'],
       ['行1列1', '行1列2', '行1列3','a','a'],['行1列1', '行1列2', '行1列3','a','a'],
       ['行12列1', '行1列2', '行1列3','a','a'],
       ['行21列1', '行1列2', '行1列3','a','a']
      ])
      

  }, []);
  const config = {
    header: ['时间','PLC', '取料机器人', '打标机器人','货架机器人','AGV'],
    data: warnData,
    evenRowBGC: ['#021950'], // 偶数行
    oddRowBGC: ['#000a3b'], // 奇数行
    headerHeight: 55, // 表头高度
    width:'900px',
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
<Decoration5 style={{width: '300px', height: '40px',marginTop:'-50px',marginLeft:'880px'}} />
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
          <h2  ><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >设备数据量</Decoration11></h2>
          <div style={{marginTop:'-260px',marginLeft:'50px'}}><div ref={chartContainerRef}></div></div>
         
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
        <h2  ><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >设备数据量占比</Decoration11></h2>
          <div style={{marginTop:'-10px',marginLeft:'80px'}}><div ref={piecontainerRef} id="container"></div>
      </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
        <h2  ><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >设备情况</Decoration11></h2>
          <UseTime></UseTime>

          <div class="panel-footer"> </div>
        </div>
      </div>

        <div class="column">

        <div class="no">
          <div class="no-hd">

          <button class="edge"><a href="http://39.105.125.118/" target="_blank"><span class="button-text">云端管理系统</span></a></button>
          
          <div ref={containerRef}></div>
          <button class="cloud">边端管理系统</button>
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
  <br/>
</div>
<div style={{marginTop:'0px'}}>
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
          <BorderBox8 style={{marginTop:'-300px',height:'300px'}}> <ScrollBoard config={config} style={{ width: '800px', height: '250px', paddingTop: '25px',paddingLeft:'80px'}}  /></BorderBox8>
        </div>


{/* <div class="glass-container" id="glass" ></div> */}

      <div class="column">
        <div class="panel bar2">

          <h2><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >设备坐标</Decoration11></h2>
          
           
          <div  style={{marginTop:'-180px',marginLeft:'20px'}}><div ref={lineChartContainerRef}></div><Radio.Group onChange={onChange} value={value} style={{marginTop:'80px'}}>
      
      <ConfigProvider
    theme={{
      components: {
        Radio: {
          borderRadius: 2,
        buttonColor:'#FFFFFF',
        radioSize:20,
        buttonSolidCheckedColor:'#FFFFFF'
        },
      },
    }}
  >
<Space direction="vertical">
    <Radio value={1}><span style={{ color: 'white'}}> 轴位置</span></Radio>
        <Radio value={2}><span style={{ color: 'white'}}> 末端坐标</span></Radio>
        </Space>
  </ConfigProvider>

    </Radio.Group></div>
          <div class="panel-footer"></div>

        </div>
        <div class="panel line2">
        <h2><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >设备坐标</Decoration11></h2>
          
          <div class="chart"> 
          <div style={{marginTop:'60px',width:'500px',marginLeft:'30px'}}><LocationTable choose={value}></LocationTable> </div></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
        <h2><Decoration11 style={{width: '220px', height: '60px',marginLeft:'160px'}} >货物情况</Decoration11></h2>
          

          <div class="panel-footer"></div>
        </div>
      </div>
      </section>

  </body>

  </>
  );
}

export default App;