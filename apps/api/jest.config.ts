/* eslint-disable */
const commonSettings = {
  preset: "../../jest.preset.js",
  testEnvironment: "node",
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
};

export default {
  projects: [
    {
      ...commonSettings,
      displayName: "api-unittest",
      testPathIgnorePatterns: ["/performancetest/", "/integrationtest/"],
    },
    {
      ...commonSettings,
      displayName: "api-integrationtest",
      maxWorkers: 1,
      testPathIgnorePatterns: ["/src/", "/performancetest/"],
    },
    {
      ...commonSettings,
      displayName: "api-performancetest",
      maxWorkers: 1,
      testPathIgnorePatterns: ["/src/", "/integrationtest/"],
    },
  ],
};
