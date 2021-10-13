import React from 'react';
import { Table } from 'antd';
import { useQuery } from '@apollo/client';
import { PATIENT_WITH_EVENTS } from '../queries';

const Patients = () => {
  const { data } = useQuery(PATIENT_WITH_EVENTS);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    }
  ];

  return (
    <Table
      dataSource={data?.getPatientsNotes}
      columns={columns}
      pagination={false}
    />
  );
};

export default Patients;
