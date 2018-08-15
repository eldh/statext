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
  external: ['react', 'react-dom', 'prop-types', 'statext'],
  plugins: [
    resolve(),
    babel({
      plugins: ['external-helpers'],
      exclude: 'node_modules/**',
    }),
  ],
}
