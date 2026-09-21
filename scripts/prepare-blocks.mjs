import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = resolve(pluginRoot, 'build')

const EDITOR_SCRIPT_DEPS = [
  'react',
  'react-dom',
  'wp-blocks',
  'wp-block-editor',
  'wp-components',
  'wp-element',
  'wp-i18n',
]

const blocks = [
  { name: 'slider', hasViewScript: true },
  { name: 'slide', hasViewScript: false },
]

function writeAssetFile(targetDir, fileName, dependencies) {
  const depsExport = dependencies.map(dep => `'${dep}'`).join(', ')
  const contents = `<?php return array('dependencies' => array(${depsExport}), 'version' => '${String(Date.now())}');\n`

  writeFileSync(resolve(targetDir, `${fileName}.asset.php`), contents)
}

for (const block of blocks) {
  const sourceDir = resolve(pluginRoot, 'src/blocks', block.name)
  const targetDir = resolve(pluginRoot, 'build/blocks', block.name)

  mkdirSync(targetDir, { recursive: true })
  cpSync(resolve(sourceDir, 'block.json'), resolve(targetDir, 'block.json'))

  writeAssetFile(targetDir, 'index', EDITOR_SCRIPT_DEPS)

  if (block.hasViewScript) {
    writeAssetFile(targetDir, 'view', [])
  }
}

for (const stub of fg.sync(['blocks/**/{editor,style}.js', 'blocks/**/index.css', 'blocks/**/view.css'], { cwd: buildDir, absolute: true })) {
  rmSync(stub, { force: true })
}

console.log('Prepared block metadata in build/blocks/')
