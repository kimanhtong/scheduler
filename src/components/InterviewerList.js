import React, {useState} from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList (props) {
  const InterviewerListRendered = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        id = {interviewer.id}
        avatar = {interviewer.avatar}
        name = {interviewer.name}
        selected = {interviewer.id === props.interviewer}
        setInterviewer = {props.setInterviewer}
      />
  )});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListRendered}
      </ul>
    </section>
  );
};