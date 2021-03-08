namespace ts {
  // declare type match = import('react-router').match & {
  //   params: {
  //     id?: string,
  //     query?: string,
  //     page?: string,
  //   }
  // };

  declare type Candidate = {
    hoursNeeded: number,
    name: string,
    potential: number,
    uuid: string,
  };

  declare type Candidates = Candidate[];
  declare type DB = Dexie.Table<Candidates, number>;
  declare type DBContext = {
    candidates: Candidates,
    db: DB,
  };
}
