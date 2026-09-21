import { registerBlockType } from '@wordpress/blocks'
import metadata from './block.json'
import edit from './edit.jsx'
import save from './save.jsx'

registerBlockType(metadata, {
  edit,
  save,
})
