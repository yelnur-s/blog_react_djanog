import React, {useState, useEffect} from 'react';
import '../../App.css';



import { Row, Col, Menu, Dropdown, Input } from 'antd';
import SignupModal from '../auth/signup'
import LoginModal from '../auth/login'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {FacebookOutlined, TwitterOutlined, GooglePlusOutlined, InstagramOutlined, SearchOutlined, MenuOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

import {logOut} from '../../store/actions/authActions'
import {filterArticles, getArticles, getMyArticles} from '../../store/actions/articleActions'
const {SubMenu} = Menu
const {Search} = Input

function Header(props) {
  const {isAuth} = props.authReducer

  const [modalSignupVisible, setModalSignupVisible] = useState(false)
  const [modalLoginVisible, setModalLoginVisible] = useState(false)
  const openLoginModal = () => {
    setModalLoginVisible(true)
  }

  const closeLoginModal = () => {
    setModalLoginVisible(false)
  }

  const openSignupModal = () => {
    setModalSignupVisible(true)
  }

  const closeSignupModal = () => {
    setModalSignupVisible(false)
  }

  const closeSignupOpenLogin = () => {
    closeSignupModal()
    openLoginModal()
  }
  
  const closeLoginOpenSignup = () => {
    closeLoginModal()
    openSignupModal()
  }

  const onSearch = (value) => {
    let p = 0
    if(props.location.pathname ===`/profile` && props.authReducer.currentUserId) p = props.authReducer.currentUserId
    
    value.length === 0 && p === 0 ? props.getArticles() : 
    value.length === 0  ? props.getMyArticles() : 
    props.filterArticles(value, p)
   
  }

  const onChange = (e) => onSearch(e.target.value)



  useEffect(() => {
    if(props.authReducer.signUpSuccess) {
      closeSignupOpenLogin()
    }
    if(props.authReducer.isAuth) {
      closeLoginModal()
    }

  }, [props.authReducer.signUpSuccess, props.authReducer.isAuth])
  

  const unAuthMenu = (
    <Menu>
      <Menu.Item onClick={openLoginModal}>
          Login
      </Menu.Item>
      <Menu.Item onClick={openSignupModal}>
         Sign Up
      </Menu.Item>
    </Menu>
  );
  
  const authMenu = (
    <Menu>
      <Menu.Item onClick={props.logOut}>
          Logout
      </Menu.Item>
    </Menu>
  );
  
  


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
          
          
          {/* <SearchOutlined /> */}
          <div >
          <Search
            placeholder="input search text"
            onChange={onChange}
            onSearch={onSearch}
            style={{ width: 100 }}
          />
          </div>
          <Dropdown overlay={isAuth ? authMenu : unAuthMenu} trigger={['click']}>
            <MenuOutlined />
          </Dropdown>
         
        </Col>
      </Row>
      <div className="header-menu">
      <Menu  mode="horizontal">
        <Menu.Item key="1">
            
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link to="/profile">Profile</Link>
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

      <SignupModal modalSignupVisible={modalSignupVisible} close={closeSignupModal} openLogin={closeSignupOpenLogin}/>
      <LoginModal modalLoginVisible={modalLoginVisible} close={closeLoginModal} openSignup={closeLoginOpenSignup}/>
    </header>
   
  );
}

const mapStateToProps = state => ({
  authReducer: state.authReducer
})

const mapDispatchToProps = {
  logOut,
  filterArticles,
  getArticles,
  
  getMyArticles
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
