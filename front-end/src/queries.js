import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation AddUser(
    $_id: String
    $name: String
    $email: String
    $password: String
    $type: String
  ) {
    addUser(
      _id: $_id
      name: $name
      email: $email
      password: $password
      type: $type
    ) {
      _id
      name
      email
      password
      type
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
      type
    }
  }
`;

export const GET_ALL_PATIENT = gql`
  query GetPatients {
    getPatients {
      _id
      name
    }
  }
`;

export const ADD_NEW_EVENT = gql`
  mutation AddEvent(
    $_id: String
    $patientId: String
    $start: String
    $end: String
    $title: String
  ) {
    addEvent(
      id: $_id
      patientId: $patientId
      start: $start
      end: $end
      title: $title
    ) {
      id
      patientId
      start
      end
      title
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation EditEvent(
    $_id: String
    $patientId: String
    $start: String
    $end: String
    $title: String
  ) {
    editEvent(
      id: $_id
      patientId: $patientId
      start: $start
      end: $end
      title: $title
    ) {
      id
      patientId
      start
      end
      title
    }
  }
`;

export const GET_SINGLE_EVENT = gql`
  query GetEvent($_id: String) {
    getEvent(id: $_id) {
      id
      patientId
      start
      end
      title
    }
  }
`;

export const GET_ALL_EVENTS = gql`
  query GetEvents {
    getEvents {
      id
      patientId
      start
      end
      title
    }
  }
`;

export const GET_PATIENT_EVENTS = gql`
  query GetPatientEvents($id: String) {
    getPatientEvents(id: $id) {
      patientId
      id
      title
      start
      end
    }
  }
`;
