import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Calender from '../management/Calender';
import { GET_PATIENT_EVENTS } from '../queries';

const Patient = ({ history }) => {
  const userId = localStorage.getItem('userId');
  const { data } = useQuery(GET_PATIENT_EVENTS, {
    variables: { id: userId }
  });

  useEffect(() => {
    console.log('🚀 ~ file: Patient.js ~ line 11 ~ Patient ~ data', data);
  }, [data]);
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
