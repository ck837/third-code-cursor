import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Flex, Layout, Select, Tag } from 'antd';
import ThreeD from './components/ThreeD';
import BaseChart from './components/BaseChart';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 70,
  paddingInline: 48,
  lineHeight: '64px',
  // backgroundColor: '#4096ff',
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
  height: '32px'
};

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '1200px',
  height: '800px',
  maxWidth: '100%',
};


function App() {
  const [count, setCount] = useState(0)

  return (
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div style={logoStyle}>
            <img src={reactLogo} style={logoImageStyle} alt="React Logo" />
            <img src={viteLogo} style={logoImageStyle} alt="Vite Logo" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Select
              defaultValue="sensor2"
              style={{ width: 120 }}
              options={[
                { value: 'sensor1', label: '传感器#1' },
                { value: 'sensor2', label: '传感器#2' },
                { value: 'sensor3', label: '传感器#3' },
                { value: 'sensor4', label: '传感器#4' },
                { value: 'sensor5', label: '传感器#5' },
              ]}
            />
            <Select
              defaultValue="today"
              style={{ width: 120 }}
              options={[
                { value: 'today', label: '2025-03-24' },
                { value: 'week', label: '2025-03-26' },
                { value: 'month', label: '2025-03-28' },
              ]}
            />
          </div>
        </Header>
        <Layout>
          <Sider width="30%" style={siderStyle}>
            <ThreeD />
          </Sider>
          <Content style={contentStyle}>
            <BaseChart/>
          </Content>
        </Layout>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
  )
}

export default App
