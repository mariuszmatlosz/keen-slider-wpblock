import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

const TEMPLATE = [
  ['core/paragraph', { placeholder: __('Slide content…', 'keen-slider-wpblock') }],
]

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'keen-slider-wpblock__slide keen-slider__slide',
  })

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  )
}
