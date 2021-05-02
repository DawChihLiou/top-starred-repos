module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!coverage/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/components/$1',
    '@theme/(.*)': '<rootDir>/theme/$1',
    '@context/(.*)': '<rootDir>/context/$1',
    '@services/(.*)': '<rootDir>/services/$1',
    '@typings/(.*)': '<rootDir>/typings/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
    '@hooks/(.*)': '<rootDir>/hooks/$1',
  },
}
