import KeenSlider from 'keen-slider'

function getSliderOptions(element) {
  const loop = element.dataset.loop === 'true'
  const center = element.dataset.center === 'true'
  const padding = Number.parseInt(element.dataset.padding || '0', 10)

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

function createArrowsPlugin() {
  return function navigation(slider) {
    let wrapper
    let arrowLeft
    let arrowRight

    function removeElement(element) {
      if (element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }

    function createButton(className, label, onClick) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = className
      button.setAttribute('aria-label', label)
      button.addEventListener('click', onClick)
      return button
    }

    function markup(remove) {
      if (remove) {
        removeElement(arrowLeft)
        removeElement(arrowRight)

        if (wrapper) {
          const parent = wrapper.parentNode

          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper)
          }

          removeElement(wrapper)
          wrapper = undefined
          arrowLeft = undefined
          arrowRight = undefined
        }

        return
      }

      wrapper = document.createElement('div')
      wrapper.className = 'keen-slider-wpblock__navigation'
      slider.container.parentNode.insertBefore(wrapper, slider.container)
      wrapper.appendChild(slider.container)

      arrowLeft = createButton(
        'keen-slider-wpblock__arrow keen-slider-wpblock__arrow--left',
        'Previous slide',
        () => slider.prev(),
      )
      arrowRight = createButton(
        'keen-slider-wpblock__arrow keen-slider-wpblock__arrow--right',
        'Next slide',
        () => slider.next(),
      )

      wrapper.appendChild(arrowLeft)
      wrapper.appendChild(arrowRight)
    }

    function updateDisabledState() {
      if (!arrowLeft || !arrowRight) {
        return
      }

      const { rel, maxIdx } = slider.track.details
      const atStart = rel === 0
      const atEnd = rel === maxIdx

      if (slider.options.loop) {
        arrowLeft.disabled = false
        arrowRight.disabled = false
        return
      }

      arrowLeft.disabled = atStart
      arrowRight.disabled = atEnd
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

function initSlider(element) {
  const container = element.querySelector('.keen-slider-wpblock__container')

  if (!container || container.dataset.keenSliderInitialized === 'true') {
    return
  }

  container.dataset.keenSliderInitialized = 'true'

  const arrows = element.dataset.arrows === 'true'
  const plugins = arrows ? [createArrowsPlugin()] : []

  new KeenSlider(container, getSliderOptions(element), plugins)
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.wp-block-keen-slider-wpblock-slider')
    .forEach(initSlider)
})
