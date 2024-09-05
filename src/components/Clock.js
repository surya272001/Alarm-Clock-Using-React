import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="clock">
      {formatTime(time)}
    </div>
  );
}

export default Clock;
