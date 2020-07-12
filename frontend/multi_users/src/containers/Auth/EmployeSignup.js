import React from 'react';
import { Select } from 'antd';

import * as actions from '../../store/actions/employeauth';
import {
  Form,
  Input,
  Button
} from 'antd';

import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onAuth(
        values.username,
        values.email,
        values.password,
        values.confirm,
        values.first_name,
        values.last_name,
        values.phone_number,
        values.designation,
        )

    props.history.push('/')
    console.log('Received values of form: ', values);
  };

  
//   const [autoCompleteResult, setAutoCompleteResult] = useState([]);


  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
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
        label="First name"
        name="first_name"
        rules={[
        {
            required: true,
            message: 'Please input your firstname!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        label="last name"
        name="last_name"
        rules={[
        {
            required: true,
            message: 'Please input your last name!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        label="phone_number"
        name="phone_number"
        rules={[
        {
            required: true,
            message: 'Please input your phone_number!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        label="designation"
        name="designation"
        rules={[
        {
            required: true,
            message: 'Please input your Designation!',
        },
        ]}
    >
        <Input />
    </Form.Item>

      <Form.Item
        name="email"
        label="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Select defaultValue="Customer" style={{ width: 200 }} onChange={handleChange}>
          <OptGroup label="userType">
              <Option value="Customer">Customer</Option>
            </OptGroup>
    </Select>, */}

      <Form.Item
        name="password"
        label="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
            <Button type="primary" htmlType="submit">
            Signup
            </Button>
            <br />
            <br />
            <NavLink style={{marginRight:'10px'}} to='/login/' >
                Login
            </NavLink>
        </Form.Item>
    </Form>
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
        onAuth : (username, email,password1,password2,first_name,last_name,phone_number,designation,is_customer=false,is_employee=true) => dispath(actions.authSignup(username, email,password1,password2,first_name,last_name,phone_number,designation,is_customer=false,is_employee=true))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationForm)