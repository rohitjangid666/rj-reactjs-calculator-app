import { useRef, useState } from 'react';
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


  return (
    <>
      <div className='content-centered' style={{ flexDirection: 'column' }}>
        <div className='card w-fit-content'>
          <h2>BMI Calculator</h2>

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

          <button className='btn mt-1' style={{ width: '100%' }} onClick={handleCalculate}>
            Calculate
          </button>
        </div>

        <BackButton />
      </div>
    </>
  );
}

export default BMICalculator;
