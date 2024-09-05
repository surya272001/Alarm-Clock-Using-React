import React, { useState } from 'react';

function AlarmForm({ addAlarm }) {
  const [alarmTime, setAlarmTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alarmTime) {
      addAlarm(alarmTime);
      setAlarmTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Set Alarm Time:
        <input
          type="datetime-local"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
      </label>
      <button type="submit">Add Alarm</button>
    </form>
  );
}

export default AlarmForm;
