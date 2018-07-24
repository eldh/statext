import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  external: ['statext', 'react', 'prop-types'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
