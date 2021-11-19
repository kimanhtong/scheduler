import React, {useState, Fragment} from 'react';
import '../Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const FORM = "FORM"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {props.time ? <Header time={props.time}/> : 'No Apppointments'}
      {mode === EMPTY ? <Empty onAdd={() => transition(CREATE)} />
      :mode === SHOW ? (
        <Show
          student={props.interview.student}
          interviewer= {props.interview.interviewer}
        />
      )
      :(
        <Form interviewers={props.interviewers} onCancel={back} onSave={props.onSave}/>
      )}
    </article>
  )
}