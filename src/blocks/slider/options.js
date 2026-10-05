/**
 * Map block data attributes to Keen Slider options.
 *
 * Padding falls back to 0 when the attribute is missing or not numeric.
 * Center mode peeks the neighboring slides and anchors the active slide.
 *
 * @param {Object} dataset         Block data attributes.
 * @param {string} dataset.loop    Whether the slider loops.
 * @param {string} dataset.center  Whether the active slide is centered.
 * @param {string} dataset.padding Spacing between slides, in pixels.
 * @return {Object} Keen Slider constructor options.
 */
export function getSliderOptions(dataset = {}) {
  const loop = dataset.loop === 'true'
  const center = dataset.center === 'true'
  const padding = Number.parseInt(dataset.padding || '0', 10)

  const slides = {
    spacing: Number.isNaN(padding) ? 0 : padding,
    perView: center ? 1.2 : 1,
  }

  if (center) {
    slides.origin = 'center'
  }

  return {
    loop,
    slides,
  }
}

/**
 * Decide which navigation arrows are disabled.
 *
 * A looping slider always keeps both arrows available. Otherwise the
 * previous arrow stops on the first slide and the next arrow on the last.
 *
 * @param {Object}  details        Current track position.
 * @param {number}  details.rel    Active slide index.
 * @param {number}  details.maxIdx Last reachable slide index.
 * @param {boolean} details.loop   Whether the slider loops.
 * @return {{previous: boolean, next: boolean}} Disabled flags for each arrow.
 */
export function getArrowDisabledState({ rel, maxIdx, loop }) {
  if (loop) {
    return {
      previous: false,
      next: false,
    }
  }

  return {
    previous: rel === 0,
    next: rel === maxIdx,
  }
}
