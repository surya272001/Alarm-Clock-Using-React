import React, { useState, useEffect } from 'react';
import AlarmForm from './components/AlarmForm';
import AlarmList from './components/AlarmList';
import AnalogClock from './components/AnalogClock';
import CountryTime from './components/CountryTime';
import { format } from 'date-fns';

function App() {
  const [alarms, setAlarms] = useState([]);

  const addAlarm = (time) => {
    setAlarms([...alarms, { id: Date.now(), time }]);
  };

  const removeAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      alarms.forEach((alarm) => {
        const alarmTime = new Date(alarm.time);
        if (now >= alarmTime && now < alarmTime.setMinutes(alarmTime.getMinutes() + 1)) {
          // Play sound
          const audio = new Audio('/alarm-sound.mp3');
          audio.play();
          
          // Optionally, notify the user
          if (Notification.permission === 'granted') {
            new Notification('Alarm', {
              body: `Alarm set for ${format(alarmTime, 'yyyy-MM-dd HH:mm:ss')}`,
            });
          }

          // Remove the alarm after it has triggered
          removeAlarm(alarm.id);
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [alarms]);

  useEffect(() => {
    // Request notification permission on mount
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="App">
      <h1>Alarm App</h1>
      <AnalogClock />
      <CountryTime />
      <AlarmForm addAlarm={addAlarm} />
      <AlarmList alarms={alarms} removeAlarm={removeAlarm} />
    </div>
  );
}

export default App;
