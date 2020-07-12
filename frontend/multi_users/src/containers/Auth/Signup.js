import React from 'react';

import * as actions from '../../store/actions/auth';
import {
  Form,
  Input,
  Button
} from 'antd';

import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';


const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onAuth(
        values.username,
        values.email,
        values.password,
        values.confirm
        )

    props.history.push('/')
    // console.log('Received values of form: ', values);
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
        name="email"
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

      <Form.Item
        name="password"
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
        onAuth : (username, email,password1,password2) => dispath(actions.authSignup(username,email,password1,password2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationForm)