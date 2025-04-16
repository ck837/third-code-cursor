import React, { useEffect, useRef, useState } from 'react';
import BaseChart from './BaseChart.jsx';
import { readExcelData } from '../CalFunction/ReadData.js';

const Dashboard = () => {

  const [frequencyDomain, setFrequencyDomain] = useState([]);

  // 模拟数据：两边为 0，中间突起的曲线
  const simulatedData2 = Array.from({ length: 101 }, (_, x) => {
    const normalizedX = x / 100; // 将 x 归一化到 [0, 1]
    const y = Math.exp(-Math.pow(normalizedX - 0.5, 2) / 0.02); // 高斯分布
    return [x, y];
  });
  console.log('模拟数据2', simulatedData2);

  // 第三张图的模拟数据：六个点，y 值逐步下降
  const simulatedData3 = [
    [1, 0.0015],
    [2, 0.0012],
    [3, 0.0009],
    [4, 0.0006],
    [5, 0.0003],
    [6, 0.0000965],
  ];

  const simulatedData4 = [
    [1, 0.000015],
    [2, 0.00001],
    [3, 0.000005],
    [4, 0.000003],
    [5, 0.000002],
    [6, 0.000001],
  ];

  const simulatedData5 = [
    [1, 4000],
    [2, 3900],
    [3, 3500],
    [4, 3000],
    [5, 2900],
    [6, 1700],
  ];

  const simulatedData6 = [
    [1, 99],
    [2, 97],
    [3, 98],
    [4, 95],
    [5, 92],
    [6, 97],
  ];
  
  
  

  useEffect(() => {
    // 读取频域数据
    async function handleFrequencyDomain() {
      try {
        const result = (await readExcelData()).map(row => [
          row[0],
          row[1],
        ]);
        setFrequencyDomain(result);
      } catch (error) {
        console.error('错误:', error);
      }
    }
    handleFrequencyDomain();
  }, []);

  const charts = [
    { id: 1, title: '时域图' },
    { id: 2, title: '频域图' },
    { id: 3, title: '幅值(PA)' },
    { id: 4, title: '小波包能量(TWP)' },
    { id: 5, title: '速度(LWV)' },
    { id: 6, title: '主频频次(PSA)' },
  ];

  return (
    <div
    style={{
      height: '100vh', // 设置高度为视口高度
      overflow: 'auto', // 启用滚动
    }}
    className="dashboard-container" 
  >
    <div style={{ padding: '20px', backgroundColor: '#0e1a2b' }}>
      {/* 当天数据标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '20px',
            backgroundColor: '#00ffff', // 蓝色长方形
            marginRight: '10px',
          }}
        />
        <span
          style={{
            color: '#ffffff', // 白色文字
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          当天数据
        </span>
      </div>

      {/* 上方两张图表 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 两列布局
          gap: '20px',
          marginBottom: '30px',
        }}
      >
          <BaseChart key={charts[0].id} title={charts[0].title} data={frequencyDomain}/>
          <BaseChart key={charts[1].id} title={charts[1].title} data={simulatedData2} />
      </div>

      {/* 所有数据标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '20px',
            backgroundColor: '#00ffff', // 蓝色长方形
            marginRight: '10px',
          }}
        />
        <span
          style={{
            color: '#ffffff', // 白色文字
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          所有数据
        </span>
      </div>

      {/* 下方四张图表 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 两列布局
          gap: '20px',
        }}
      >
        <BaseChart key={charts[2].id} title={charts[2].title} data={simulatedData3}/>
        <BaseChart key={charts[3].id} chartKey={3}  title={charts[3].title} data={simulatedData4} />
        <BaseChart key={charts[4].id} title={charts[4].title} data={simulatedData5} />
        <BaseChart key={charts[5].id} title={charts[5].title} data={simulatedData6} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;