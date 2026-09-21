import { rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(pluginRoot, 'build')

const wpPackages = new Set([
  '@wordpress/blocks',
  '@wordpress/block-editor',
  '@wordpress/components',
  '@wordpress/element',
  '@wordpress/i18n',
])

const wpGlobals = {
  '@wordpress/blocks': 'wp.blocks',
  '@wordpress/block-editor': 'wp.blockEditor',
  '@wordpress/components': 'wp.components',
  '@wordpress/element': 'wp.element',
  '@wordpress/i18n': 'wp.i18n',
  react: 'React',
  'react-dom': 'ReactDOM',
}

function isWpExternal(id) {
  return wpPackages.has(id)
    || id.startsWith('@wordpress/')
    || id === 'react'
    || id === 'react-dom'
    || id === 'react/jsx-runtime'
}

async function buildEntry(entryKey, entryPath, { externalizeWp = false } = {}) {
  await build({
    plugins: externalizeWp ? [react({ jsxRuntime: 'classic' })] : [],
    build: {
      outDir,
      emptyOutDir: false,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          [entryKey]: entryPath,
        },
        external: externalizeWp ? id => isWpExternal(id) : undefined,
        output: {
          format: 'iife',
          globals: externalizeWp ? wpGlobals : undefined,
          entryFileNames: '[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return `${entryKey}.css`
            }

            return '[name][extname]'
          },
        },
      },
    },
  })
}

rmSync(outDir, { recursive: true, force: true })

const entries = [
  ['blocks/slider/index', resolve(pluginRoot, 'src/blocks/slider/index.js'), { externalizeWp: true }],
  ['blocks/slider/editor', resolve(pluginRoot, 'src/blocks/slider/editor.scss'), {}],
  ['blocks/slider/style', resolve(pluginRoot, 'src/blocks/slider/style.scss'), {}],
  ['blocks/slider/view', resolve(pluginRoot, 'src/blocks/slider/view.js'), {}],
  ['blocks/slide/index', resolve(pluginRoot, 'src/blocks/slide/index.js'), { externalizeWp: true }],
  ['blocks/slide/editor', resolve(pluginRoot, 'src/blocks/slide/editor.scss'), {}],
  ['blocks/slide/style', resolve(pluginRoot, 'src/blocks/slide/style.scss'), {}],
]

for (const [key, path, options] of entries) {
  await buildEntry(key, path, options)
}

console.log('Block assets built completed.')
