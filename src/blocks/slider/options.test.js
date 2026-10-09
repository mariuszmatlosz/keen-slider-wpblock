import { describe, expect, it } from 'vitest';

import { getArrowDisabledState, getSliderOptions } from './options.js';

describe( 'getSliderOptions', () => {
	it( 'maps loop and uses one full slide when centering is off', () => {
		expect( getSliderOptions( {
			loop: 'true',
			center: 'false',
			padding: '16',
		} ) ).toEqual( {
			loop: true,
			slides: {
				spacing: 16,
				perView: 1,
			},
		} );
	} );

	it( 'peeks neighboring slides and centers the active slide', () => {
		expect( getSliderOptions( {
			loop: 'false',
			center: 'true',
			padding: '8',
		} ) ).toEqual( {
			loop: false,
			slides: {
				spacing: 8,
				perView: 1.2,
				origin: 'center',
			},
		} );
	} );

	it( 'treats a missing or non-numeric padding as zero', () => {
		expect( getSliderOptions( {
			loop: 'false',
			center: 'false',
		} ).slides.spacing ).toBe( 0 );
		expect( getSliderOptions( { padding: 'wide' } ).slides.spacing ).toBe( 0 );
	} );
} );

describe( 'getArrowDisabledState', () => {
	it( 'keeps both arrows available while looping', () => {
		expect( getArrowDisabledState( {
			rel: 0,
			maxIdx: 3,
			loop: true,
		} ) ).toEqual( {
			previous: false,
			next: false,
		} );
	} );

	it( 'disables the previous arrow on the first slide', () => {
		expect( getArrowDisabledState( {
			rel: 0,
			maxIdx: 3,
			loop: false,
		} ) ).toEqual( {
			previous: true,
			next: false,
		} );
	} );

	it( 'disables the next arrow on the last slide', () => {
		expect( getArrowDisabledState( {
			rel: 3,
			maxIdx: 3,
			loop: false,
		} ) ).toEqual( {
			previous: false,
			next: true,
		} );
	} );

	it( 'disables both arrows when there is only one slide', () => {
		expect( getArrowDisabledState( {
			rel: 0,
			maxIdx: 0,
			loop: false,
		} ) ).toEqual( {
			previous: true,
			next: true,
		} );
	} );
} );
