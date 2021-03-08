import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Nav = memo(() => (
  <nav className='fixed top w-full dark:bg-gray-800 dark:text-white'>
    <ul className="flex pl-20 p-4">
      <li className='mr-4'>
        <Link
          className='underline'
          to="/freeworld-code-challenge/">
          Calculate Earnings
        </Link>
      </li>
      <li>
        <Link
          className='underline'
          to="/freeworld-code-challenge/add-candidate">
          Add Candidate
        </Link>
      </li>
    </ul>
  </nav>
));

export default Nav;
