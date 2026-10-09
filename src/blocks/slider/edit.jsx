import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'keen-slider-wpblock/slide' ];
const TEMPLATE = [ [ 'keen-slider-wpblock/slide' ] ];

/**
 * Edit the slider block and its sidebar settings.
 *
 * @param {Object}   props               Block editor props.
 * @param {Object}   props.attributes    Saved block attributes.
 * @param {Function} props.setAttributes Update block attributes.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		loop = true,
		center = false,
		padding = 16,
		arrows = false,
	} = attributes;

	const blockProps = useBlockProps( {
		className: arrows
			? 'keen-slider-wpblock keen-slider-wpblock--has-arrows'
			: 'keen-slider-wpblock',
		'data-loop': loop ? 'true' : 'false',
		'data-center': center ? 'true' : 'false',
		'data-padding': String( padding ),
		'data-arrows': arrows ? 'true' : 'false',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody initialOpen title={ __( 'Slider settings', 'keen-slider-wpblock' ) }>
					<ToggleControl
						checked={ loop }
						label={ __( 'Loop', 'keen-slider-wpblock' ) }
						onChange={ value => setAttributes( { loop: value } ) }
					/>
					<ToggleControl
						checked={ center }
						label={ __( 'Center position', 'keen-slider-wpblock' ) }
						onChange={ value => setAttributes( { center: value } ) }
					/>
					<ToggleControl
						checked={ arrows }
						help={ __( 'Show previous and next navigation arrows.', 'keen-slider-wpblock' ) }
						label={ __( 'Arrows', 'keen-slider-wpblock' ) }
						onChange={ value => setAttributes( { arrows: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding', 'keen-slider-wpblock' ) }
						max={ 120 }
						min={ 0 }
						step={ 1 }
						value={ padding }
						onChange={ value => setAttributes( { padding: value ?? 0 } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="keen-slider-wpblock__container keen-slider">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
						template={ TEMPLATE }
					/>
				</div>
			</div>
		</>
	);
}
