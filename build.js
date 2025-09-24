require('esbuild').buildSync({
  bundle: true,
  entryPoints: ['src/index.ts'],
  external: ['zod', 'react-router'],
  outfile: 'dist/index.js',
  platform: 'node',
  target: ['node16'],
});
