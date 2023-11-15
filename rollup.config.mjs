import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json' assert {type: 'json'};

export default [
  {
    input: packageJson.main,
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        resolveOnly: ['src/index.ts'],
      }),
      typescript({tsconfig: './tsconfig.json'}),
      generatePackageJson({
        outputFolder: 'dist',
        baseContents: pkg => ({
          name: pkg.name,
          main: pkg.main.replace('src', 'dist'),
          dependencies: {},
          private: false,
        }),
      }),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()],
  },
];
