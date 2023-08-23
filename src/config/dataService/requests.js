/* eslint-disable no-console, no-control-regex*/
import { DataService } from './dataService';

function formatDate(date) {
  const d = date;
  let month = d.getMonth() + 1;
  let day = d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
}

export const getTasks = async (filters) => {
  let date;
  let realToday;

  if (filters?.date) {
    date = new Date(formatDate(filters.date));
    realToday = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }

  return DataService?.get('Task', {
    ...(filters?.date && { date: realToday.toISOString() }),
    ...(filters?.team && { teams: filters.team }),
    ...(filters?.agent && { agents: filters.agent }),
  }).then((response) => response.data);
};

export const getTask = async (id) => {
  return DataService?.get('Task/' + id).then((response) => response.data);
};
