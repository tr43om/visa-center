import * as migration_20250128_062819 from './20250128_062819';
import * as migration_20250128_091426 from './20250128_091426';

export const migrations = [
  {
    up: migration_20250128_062819.up,
    down: migration_20250128_062819.down,
    name: '20250128_062819',
  },
  {
    up: migration_20250128_091426.up,
    down: migration_20250128_091426.down,
    name: '20250128_091426'
  },
];
