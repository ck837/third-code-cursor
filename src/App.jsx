import { useState } from 'react'
import reactLogo from './assets/seulogo.png'
import './App.css'
import { Flex, Layout, Select, Tag } from 'antd';
import ThreeD from './components/ThreeD';
import Dashboard from './components/Dashboard';
import back3 from './assets/back3.png'; 

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 80,
  lineHeight: '80px',
  fontSize: '24px',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
};

const logoImageStyle = {
  height: '70px'
};

const contentStyle = {
  padding: '16px',
  backgroundColor: 'transparent',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  color: '#fff',
};

const siderStyle = {
  backgroundColor: 'transparent',
  padding: '16px',
  color: '#fff',
  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.2)',
};

const layoutStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 0,
  overflow: 'hidden',
  backgroundColor: 'transparent',
};

const dropdownStyle = {
  backgroundColor: '#1f2d3d',
  color: '#ffffff',
  border: '1px solid #3a4a5f',
};
const customOptionStyle = {
  color: '#ffffff', // 设置选项文字颜色
  fontSize: '18px' 
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0e1a2b, #1f3b4d)', // 深蓝色渐变背景
        overflow: 'hidden',
      }}
    >
      {/* 动态科技感效果 */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(14, 26, 43, 0.5), transparent 70%)', // 深蓝色光晕效果
          animation: 'rotateBackground 20s linear infinite', // 动态旋转背景
        }}
      />
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <div style={logoStyle}>
          <img src={reactLogo} style={logoImageStyle} alt="React Logo" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
          压电监测系统
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Select
            defaultValue="sensor2"
            dropdownStyle={dropdownStyle}
            options={[
              { value: 'sensor1', label: <span style={customOptionStyle}>传感器#1</span> },
              { value: 'sensor2', label: <span style={customOptionStyle}>传感器#2</span> },
              { value: 'sensor3', label: <span style={customOptionStyle}>传感器#3</span> },
              { value: 'sensor4', label: <span style={customOptionStyle}>传感器#4</span> },
              { value: 'sensor5', label: <span style={customOptionStyle}>传感器#5</span> },
            ]}
          />
          <Select
            defaultValue="today"
            dropdownStyle={dropdownStyle}
            options={[
              { value: 'today', label: <span style={customOptionStyle}>2025-03-24</span> },
              { value: 'week', label: <span style={customOptionStyle}>2025-03-26</span> },
              { value: 'month', label: <span style={customOptionStyle}>2025-03-28</span> },
            ]}
          />
        </div>
      </Header>
      <Layout style={layoutStyle}>
        <Sider width="40%" style={siderStyle}>

          <ThreeD />
        </Sider>
        <Content style={contentStyle}>
          {/* 标题栏
          <div
            style={{
              // position: 'absolute',
              // marginTop: '10px',
              marginLeft: '50%',
              marginBottom: '10px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #007bff, #00ffff)', // 蓝色渐变背景
              color: '#ffffff', // 白色文字
              padding: '5px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            111
          </div> */}
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
    </div>
  )
}

export default App
