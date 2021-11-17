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