import * as bcrypt from 'bcrypt';

interface UserSeed {
  username: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: UserSeed[];
}

export const initialData: SeedData = {
  users: [
    {
      username: 'mrego',
      password: bcrypt.hashSync('Oddun077', 10),
      roles: ['admin'],
    },
    {
      username: 'admin',
      password: bcrypt.hashSync('Admin1', 10),
      roles: ['admin'],
    },
  ],
};
