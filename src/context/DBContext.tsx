import React, { useEffect, useState } from 'react';
import Dexie from 'dexie';

import { initialCandidateSet } from '../constants'

// this ts class just exists to satisfy typescript, code completion
class CandidatesDB extends Dexie {
  candidates: Dexie.Table<ts.Candidate, number>;

  constructor() {
    super('freeworldCodeChallenge');

    // define schema, if not already exists
    this.version(1).stores({
      candidates: '++,uuid,name,potential,hoursNeeded',
    });
  }
}

// initialize indexDB database if not already done
const db = new CandidatesDB();
db.open().catch(err => {
  console.error(err.stack || err);
});

type Props = { children: React.ReactNode };
export const DBProvider = (props: Props) => {
  const [candidates, setState] = useState(initialCandidateSet);
  const Table = db['candidates'];

  useEffect(() => {
    const fetchData = async () => {
      const candidatesTable = await Table.toArray();

      // seed with example set if DB is being initialized for the first time
      if (!Array.isArray(candidatesTable) || candidatesTable.length === 0) {
        return Table.bulkAdd(initialCandidateSet);
      }

      // or refresh with existing data
      setState(candidatesTable);
    };

    fetchData();
  }, []);

  const clearDB = async () => {
    await Table.clear();
    setState([]);
  }

  const resetDB = async () => {
    await Table.clear();
    await Table.bulkAdd(initialCandidateSet);
    setState(initialCandidateSet);
  }

  return (
    <DBContext.Provider value={{ candidates, clearDB, db: Table, resetDB }}>
      {props.children}
    </DBContext.Provider>
  );
}

export const DBContext = React.createContext(null);
