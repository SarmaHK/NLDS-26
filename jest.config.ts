import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json'
        }]
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};

export default config;
