const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: String
    name: String
    email: String
    password: String
    type: String
  }

  type Event {
    id: String
    patientId: String
    start: String
    end: String
    title: String
  }

  type RootQuery {
    doctor: User
    secretary: User
    patient(name: String): User
    getPatients: [User]
    getEvents: [Event]
    getEvent(id: String): Event
    getPatientEvents(id: String): [Event]
  }

  type RootMutation {
      addUser(_id: String, name: String, email: String, password: String, type: String): User
      loginUser(email: String, password: String): User
      addEvent(id: String, patientId: String, start: String, end: String, title: String): Event
      editEvent(id: String, patientId: String, start: String, end: String, title: String): Event
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`);
