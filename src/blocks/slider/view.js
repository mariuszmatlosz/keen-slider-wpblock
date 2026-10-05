import { __ } from '@wordpress/i18n'
import KeenSlider from 'keen-slider'
import { getArrowDisabledState, getSliderOptions } from './options.js'

/**
 * Remove a node created for the slider controls.
 *
 * @param {HTMLElement|undefined} element Element to remove.
 */
function removeElement(element) {
  if (element?.parentNode) {
    element.parentNode.removeChild(element)
  }
}

/**
 * Create an accessible slider control.
 *
 * Buttons are built with the DOM API so the label is never parsed as HTML.
 *
 * @param {string}   className Control class names.
 * @param {string}   label     Accessible name.
 * @param {Function} onClick   Click handler.
 * @return {HTMLButtonElement} Navigation button.
 */
function createButton(className, label, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = className
  button.setAttribute('aria-label', label)
  button.addEventListener('click', onClick)
  return button
}

/**
 * Keen Slider plugin that adds previous and next buttons.
 *
 * Controls live outside the saved markup so the block stays static in the
 * editor and only becomes interactive on the frontend.
 *
 * @return {Function} Plugin registered with Keen Slider.
 */
function createArrowsPlugin() {
  return function navigation(slider) {
    let wrapper
    let arrowPrevious
    let arrowNext

    function markup(remove) {
      if (remove) {
        removeElement(arrowPrevious)
        removeElement(arrowNext)

        if (wrapper) {
          const parent = wrapper.parentNode

          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper)
          }

          removeElement(wrapper)
          wrapper = undefined
          arrowPrevious = undefined
          arrowNext = undefined
        }

        return
      }

      wrapper = document.createElement('div')
      wrapper.className = 'keen-slider-wpblock__navigation'
      slider.container.parentNode.insertBefore(wrapper, slider.container)
      wrapper.appendChild(slider.container)

      arrowPrevious = createButton(
        'keen-slider-wpblock__arrow keen-slider-wpblock__arrow--previous',
        __('Previous slide', 'keen-slider-wpblock'),
        () => slider.prev(),
      )
      arrowNext = createButton(
        'keen-slider-wpblock__arrow keen-slider-wpblock__arrow--next',
        __('Next slide', 'keen-slider-wpblock'),
        () => slider.next(),
      )

      wrapper.appendChild(arrowPrevious)
      wrapper.appendChild(arrowNext)
    }

    function updateDisabledState() {
      if (!arrowPrevious || !arrowNext || !slider.track.details) {
        return
      }

      const { rel, maxIdx } = slider.track.details
      const disabled = getArrowDisabledState({
        rel,
        maxIdx,
        loop: Boolean(slider.options.loop),
      })

      arrowPrevious.disabled = disabled.previous
      arrowNext.disabled = disabled.next
    }

    slider.on('created', () => {
      markup()
      updateDisabledState()
    })
    slider.on('optionsChanged', () => {
      markup(true)
      markup()
      updateDisabledState()
    })
    slider.on('slideChanged', updateDisabledState)
    slider.on('destroyed', () => markup(true))
  }
}

/**
 * Start Keen Slider for one block, once.
 *
 * The initialized flag guards against a second pass if the script runs
 * again on the same container.
 *
 * @param {HTMLElement} element Slider block root.
 */
function initSlider(element) {
  const container = element.querySelector('.keen-slider-wpblock__container')

  if (!container || container.dataset.keenSliderInitialized === 'true') {
    return
  }

  container.dataset.keenSliderInitialized = 'true'

  const arrows = element.dataset.arrows === 'true'
  const plugins = arrows ? [createArrowsPlugin()] : []
  const slider = new KeenSlider(container, getSliderOptions(element.dataset), plugins)

  container.keenSlider = slider
}

/**
 * Initialize every slider block after the markup is available.
 */
function initSliders() {
  document.querySelectorAll('.wp-block-keen-slider-wpblock-slider').forEach(initSlider)
}

document.addEventListener('DOMContentLoaded', initSliders)
