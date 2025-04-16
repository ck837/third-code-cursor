import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';


const BaseChart = ({ title, data, chartKey }) => {
  const chartRef = useRef(null);


  useEffect(() => {
    if (data.length === 0) return;

    const chart = echarts.init(chartRef.current);

     const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          color: '#00ffff', // 高级蓝色标题
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '20%',
        bottom: '15%',
        containLabel: true,
        show: false, // 隐藏网格背景
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          lineStyle: {
            color: '#00ffff', // 高级蓝色指示线
          },
        },
      },
      xAxis: {
        type: 'value',
        name: '时间 (s)',
        nameTextStyle: {
          color: '#ffffff', // 白色坐标轴名称
        },
        axisLine: {
          lineStyle: {
            color: '#00ffff', // 高级蓝色坐标轴线
          },
        },
        axisLabel: {
          color: '#ffffff', // 白色坐标轴标签
        },
        splitLine: {
          show: false, // 隐藏网格线
        },
      },
      yAxis: {
        type: 'value',
        name: '幅值 (V)',
        nameTextStyle: {
          color: '#ffffff', // 白色坐标轴名称
        },
        axisLine: {
          lineStyle: {
            color: '#00ffff', // 高级蓝色坐标轴线
          },
        },
        axisLabel: {
          color: '#ffffff', // 白色坐标轴标签
        },
        splitLine: {
          show: false, // 隐藏网格线
        },
      },
      series: [
        {
          name: '频域信号',
          type: chartKey === 3 ? 'bar' : 'line',
          // smooth: true,
          data: data,
          lineStyle: {
            color: chartKey === 3 ? '#00ffff' : '#00aaff', // 柱状图和折线图不同颜色
            width: 2,
          },
          areaStyle: {
            color: 'rgba(0, 255, 255, 0.1)', // 半透明填充区域
          },
          symbol: chartKey <= 2 ? 'none' : 'circle', // 禁用上方两张图的数据点标记
        }
      ],
    };
    

    chart.setOption(option);

    // 响应式调整
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, title]);

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px',
        // backgroundColor: '#0e1a2b',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%',
        height: '330px', 
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
      }}
    >
      {/* 图表渲染区域 */}
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default BaseChart;