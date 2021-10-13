const { v1: uuidv1 } = require('uuid');
const Users = [
  {
    _id: '1',
    name: 'test1',
    email: 'email@email.com',
    password: '123456',
    type: 'patient'
  },
  {
    _id: '2',
    name: 'test2',
    email: 'email1@email.com',
    password: '123456',
    type: 'patient'
  },
  {
    _id: '3',
    name: 'test3',
    email: 'email2@email.com',
    password: '123456',
    type: 'patient'
  },
  {
    _id: '4',
    name: 'sec',
    email: 'test@test.com',
    password: '123456',
    type: 'secretary'
  }
];

const Events = [
  {
    id: '1',
    start: '2021-10-18T08:00:00.000Z',
    end: '2021-10-18T17:00:00.000Z',
    title: 'From GraphQL',
    patientId: '1'
  },
  {
    id: '2',
    start: '2021-10-18T08:00:00.000Z',
    end: '2021-10-18T17:00:00.000Z',
    title: 'From GraphQL',
    patientId: '3'
  },
  {
    id: '3',
    start: '2021-10-18T08:00:00.000Z',
    end: '2021-10-18T17:00:00.000Z',
    title: 'Get Own Events Test',
    patientId: '1'
  }
];

const getPatients = () => {
  return Users.filter((item) => {
    if (item.type === 'patient') return item;
  });
};

const addUser = (data) => {
  const user = Users.find((item) => item.email === data.email);
  if (user) {
    throw new Error('This User Is already exist ..!');
  }
  data._id = uuidv1();
  Users.push(data);
  return data;
};

const loginUser = (data) => {
  const user = Users.find((item) => item.email === data.email);
  if (!user) {
    throw new Error('Invalid Email ..!');
  }
  if (user.password !== data.password) {
    throw new Error('Invalid Password ..!');
  }
  return user;
};

const addEvent = (data) => {
  data.id = uuidv1();
  Events.push(data);
  return data;
};

const editEvent = (data) => {
  const objIndex = Events.findIndex((obj) => obj.id === data.id);

  if (objIndex === -1) {
    throw new Error('This Event In Not Exist anymore ..!');
  }
  Events[objIndex].patientId = data.patientId;
  Events[objIndex].title = data.title;
  Events[objIndex].start = data.start;
  Events[objIndex].end = data.end;

  return Events[objIndex];
};

const getEvent = (arg) => {
  return Events.find((item) => item.id === arg.id);
};

const getEvents = () => {
  return Events;
};

const getPatientEvents = ({ id }) => {
  return Events.map((item) => {
    if (item.patientId === id) {
      return item;
    }
  });
};

const getPatientsNotes = () => {
  let newArr = [];
  Users.map((item) => {
    Events.map((ev) => {
      if (ev.patientId === item._id) {
        return newArr.push({
          ...item,
          note: ev.title
        });
      }
    });
  });
  return newArr;
};

module.exports = {
  getPatients,
  addUser,
  loginUser,
  addEvent,
  editEvent,
  getEvent,
  getEvents,
  getPatientEvents,
  getPatientsNotes
};
