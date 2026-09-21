import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'keen-slider-wpblock__slide keen-slider__slide',
  })

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
