import React from 'react';
import '../../App.css';
import { Row, Col, Menu } from 'antd';
import {FacebookOutlined, TwitterOutlined, GooglePlusOutlined, InstagramOutlined, SearchOutlined, MenuOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";
const {SubMenu} = Menu


function Header() {
  return (
    <header>
      <Row className="header">
        <Col span={6} className="header-social">
          <FacebookOutlined />
          <TwitterOutlined />
          <GooglePlusOutlined />
          <InstagramOutlined />
        </Col>
        <Col span={12}>
          <img className="logo" src="/images/logo.png"/>
        </Col>
        <Col span={6} className="header-social">
          <SearchOutlined />
          <MenuOutlined />
        </Col>
      </Row>
      <div className="header-menu">
      <Menu  mode="horizontal">
        <Menu.Item key="1">
            
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link to="/blog/id">Single post</Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
             Pages
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="3">
         Category
        </Menu.Item>
        <Menu.Item key="4">
         About
        </Menu.Item>
        <Menu.Item key="5">
         Contact us
        </Menu.Item>
      </Menu>
      </div>
    </header>
  );
}

export default Header;
