const { defaults } = require('jest-config')

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js'],
  collectCoverageFrom: ['**/*.{js,jsx}', '**/*.{ts,tsx}'],
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js?$': 'babel-jest'
  },
  testMatch: ['**/*.spec.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    'jest.config.js',
    'babel.config.js',
    'package.json',
    'tsconfig.jest.json',
    'tsconfig.json'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.jest.json',
      diagnostics: true
    }
  }
}
