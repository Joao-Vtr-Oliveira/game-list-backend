/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  maxConcurrency: 1,
  preset: 'ts-jest',
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};