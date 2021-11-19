import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
// import { render } from "@testing-library/react";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  useEffect(()=>{Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then(all=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  })},[]);
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  console.log(dailyAppointments);
  /* const RenderedAppointment = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
    )
  });
  */

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
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
          onChange={setDay} /* ?? */
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
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
