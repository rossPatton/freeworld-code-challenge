import React, { memo, useContext, useState } from 'react';
import cx from 'classnames';
import { v4 } from 'uuid';

import { DBContext } from '../context/DBContext';
import { Candidates } from '../components/Candidates';

const AddCandidateForm = memo(() => {
  const { db } = useContext(DBContext);
  const [name, setName] = useState('');
  const [potential, setPotential] = useState('');
  const [hoursNeeded, setHoursNeeded] = useState('');

  const isDisabled = !(name && potential && hoursNeeded);

  const onSubmit = async () => db
    .add({
      hoursNeeded,
      name,
      potential,
      uuid: v4(),
    });

  const inputCx = 'dark:text-black p-2 rounded w-full';

  return (
    <>
      <form
        onSubmit={onSubmit}
        className='mb-8'>
        <fieldset>
          <ul className='flex flex-col md:flex-row md:items-end w-full'>
            <li className='mb-2 md:mb-0 mr-2 w-full md:w-6/12'>
              <label>
                Candidate Name:
                <input
                  className={inputCx}
                  onChange={ev => setName(ev.currentTarget.value)}
                  placeholder="John Doe"
                  value={name}
                />
              </label>
            </li>
            <li className='mb-2 md:mb-0 mr-2 w-full md:w-2/12'>
              <label>
                Earnings Potential:
                <input
                  className={inputCx}
                  onChange={ev => setPotential(ev.currentTarget.value)}
                  type="number"
                  placeholder="5000"
                  value={potential}
                />
              </label>
            </li>
            <li className='mb-4 md:mb-0 w-full md:w-2/12 mr-2'>
              <label>
                Hours Needed:
                <input
                  className={inputCx}
                  onChange={ev => setHoursNeeded(ev.currentTarget.value)}
                  type="number"
                  placeholder="5"
                  value={hoursNeeded}
                />
              </label>
            </li>
            <li className='w-full md:w-2/12'>
              <button
                disabled={isDisabled}
                className={cx({
                  'hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded border w-full': true,
                  'cursor-not-allowed opacity-50': isDisabled,
                })}>
                Add Candidate +
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
      <Candidates />
    </>
  );
});

export default AddCandidateForm;
