import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
import Calender from '../management/Calender';
import { GET_PATIENT_EVENTS } from '../queries';
import { useStore } from '../store/RootStore';

const Patient = ({ history }) => {
  const { authStore } = useStore();
  const user = authStore.user;
  const { data } = useQuery(GET_PATIENT_EVENTS, {
    variables: { id: user.userId }
  });

  if (!user) {
    return <Redirect to='/' />;
  }
  if (user.userType !== 'patient') {
    return <Redirect to='/manage' />;
  }
  return (
    <div>
      <Button
        type='link'
        onClick={() => {
          authStore.setUser({});
          history.replace('/');
        }}
      >
        Logout
      </Button>
      <Calender
        isPatient
        events={data?.getPatientEvents.map((item) => ({
          ...item,
          _days: []
        }))}
      />
    </div>
  );
};

export default Patient;
