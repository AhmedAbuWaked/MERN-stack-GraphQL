import React, { useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar } from '@mobiscroll/react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  notification,
  message
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_NEW_EVENT,
  EDIT_EVENT,
  GET_ALL_PATIENT,
  GET_SINGLE_EVENT
} from '../queries';
const { Option } = Select;

const Calender = ({ isPatient, events }) => {
  const [form] = Form.useForm();
  const { data } = useQuery(GET_ALL_PATIENT);
  // const { data: singleEvent } = useQuery(GET_SINGLE_EVENT);

  const [myEvents, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [patientNote, setPatientNote] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onEventClick = (event) => {
    setVisible(true);
    setIsEdit(true);
    setEvents(event.event);
    return form.setFieldsValue({
      patientId: event.event.patientId,
      title: event.event.title
    });
  };

  const handleCellClick = (event) => {
    setVisible(true);
    setIsEdit(false);
    setStartDate(event.date);
    return form.resetFields();
  };

  const [addEvent] = useMutation(ADD_NEW_EVENT);
  const [editEvent] = useMutation(EDIT_EVENT);
  const onFinish = async (values) => {
    try {
      if (!isEdit) {
        values.start = new Date(startDate.setDate(startDate.getDate() + 1));
        await addEvent({ variables: values });
        notification.success({
          message: 'Event has been added successfully ..!'
        });
      } else {
        values._id = myEvents.id;
        values.start = new Date(
          myEvents._days[0].setDate(myEvents._days[0].getDate() + 1)
        );
        await editEvent({ variables: values });
        notification.success({
          message: 'Event has been Edited successfully ..!'
        });
      }
      setVisible(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDragDrop = async (event) => {
    try {
      const ev = event.event;
      ev._id = ev.id;
      await editEvent({ variables: ev });
      notification.success({
        message: 'Event Updated',
        description: 'Event Date has been Updated Successfully ..!'
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Eventcalendar
        theme='ios'
        themeVariant='light'
        dragToMove={!isPatient}
        data={events}
        onEventClick={!isPatient && onEventClick}
        onCellDoubleClick={!isPatient && handleCellClick}
        onEventUpdate={handleDragDrop}
      />
      <Modal
        title='Event Info.'
        visible={visible}
        onCancel={() => setVisible(false)}
        okText={isEdit ? 'Edit Event' : 'Add Event'}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label='Patient Name'
            name='patientId'
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Select placeholder='Select Patient'>
              {data?.getPatients?.map((item) => {
                return <Option value={item?._id}>{item?.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label='Note'
            name='title'
            rules={[{ required: true, message: 'Please input your Note!' }]}
          >
            <Input placeholder='Write Your Note Here' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {isEdit ? 'Edit Event' : 'Add Event'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Calender;
