import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const countries = [
  { name: 'United States', timezone: 'America/New_York' },
  { name: 'United Kingdom', timezone: 'Europe/London' },
  { name: 'Australia', timezone: 'Australia/Sydney' },
  { name: 'Japan', timezone: 'Asia/Tokyo' },
  // Add more countries and their timezones as needed
];

function CountryTime() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].timezone);
  const [time, setTime] = useState(moment().tz(selectedCountry).format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().tz(selectedCountry).format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedCountry]);

  return (
    <div className="country-time">
      <label htmlFor="country-select">Select Country:</label>
      <select
        id="country-select"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        {countries.map((country) => (
          <option key={country.timezone} value={country.timezone}>
            {country.name}
          </option>
        ))}
      </select>
      <div className="clock">
        Current time in {countries.find((c) => c.timezone === selectedCountry)?.name}:
        <div>{time}</div>
      </div>
    </div>
  );
}

export default CountryTime;
