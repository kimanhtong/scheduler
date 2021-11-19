export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appIdArr = [];
  for (let dayItem of state.days) {
    if (dayItem.name === day) {
      appIdArr.push(...dayItem.appointments);
      break;
    }
  }

  const appArr = [];
  if (appIdArr.length > 0) {
    for (let appId of appIdArr) {
      appArr.push(state.appointments[appId]);
    }
  }

  return appArr;
};

export function getInterview(state, interview) {
  if (interview) {
    const newInterview = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return newInterview;
  } else {
    return null;
  }
};

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const appIdArr = [];
  for (let dayItem of state.days) {
    if (dayItem.name === day) {
      appIdArr.push(...dayItem.appointments);
      break;
    }
  }

  const interviewerArr = [];
  const interviewerIdArr = []; // To check duplicate interviewer
  if (appIdArr.length > 0) {
    for (let appId of appIdArr) {
      if(state.appointments[appId].interview) {
        const interviewerId = state.appointments[appId].interview.interviewer;
        if (interviewerIdArr.indexOf(interviewerId) < 0) {
          interviewerArr.push(state.interviewers[interviewerId]);
          interviewerIdArr.push(interviewerId);
        }
      }
    }
  }
  return interviewerArr;
};