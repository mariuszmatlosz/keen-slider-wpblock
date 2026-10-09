import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Save a slide and the blocks nested inside it.
 */
export default function Save() {
	const blockProps = useBlockProps.save( {
		className: 'keen-slider-wpblock__slide keen-slider__slide',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
