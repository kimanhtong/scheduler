import React, {useState} from 'react';
import '../Appointment/styles.scss';

export default function Appointment(props) {

  return (
    <article className="appointment">
      {props.time ? `Appointment at ${props.time}` : 'No Apppointments'}
    </article>
  )
}