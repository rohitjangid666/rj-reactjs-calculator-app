import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import BackButton from '../components/BackButton';

function AgeCalculator() {
  const DEFAULT_TEXT = 'Your age is 0 years 0 months 0 days.';
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [ageText, setAgeText] = useState(DEFAULT_TEXT);

  const calculateAge = () => {
    console.log(startDate);
    console.log(new Date(startDate));
    if (startDate) {
      setError('');
      const today = new Date();
      const currentDate = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getYear();

      const dob = new Date(startDate);
      const dobDate = dob.getDate();
      const dobMonth = dob.getMonth();
      const dobYear = dob.getYear();

      const age = {};
      let result = ageText;

      let yearAge = currentYear - dobYear;

      let monthAge = '';

      // get months
      if (currentMonth >= dobMonth) {
        monthAge = currentMonth - dobMonth;
      } else {
        yearAge--;
        monthAge = 12 + currentMonth - dobMonth;
      }

      let dateAge = '';

      // get Days
      if (currentDate >= dobDate) {
        // get days when current date is greater than or equal to birth date
        dateAge = currentDate - dobDate;
      } else {
        monthAge--;
        dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }

      age.years = yearAge;
      age.months = monthAge;
      age.days = dateAge;

      if (age.years > 0 && age.months > 0 && age.days > 0) {
        result = `${age.years} years ${age.months} months, and ${age.days} days old.`;
      } else if (age.years === 0 && age.months === 0 && age.days > 0) {
        // when year and month is same
        result = `Only ${age.days} days old!`;
      } else if (age.years > 0 && age.months === 0 && age.days === 0) {
        // when month and day are same
        result = `${age.years} years old. Happy Birthday!!! 🎂🎉🥳`;
      } else if (age.years > 0 && age.months > 0 && age.days === 0) {
        // when date is same
        result = `${age.years} years and ${age.months} months old.`;
      } else if (age.years === 0 && age.months > 0 && age.days > 0) {
        // when year is same
        result = `${age.months} months and ${age.days} days old.`;
      } else if (age.years > 0 && age.months === 0 && age.days > 0) {
        // when months is same
        result = `${age.years} years, and ${age.days} days old.`;
      } else if (age.years === 0 && age.months > 0 && age.days === 0) {
        // when year and date is same
        result = `${age.months} months old.`;
      } else {
        setError('Invalid Date!!!');
      }

      setAgeText(result);
    } else {
      setError('Please enter date');
    }
  };

  useEffect(() => {
    calculateAge();
  }, [startDate]);

  return (
    <>
      <div className='content-centered' style={{ flexDirection: 'column' }}>
        <div className='card w-fit-content'>
          <h2>AGE CALCULATOR</h2>

          <div className='date-picker-container'>
            <ReactDatePicker
              dateFormat='dd/MM/yyyy'
              className='input'
              selected={startDate}
              onChange={date => {
                setStartDate(date);
                setIsChange(true);
              }}
              placeholderText='Your Birth Date'
            />
          </div>
          {isChange && <span className='error'>{error}</span>}

          <p>{ageText}</p>
        </div>

        <BackButton />
      </div>
    </>
  );
}

export default AgeCalculator;
