// External Imports
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

// Internal Imports
import './StaffDashboard.css';
import Logo from '../assets/Component/Logo';
import MenuList from '../assets/Component/MenuList';
import MainMenu from '../assets/Component/MainMenu';

const { Header, Sider, Content } = Layout;

function StaffDashboard() {
  return (
    <Layout>
      {/* Sidebar / Sider */}
      <Sider
        className="Sidebar"
        width={220}
        breakpoint="lg"
        collapsedWidth="60"
      >
        <Logo />
        <MenuList />
      </Sider>

      {/* Main Layout */}
      <Layout className="staff-dashboard-layout">
        <Header className="staff-dashboard-header" />
        <Content className="staff-dashboard-content">
          <MainMenu />
        </Content>
      </Layout>
    </Layout>
  );
}

export default StaffDashboard;
