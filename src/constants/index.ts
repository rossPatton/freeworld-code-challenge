import { v4 } from 'uuid';

export const initialCandidateSet: ts.Candidates = [
  {
    hoursNeeded: 3,
    name: 'Jane',
    potential: 1000,
    uuid: v4(),
  },
  {
    hoursNeeded: 5,
    name: 'Bob',
    potential: 3000,
    uuid: v4(),
  },
  {
    hoursNeeded: 4,
    name: 'Mark',
    potential: 2700,
    uuid: v4(),
  },
  {
    hoursNeeded: 8,
    name: 'Jill',
    potential: 5000,
    uuid: v4(),
  },
  {
    hoursNeeded: 5,
    name: 'Don',
    potential: 3600,
    uuid: v4(),
  },
];
