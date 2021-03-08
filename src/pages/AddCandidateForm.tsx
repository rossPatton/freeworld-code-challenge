import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';

import { DBContext } from '../context/DBContext';
import { Candidates } from '../components/Candidates';

const AddCandidateForm = () => {
  const { db } = useContext(DBContext);
  const [name, setName] = useState('');
  const [potential, setPotential] = useState('');
  const [hoursNeeded, setHoursNeeded] = useState('');

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
          <ul className='flex flex-col md:flex-row w-full'>
            <li className='mb-2 mr-2 w-full md:w-4/12'>
              <input
                className={inputCx}
                onChange={ev => setName(ev.currentTarget.value)}
                placeholder="Student Name"
                value={name}
              />
            </li>
            <li className='mb-2 mr-2 w-full md:w-4/12'>
              <input
                className={inputCx}
                onChange={ev => setPotential(ev.currentTarget.value)}
                type="number"
                placeholder="Earnings Potential"
                value={potential}
              />
            </li>
            <li className='mb-2 w-full md:w-4/12'>
              <input
                className={inputCx}
                onChange={ev => setHoursNeeded(ev.currentTarget.value)}
                type="number"
                placeholder="Hours of Instruction Needed"
                value={hoursNeeded}
              />
            </li>
          </ul>
          {(name && potential && hoursNeeded) && (
            <button className='hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded border'>
              Add Candidate +
            </button>
          )}
        </fieldset>
      </form>
      <Candidates />
    </>
  );
}

export default AddCandidateForm;
