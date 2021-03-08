import React, { useContext, useState } from 'react';
import cx from 'classnames';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';

import { Candidates } from '../components/Candidates';
import { DBContext } from '../context/DBContext';

const CalculateForm = () => {
  const { candidates }: ts.DBContext = useContext(DBContext);

  // amount of hours available for instruction
  const [hours, setCreditHours] = useState("20");

  // amount of candidates allowed
  const [forConsideration, setNumStudents] = useState("5");

  // total earnings potential
  const [calculatedPotential, setPotential] = useState(null);

  // candidate set after calculating potential
  const [finalCandidates, setFinalCandidates] = useState([]);

  // "loading" states
  const [isCalculating, setCalculatingState] = useState(false);
  const [isResetting, setResetting] = useState(false);

  const isDisabled = !hours || !forConsideration;

  const resetPage = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setResetting(true);
    setTimeout(() => {
      setResetting(false);
      setFinalCandidates([]);
      setPotential(null);
    }, 1000);
  }

  const calculateMaxEarnings = (ev: React.FormEvent) => {
    ev.preventDefault();
    setCalculatingState(true);
    setPotential(null);

    // convert to integer
    const maxHours = parseInt(hours, 10);

    // reverse sort, with biggest potential by hour first
    const sortedCandidates = sortBy(candidates, c =>
      -(c.potential / c.hoursNeeded));

    // approach, starting with highest potential by hour
    // we iterate over the candidates, and count hours
    // if our hours go over our limit, we stop doing anything
    // if safe, we add up the hours and the potential earnings
    // then filter out the null results
    let hoursSoFar = 0;
    const byEarningsPotential = sortedCandidates.map(c => {
      const tempHoursSoFar = hoursSoFar + c.hoursNeeded;
      if (tempHoursSoFar > maxHours) return null;
      hoursSoFar = tempHoursSoFar;
      return c;
    }).filter(c => !!c);

    // take the filtered array and lop off anyone after the class size limit
    const byEarningsAndConsideration = byEarningsPotential.slice(0, parseInt(forConsideration, 10));

    const totalPotential = reduce(
      byEarningsAndConsideration,
      (sum, c) => sum + c.potential,
      0
    );

    // the timeout here is to simulate 'loading' time for the user
    // effectively there is no loading, it should be instant but
    // the minor delay is used to render a loading message, which is
    // important for the user to know that something is happening/happened
    setTimeout(() => {
      setPotential(totalPotential);
      setFinalCandidates(byEarningsAndConsideration);
      setCalculatingState(false);
    }, 1000);
  };

  const inputCx = 'border dark:text-black p-2 rounded mb-2 md:mb-0 md:mr-2';

  return (
    <>
      <form onSubmit={calculateMaxEarnings}>
        <fieldset>
          <div className='flex flex-col md:items-end md:flex-row mb-4'>
            <label className='flex flex-col'>
              Max Credit Hours:
              <input
                type="number"
                className={inputCx}
                onChange={ev => setCreditHours(ev.currentTarget.value)}
                value={hours}
              />
            </label>
            <label className='flex flex-col mb-2 md:mb-0'>
              Number of students:
              <input
                type="number"
                className={inputCx}
                onChange={ev => setNumStudents(ev.currentTarget.value)}
                value={forConsideration}
              />
            </label>
            <button
              disabled={isDisabled}
              className={cx({
                'hover:bg-gray-100 dark:hover:bg-gray-800 mb-2 md:mb-0 md:mr-2 p-2 pl-4 pr-4 rounded border': true,
                'cursor-not-allowed opacity-50': isDisabled,
              })}>
              Calculate
            </button>
            <button
              onClick={resetPage}
              className='hover:bg-gray-100 dark:hover:bg-gray-800 p-2 pl-4 pr-4 rounded border'>
              Reset
            </button>
          </div>
        </fieldset>
      </form>
      { isResetting && 'Resetting Candidates'}
      { isCalculating && 'Calculating Potential'}
      {
        (!isCalculating && !isResetting) && (
          <>
            {calculatedPotential ? (
              <ul>
                <li>Potential Earnings: ${calculatedPotential}</li>
                <li className='mb-4'>
                  Number of Candidates: {finalCandidates.length}
                </li>
                <Candidates candidates={finalCandidates} />
              </ul>
            ) : <Candidates />}
          </>
        )
      }
    </>
  );
}

export default CalculateForm;
