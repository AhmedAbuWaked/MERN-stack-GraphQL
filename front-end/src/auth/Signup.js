import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Select } from 'antd';
import { SIGN_UP } from '../queries';

const { Option } = Select;

const Signup = ({ history }) => {
  const userType = localStorage.getItem('user');

  const [addUser, { loading, error, data }] = useMutation(SIGN_UP);

  const onFinish = async (values) => {
    values._id = Math.random().toString();

    try {
      await addUser({
        variables: values
      });
    } catch (error) {
      console.log('🚀 ~ file: Login.js ~ line 18 ~ onFinish ~ error', error);
    }
    if (!loading && !error) history.push('/');
  };

  useEffect(() => {
    console.log('🚀 ~ file: Signup.js ~ line 12 ~ Signup ~ loading', loading);
    console.log('🚀 ~ file: Signup.js ~ line 12 ~ Signup ~ error', error);
    console.log('🚀 ~ file: Signup.js ~ line 12 ~ Signup ~ data', data);
  }, [data, error, loading]);

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
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
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
        <Form.Item name='type' label='Type' rules={[{ required: true }]}>
          <Select placeholder='Select type' allowClear>
            <Option value='doctor'>Doctor</Option>
            <Option value='secretary'>Secretary</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
