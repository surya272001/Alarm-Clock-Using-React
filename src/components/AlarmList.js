import React from 'react';
import { format } from 'date-fns';

function AlarmList({ alarms }) {
  return (
    <div>
      <h2>Upcoming Alarms</h2>
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id}>
            {format(new Date(alarm.time), 'yyyy-MM-dd HH:mm:ss')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlarmList;
