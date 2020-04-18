import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Button } from 'antd';
import {signUp} from '../../../store/actions/authActions'
import { connect } from 'react-redux'

function SignUp(props) {
  const {modalSignupVisible, close, openLogin} = props
  const [visible, setVisible] = useState(modalSignupVisible)
  const [loading, setLoading] =  useState(false)
  const [formData, setFormData] = useState({
    username: ``,
    password: ``
  })
  useEffect(() => {
    setVisible(modalSignupVisible)
  }, [modalSignupVisible])


  const handleSave = () => {
    props.signUp(formData)
    // close();
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <Modal
        title="Sign Up"
        visible={visible}
        onOk={handleSave}
        onCancel={close}
        footer={[
            <Button key="back" onClick={close}>
              Close
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleSave}>
              Save
            </Button>,
          ]}
    >

        <Form layout="vertical" name="nest-messages" onFinish={handleSave} validateMessages={validateMessages}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input name="username" value={formData.username} onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password name="password" value={formData.password} onChange={handleChange}/>
            </Form.Item>
        </Form>
        Already have a account <a onClick={openLogin}>login now!</a>
    </Modal>
  );
}



const mapStateToProps = null

const mapDispatchToProps = {
  signUp
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
