import { useRef, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

import BackButton from '../components/BackButton';

function BMICalculator() {
  const heightRef = useRef();
  const weightRef = useRef();
  const weightUnitRef = useRef();
  const feetRef = useRef();
  const inchRef = useRef();
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(0);

  const feetCondition = heightUnit === 'feet-inch';
  const cmCondition = heightUnit === 'cm';

  const handleCalculate = () => {
    let height = heightRef.current?.value;
    let weight = weightRef.current?.value;
    const feet = feetRef.current?.value;
    const inch = inchRef.current?.value;
    const weightUnit = weightUnitRef.current?.value;

    const roundOff = num => {
      return Math.round(num * 10) / 10; // one unit after decimal
    };

    // if height in centimeter
    if (cmCondition) {
      height /= 100;
    }

    // if height in feet & inch
    if (feetCondition) {
      height = feet / 3.281 + inch / 39.37;
    }

    // if weight in lbs
    if (weightUnit === 'lbs') {
      weight /= 2.205;
    }

    const result = weight / height ** 2; // weight in kg and height in meter square

    setBmi(roundOff(result));
  };

  function getPercentage(bmiVal, lowerRange, upperRange, adjustment) {
    return (bmiVal - lowerRange) / (upperRange - lowerRange) / 4 + adjustment;
  }

  const gagePerCal = () => {
    let result = 0;

    // we have four arc so will divide 100 / 4 give 25% to each

    if (bmi < 18.5) {
      result = getPercentage(bmi, 0, 18.5, 0);
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = getPercentage(bmi, 18.5, 24.9, 0.25);
    } else if (bmi > 24.9 && bmi <= 29.9) {
      result = getPercentage(bmi, 24.9, 29.9, 0.5);
    } else if (bmi >= 30) {
      result = getPercentage(bmi, 30, 100, 0.75);
    }

    return result;
  };

  const underweightClass = bmi < 18.5 ? 'underweight' : '';
  const normalWeightClass = bmi >= 18.5 && bmi <= 24.9 ? 'normal' : '';
  const overweightClass = bmi > 24.9 && bmi <= 29.9 ? 'overweight' : '';
  const obeseClass = bmi >= 30 ? 'obese' : '';

  return (
    <>
      <div className='content-centered' style={{ flexDirection: 'column' }}>
        <div className='card w-fit-content'>
          <h2>BMI Calculator</h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              handleCalculate();
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className='input-group' style={feetCondition ? { gridTemplateColumns: '0.75fr 0.75fr 1fr' } : {}}>
                <input
                  ref={feetCondition ? feetRef : heightRef}
                  className='input'
                  type='number'
                  placeholder={feetCondition ? 'Feet' : 'Height'}
                />

                {feetCondition && <input ref={inchRef} className='input' type='number' placeholder='Inch' style={{ borderRadius: 0 }} />}

                <select className='input' value={heightUnit} onChange={e => setHeightUnit(e.target.value)}>
                  <option value='cm'>cm(Centimeter)</option>
                  <option value='m'>m(Meter)</option>
                  <option value='feet-inch'>ft, in(Feet & Inch)</option>
                </select>
              </div>

              <div className='mt-1 input-group'>
                <input ref={weightRef} className='input' type='number' placeholder='Weight' />

                <select ref={weightUnitRef} className='input'>
                  <option value='lbs'>lbs(Pound)</option>
                  <option value='kg'>kg(Kilogram)</option>
                </select>
              </div>
            </div>

            {bmi ? (
              <p>
                BMI: {bmi} kg/m<sup>2</sup>
              </p>
            ) : null}

            <div className='content-btw mt-1'>
              <div style={{ height: '135px', width: '300px' }}>
                <GaugeChart
                  id='bmi-gauge-chart'
                  nrOfLevels={4}
                  arcWidth={0.35}
                  colors={['orange', 'green', 'orangered', 'red']}
                  percent={bmi ? gagePerCal() : 0}
                  hideText
                />
              </div>

              <table className='bmi-range-table'>
                <thead>
                  <tr>
                    <td>BMI</td>
                    <td>CLASSIFICATION</td>
                  </tr>
                </thead>

                <tbody>
                  <tr className={underweightClass}>
                    <td>{'<'} 18.5</td>
                    <td>Underweight</td>
                  </tr>
                  <tr className={normalWeightClass}>
                    <td>18.5 - 24.9</td>
                    <td>Normal</td>
                  </tr>
                  <tr className={overweightClass}>
                    <td>25 - 29.9</td>
                    <td>Overweight</td>
                  </tr>
                  <tr className={obeseClass}>
                    <td>{'>'} 30</td>
                    <td>Obese</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button type='submit' className='btn mt-1' style={{ width: '100%' }}>
              Calculate
            </button>
          </form>
        </div>

        <BackButton />
      </div>
    </>
  );
}

export default BMICalculator;
