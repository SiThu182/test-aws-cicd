import { v4 as uuidv4 } from 'uuid';

export const INITIAL_TASKS = [
  {
    id: uuidv4(),
    name: 'Title 2',
    description: 'Desc 2',
    status: 'backlog',
  },
  {
    id: uuidv4(),
    name: 'Title 3',
    description: 'Desc 3',
    status: 'backlog',
  },
  {
    id: uuidv4(),
    name: 'Title 4',
    description: 'Desc 4',
    status: 'done',
  },
];
