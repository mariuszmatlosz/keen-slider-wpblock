import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor'
import {
  PanelBody,
  RangeControl,
  ToggleControl,
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const ALLOWED_BLOCKS = ['keen-slider-wpblock/slide']
const TEMPLATE = [['keen-slider-wpblock/slide']]

export default function Edit({ attributes, setAttributes }) {
  const {
    loop = true,
    center = false,
    padding = 16,
    arrows = false,
  } = attributes

  const blockProps = useBlockProps({
    className: arrows
      ? 'keen-slider-wpblock keen-slider-wpblock--has-arrows'
      : 'keen-slider-wpblock',
    'data-loop': loop ? 'true' : 'false',
    'data-center': center ? 'true' : 'false',
    'data-padding': String(padding),
    'data-arrows': arrows ? 'true' : 'false',
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Slider settings', 'keen-slider-wpblock')} initialOpen>
          <ToggleControl
            label={__('Loop', 'keen-slider-wpblock')}
            checked={loop}
            onChange={value => setAttributes({ loop: value })}
          />
          <ToggleControl
            label={__('Center position', 'keen-slider-wpblock')}
            checked={center}
            onChange={value => setAttributes({ center: value })}
          />
          <ToggleControl
            label={__('Arrows', 'keen-slider-wpblock')}
            checked={arrows}
            onChange={value => setAttributes({ arrows: value })}
            help={__('Show previous and next navigation arrows.', 'keen-slider-wpblock')}
          />
          <RangeControl
            label={__('Padding', 'keen-slider-wpblock')}
            value={padding}
            onChange={value => setAttributes({ padding: value ?? 0 })}
            min={0}
            max={120}
            step={1}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="keen-slider-wpblock__container keen-slider">
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
            renderAppender={InnerBlocks.ButtonBlockAppender}
          />
        </div>
      </div>
    </>
  )
}
