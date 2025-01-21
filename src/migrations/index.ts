import * as migration_20250121_170339_initial from './20250121_170339_initial';

export const migrations = [
  {
    up: migration_20250121_170339_initial.up,
    down: migration_20250121_170339_initial.down,
    name: '20250121_170339_initial'
  },
];
