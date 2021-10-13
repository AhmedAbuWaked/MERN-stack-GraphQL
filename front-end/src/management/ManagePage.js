import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Modal, Form, Input, notification, message } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_EVENTS, SIGN_UP } from '../queries';
import { observer } from 'mobx-react-lite';
import Calender from './Calender';
import { useStore } from '../store/RootStore';

const ManagePage = observer(({ history }) => {
  const { authStore } = useStore();
  useEffect(() => {
    console.log(
      '🚀 ~ file: ManagePage.js ~ line 12 ~ ManagePage ~ store',
      authStore
    );
  }, [authStore]);
  const [addingPatientVisibility, setAddingPatientVisibility] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');

  const [addUser, { loading }] = useMutation(SIGN_UP);
  const { data } = useQuery(GET_ALL_EVENTS);

  const addNewPatient = async () => {
    let patientData = {};
    // patientData._id = Math.random().toString();
    patientData.name = patientName;
    patientData.email = patientEmail;
    patientData.password = patientPassword;
    patientData.type = 'patient';

    try {
      await addUser({
        variables: patientData
      });
      setAddingPatientVisibility(false);
      notification.success({
        message: 'Patient Has Been Added'
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  if (!authStore.user) {
    return <Redirect to='/' />;
  }
  if (authStore.user.userType === 'patient') {
    return <Redirect to='/patient' />;
  }

  return (
    <div>
      {authStore.user.userType === 'secretary' && (
        <Button type='primary' onClick={() => setAddingPatientVisibility(true)}>
          Add Patient
        </Button>
      )}
      <Link to='/manage/patients'>Patients Info</Link>
      <Button
        type='link'
        onClick={() => {
          authStore.setUser({});
          history.replace('/');
        }}
      >
        logout
      </Button>
      <Calender
        events={data?.getEvents.map((item) => ({
          ...item,
          _days: []
        }))}
      />
      <Modal
        title='Adding New Patient'
        visible={addingPatientVisibility}
        onOk={addNewPatient}
        onCancel={() => {
          setAddingPatientVisibility(false);
        }}
        okText='Add Patient'
        confirmLoading={loading}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input onChange={(e) => setPatientName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input onChange={(e) => setPatientEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            onChange={(e) => setPatientPassword(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </div>
  );
});

export default ManagePage;
