import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
import Calender from '../management/Calender';
import { GET_PATIENT_EVENTS } from '../queries';

const Patient = ({ history }) => {
  const userId = localStorage.getItem('userId');
  const { data } = useQuery(GET_PATIENT_EVENTS, {
    variables: { id: userId }
  });

  if (!localStorage.getItem('user')) {
    return <Redirect to='/' />;
  }
  if (localStorage.getItem('user') !== 'patient') {
    return <Redirect to='/manage' />;
  }
  return (
    <div>
      <Button
        type='link'
        onClick={() => {
          localStorage.clear();
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
