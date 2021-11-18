import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";
// import { render } from "@testing-library/react";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  useEffect(()=>{Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments')
  ]).then(all=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data}))
  })},[]);
  const dailyAppointments = getAppointmentsForDay({days: state.days, appointments: state.appointments},state.day);
  const RenderedAppointment = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
    )
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
          {RenderedAppointment}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
