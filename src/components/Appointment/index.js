import React, {useState} from 'react';
import '../Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const t = 1010; // waiting time
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SAVING);
    setTimeout(() => {
      transition(SHOW)
    }, t);
  }
  function del (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.deleteInterview(props.id, interview);
    console.log(`Waiting for deleting data to server ${t/1000} seconds`);
    transition(DELETING);
    setTimeout(() => {
      transition(EMPTY);
    }, t);
  }

  return (
    <article className="appointment">
      {props.time ? <Header time={props.time}/> : 'No Apppointments'}
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>{transition(EDIT)}}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} onDelete={del}/>}
      {mode === SAVING && <Status message = {'Saving'} />}
      {mode === DELETING && <Status message = {'Deleting'} />}
      {mode === CONFIRM && <Confirm message = {'Delete? ... Really?'} onCancel={back} onConfirm={del}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} value={props.interview.interviewer.id} student={props.interview.student} onCancel={back} onSave={save} onDelete={del}/>}
    </article>
  )
}