import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { 
    readExcelData,
    getTimeDomainData,
    getFrequencyDomainData,
    getVelocityData,
    getEnergyData,
    getAmplitudeData
} from '../CalFunction/ReadData.js';

const BaseChart = () => {
  const chartRef = useRef(null);
  const [frequencyDomain, setFrequencyDomain] = useState([]);
  const [velocity,setVelocity] = useState([]) // 速度
  const [mainFrequency,setMainFrequency] = useState([])  // 主频频次
  const [amplitude,setAmplitude] = useState([])  // 幅值
  const [energy,setEnergy] = useState([])  // 能量

  useEffect(() => {
    // 读取频域数据
    async function handleFrequencyDomain() {
      try {
        const result = (await readExcelData())
          .map(row => [row[0] * 40000000, row[1] * 1000]); // 将每个子数组的第一个元素乘以 1000000

        setFrequencyDomain(result);
      } catch (error) {
        console.error('错误:', error);
      }
    }
    handleFrequencyDomain();
    // 计算速度
    // async function handleVelocity() {
    //   try {
    //     const result = await getVelocityData();
    //     setVelocity(result);
    //     console.warn('sudu',result);
    //   } catch (error) {
    //     console.error('错误:', error);
    //   }
    // }
    // handleVelocity();

    //计算能量
    async function handleEnergy() {
      try {
        const result = await getEnergyData();
        setEnergy([[5,result]]);
        console.warn('能量',result);
      } catch (error) {
        console.error('错误:', error);
      }
    }
    handleEnergy();

    // 计算幅值
    async function handleAmplitude() {
      try {
        const result = await getAmplitudeData();
        setAmplitude(result);
        console.warn('fuzhi',result)
      } catch (error) {
        console.error('错误:', error);
      }
    }
    handleAmplitude();
  }, []);

  useEffect(() => {
    if (frequencyDomain.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: [
        { text: '时域图', left: '20%', top: '5%' },
        { text: '频域图', left: '70%', top: '5%' },
        { text: '频域幅值', left: '20%', top: '40%' },
        { text: '能量', left: '70%', top: '40%' },
        { text: '速度', left: '20%', top: '75%' },
        { text: '主频频次', left: '70%', top: '75%' }
      ],
      grid: [
        { left: '5%', top: '10%', width: '40%', height: '20%' }, // 时域图
        { left: '55%', top: '10%', width: '40%', height: '20%' }, // 频域图
        { left: '5%', top: '45%', width: '40%', height: '20%' }, // 幅值
        { left: '55%', top: '45%', width: '40%', height: '20%' }, // 能量
        { left: '5%', top: '80%', width: '40%', height: '15%' }, // 速度
        { left: '55%', top: '80%', width: '40%', height: '15%' }  // 主频频次
      ],
      tooltip: {
        trigger: 'axis', // 鼠标悬停时显示横纵坐标
        formatter: (params) => {
          const point = params[0];
          return `X: ${point.data[0]}<br>Y: ${point.data[1]}`;
        },
        axisPointer: {
          type: 'cross', // 显示十字准星
        },
      },
      xAxis: [
        { gridIndex: 0, type: 'value', name: '时间(s)', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 1, type: 'value', name: '频率(Hz)', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 2, type: 'value', name: '时间(day)', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 3, type: 'value', name: '时间(day)', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 4, type: 'value', name: '时间(day)', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 5, type: 'value', name: '时间(day)', nameLocation: 'middle', nameGap: 25 }
      ],
      yAxis: [
        { gridIndex: 0, type: 'value', name: 'V', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 1, type: 'value', name: 'V', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 2, type: 'value', name: 'V', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 3, type: 'value', name: 'V²', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 4, type: 'value', name: 'm/s', nameLocation: 'middle', nameGap: 25 },
        { gridIndex: 5, type: 'value', name: 'kHz', nameLocation: 'middle', nameGap: 25 }
      ],
      series: [
        {
          name: '时域信号',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          smooth: true,
          data: frequencyDomain
        },
        {
          name: '频域信号',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: []
        },
        {
          name: '幅值变化',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: [[5,5],[10]]
        },
        {
          name: '能量分布',
          type: 'bar',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: [...energy,[10]]
        },
        {
          name: '速度分布',
          type: 'line',
          xAxisIndex: 4,
          yAxisIndex: 4,
          data: [[5,10],[10]]
        },
        {
          name: '主频频次',
          type: 'line',
          xAxisIndex: 5,
          yAxisIndex: 5,
          data: [[5,10],[10]]
        }
      ]
    };

    chart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', () => {
      chart.resize();
    });

    return () => {
      chart.dispose();
      window.removeEventListener('resize', () => {
        chart.resize();
      });
    };
  }, [frequencyDomain,energy]);

  return (
    
    <div
      style={{
        position: 'relative', // 确保伪元素定位正确
        padding: '20px', // 添加内边距
        // backgroundColor: '#0e1a2b', // 深色背景
        width: '100%',
        height: '100%',
      }}
    >
      {/* 蓝色四角边框 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // 防止边框影响内部交互
        }}
      >
        {/* 左上角 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderTop: '2px solid #00ffff', // 蓝色边框
            borderLeft: '2px solid #00ffff',
          }}
        />
        {/* 右上角 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderTop: '2px solid #00ffff',
            borderRight: '2px solid #00ffff',
          }}
        />
        {/* 左下角 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderBottom: '2px solid #00ffff',
            borderLeft: '2px solid #00ffff',
          }}
        />
        {/* 右下角 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderBottom: '2px solid #00ffff',
            borderRight: '2px solid #00ffff',
          }}
        />
      </div>


      {/* 图表渲染区域 */}
      <div
      ref={chartRef}
      style={{
        width: '100%',
        height: 'calc(100% - 50px)', // 留出标题栏的空间
        marginTop: '50px',
      }}
      />
    </div>
  );
};

export default BaseChart;