import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const saveToServer = axios
      .put(`/api/appointments/${id}`, appointment)
      .then(res => console.log(`Keep waiting, received status code: ${res.status}`))
      .then (() => {
        setState({
          ...state,
          appointments
        });
        return Promise.resolve('Saved!');
      })
      .catch(res => {
        console.log(res);
        return Promise.reject('Error Saving!');
      })
    return saveToServer;
  }

  function deleteInterview(id) {
    const {
      [id]: appointment,
      ...appointments
    } = {...state.appointments};

    const deleteFromServer = axios
      .delete(`/api/appointments/${id}`)
      .then(res => console.log(`Keep waiting, received status code: ${res.status}`))
      .then (() => {
        setState({
          ...state
        });
        return Promise.resolve('Deleted!');
      })
      .catch(res => {
        console.log(res);
        return Promise.reject('Error Deleting!');
      })
    return deleteFromServer;
  }

  useEffect(()=>{Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
    ]).then(all=>{
      setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })},[]);

  const dailyAppointments = getAppointmentsForDay(state,state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <Fragment>
          {schedule}
          <Appointment key="last" time="5pm"/>
        </Fragment>
      </section>
    </main>
  );
}
