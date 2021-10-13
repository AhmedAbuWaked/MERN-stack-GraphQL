import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './auth.scss';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = observer(({ history }) => {
  const [loginUser, { loading, data }] = useMutation(LOGIN);
  const userType = localStorage.getItem('user');

  const onFinish = async (values) => {
    try {
      const user = await loginUser({ variables: values });
      console.log('🚀 ~ file: Login.js ~ line 14 ~ onFinish ~ test', user);

      localStorage.setItem('user', user?.data?.loginUser?.type);
      localStorage.setItem('userId', user?.data?.loginUser?._id);

      if (user?.data?.loginUser?.type === 'patient') {
        return history.replace('/patient');
      }
      return history.replace('/manage');
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (userType && userType === 'patient') {
    return <Redirect to='/patient' />;
  }
  if (userType && (userType === 'doctor' || 'secretary')) {
    return <Redirect to='/manage' />;
  }

  return (
    <div className='auth-container'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Login;