import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Save the slider markup that Keen Slider enhances on the frontend.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Saved block attributes.
 */
export default function Save( { attributes } ) {
	const {
		loop = true,
		center = false,
		padding = 16,
		arrows = false,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: arrows
			? 'keen-slider-wpblock keen-slider-wpblock--has-arrows'
			: 'keen-slider-wpblock',
		'data-loop': loop ? 'true' : 'false',
		'data-center': center ? 'true' : 'false',
		'data-padding': String( padding ),
		'data-arrows': arrows ? 'true' : 'false',
	} );

	return (
		<div { ...blockProps }>
			<div className="keen-slider-wpblock__container keen-slider">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
