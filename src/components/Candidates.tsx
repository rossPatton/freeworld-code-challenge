import React, { useContext } from 'react';

import { DBContext } from '../context/DBContext';

type Props = { candidates?: ts.Candidates };
export const Candidates = (props: Props) => {
  const { candidates, db }: ts.DBContext = useContext(DBContext);
  const removeCandidate = async (uuid: string) => db
    .where('uuid')
    .equals(uuid)
    .delete();

  // render custom set if provided, else fallback to db set
  const candidatesToRender = props.candidates || candidates;

  return (
    <ul>
      <li className="text-2xl font-bold">
        {props.candidates
          ? `${candidatesToRender.length} Accepted Candidates`
          : 'Current Candidates'}
      </li>
      {candidatesToRender.map((c, i) => (
        <li
          key={i}
          className='mb-4 border-b pb-4'>
          <div className="hidden hide md:flex flex-row">
            <div className="w-3/12">Name:</div>
            <div className="w-3/12">Hours Needed:</div>
            <div className="w-3/12">Earnings Potential:</div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/12">
              <span className='md:hidden'>Name: </span>
              {c.name}
            </div>
            <div className="w-full md:w-3/12">
              <span className='md:hidden'>Hours Needed: </span>
              {c.hoursNeeded}
            </div>
            <div className="w-full md:w-3/12 mb-2 md:mb-0">
              <span className='md:hidden'>Earnings Potential: </span>
              {c.potential}
            </div>
            <form
              className="w-full md:w-3/12 mb-2 md:mb-0"
              onSubmit={() => removeCandidate(c.uuid)}>
              <fieldset>
                <button className='hover:bg-gray-100 dark:hover:bg-gray-800 border rounded p-1 pl-4 pr-4'>
                  Remove
                </button>
              </fieldset>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
