import React from 'react'

import * as actions from '../../store/actions/auth';

import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin } from 'antd';

import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = (props) => {
  const onFinish = values => {
      props.onAuth(values.username, values.password)
    // console.log('Success:', values);
    props.history.push('/')
  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div>
        {
            props.loading ?
            <LoadingOutlined style={{ fontSize: 24 }} spin />
            :
            <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Login
                </Button>
                <br />
                <br />
                <NavLink style={{marginRight:'10px'}} to='/signup-customer/' >
                    SignUp as Customer
                </NavLink>
                <NavLink style={{marginRight:'10px'}} to='/signup-employee/' >
                    SignUp as Employee
                </NavLink>
            </Form.Item>
            </Form>
}
    </div>
  );
};


const mapStateToProps = (state) => {
    return {
        loading:state.loading,
        error:state.error
    }
}

const mapDispatchToProps = dispath => {
    return {
        onAuth : (username,password) => dispath(actions.authLogin(username,password))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Demo)
