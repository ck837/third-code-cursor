import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { 
    readExcelData
} from '../CalFunction/ReadData.js';

const BaseChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const data = readExcelData('path/to/your/file.xlsx');
    console.warn(data);
    
    const option = {
      title: [
        { text: '时域图', left: '20%', top: '33%' },
        { text: '频域图', left: '71%', top: '33%' },
        { text: '幅值', left: '20%', top: '58%' },
        { text: '能量', left: '72%', top: '58%' },
        { text: '速度', left: '20%', top: '83%' },
        { text: '主频频次', left: '70%', top: '83%' }
      ],
      grid: [
        // 时域图
        {
          left: '5%',
          top: '5%',
          width: '40%',
          height: '20%'
        },
        // 频域图
        {
          left: '55%',
          top: '5%',
          width: '40%',
          height: '20%'
        },
        // 幅值
        {
          left: '5%',
          top: '40%',
          width: '40%',
          height: '10%'
        },
        // 能量
        {
          left: '55%',
          top: '40%',
          width: '40%',
          height: '10%'
        },
        // 速度
        {
          left: '5%',
          top: '65%',
          width: '40%',
          height: '10%'
        },
        // 主频频次
        {
          left: '55%',
          top: '65%',
          width: '40%',
          height: '10%'
        }
      ],
      // 调整分割线位置
      graphic: [{
        type: 'line',
        left: '0%',
        right: '0%',
        top: '35%',
        shape: {
          x1: 0,
          y1: 0,
          x2: '100%',
          y2: 0
        },
        style: {
          stroke: '#ccc',
          lineWidth: 1
        }
      }],
      // 这里添加每个图表的具体配置
      xAxis: [
        { 
          gridIndex: 0, 
          type: 'value', 
          name: '时间(s)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 10
        },
        { 
          gridIndex: 1, 
          type: 'value', 
          name: '频率(Hz)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 50
        },
        { 
          gridIndex: 2, 
          type: 'value', 
          name: '时间(day)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 10
        },
        { 
          gridIndex: 3, 
          type: 'value', 
          name: '时间(day)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 10
        },
        { 
          gridIndex: 4, 
          type: 'value', 
          name: '时间(day)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 10
        },
        { 
          gridIndex: 5, 
          type: 'value', 
          name: '时间(day)',
          nameLocation: 'middle',
          nameGap: 35,
          min: 0,
          max: 10
        }
      ],
      yAxis: [
        { 
          gridIndex: 0, 
          type: 'value',
          name: 'V',
          nameLocation: 'middle',
          nameGap: 25
        },
        { 
          gridIndex: 1, 
          type: 'value',
          name: 'V',
          nameLocation: 'middle',
          nameGap: 25
        },
        { 
          gridIndex: 2, 
          type: 'value',
          name: 'V',
          nameLocation: 'middle',
          nameGap: 25
        },
        { 
          gridIndex: 3, 
          type: 'value',
          name: 'V²',
          nameLocation: 'middle',
          nameGap: 25
        },
        { 
          gridIndex: 4, 
          type: 'value',
          name: 'm/s',
          nameLocation: 'middle',
          nameGap: 25
        },
        { 
          gridIndex: 5, 
          type: 'value',
          name: 'kHz',
          nameLocation: 'middle',
          nameGap: 25
        }
      ],
      series: [
        // 时域图 - 折线图
        {
          name: '时域信号',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          smooth: true,
          data: Array.from({length: 100}, (_, i) => {
            const x = i * 0.1;
            return [x, Math.sin(2 * Math.PI * x) * 3];
          })
        },
        // 频域图 - 折线图
        {
          name: '频域信号',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: Array.from({length: 50}, (_, i) => {
            const x = i;
            return [x, Math.random() * 10];
          })
        },
        // 幅值 - 折线图
        {
          name: '幅值变化',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: Array.from({length: 50}, (_, i) => {
            const x = i * 0.2;
            return [x, 5 + Math.sin(x) * 2];
          })
        },
        // 能量 - 柱状图
        {
          name: '能量分布',
          type: 'bar',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: Array.from({length: 50}, (_, i) => {
            const x = i * 0.2;
            return [x, 6 + Math.cos(x) * 2];
          })
        },
        // 速度 - 折线图
        {
          name: '速度分布',
          type: 'line',
          xAxisIndex: 4,
          yAxisIndex: 4,
          data: Array.from({length: 20}, (_, i) => {
            const x = i * 0.5;
            return [x, 10 + Math.random() * 5];
          })
        },
        // 主频频次 - 折线图
        {
          name: '主频频次',
          type: 'line',
          xAxisIndex: 5,
          yAxisIndex: 5,
          data: Array.from({length: 20}, (_, i) => {
            const x = i * 0.5;
            return [x, 12 + Math.random() * 6];
          })
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
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BaseChart;
