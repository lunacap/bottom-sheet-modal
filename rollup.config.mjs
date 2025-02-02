import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

import packageJson from './package.json' with {type: 'json'};

export default [
  {
    input: packageJson.main,
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: false,
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
          author: pkg.author,
          homepage: pkg.homepage,
          description: pkg.description,
          bugs: pkg.bugs,
          repository: pkg.repository,
          keywords: pkg.keywords,
          license: pkg.license,
          main: 'index.esm.js',
          version: pkg.version,
          publishConfig: pkg.publishConfig,
          dependencies: {},
          peerDependencies: pkg.peerDependencies,
          private: false,
        }),
      }),
      copy({
        targets: [{src: 'README.md', dest: 'dist'}],
      }),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()],
  },
];
