module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/app.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/database/**/*.ts',
    '!<rootDir>/src/interfaces/*.ts',
    '!<rootDir>/src/mapper/*.ts',
    '!<rootDir>/src/middlewares/*.ts',
    '!<rootDir>/src/repositories/*.ts',
    '!<rootDir>/src/routes/*.ts',
    '!<rootDir>/src/utils/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}