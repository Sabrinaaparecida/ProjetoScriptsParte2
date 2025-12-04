/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', 
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/*.spec.ts'],
  
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  clearMocks: true,
};