export { Back }

import { useRef } from 'preact/hooks'
import { gsap } from 'gsap'

function Back({ href }) {
  const arrow = useRef(null)
  const path = useRef(null)

  let debounce = false
  let onMouseOverTimeout = null
  let onMouseOutTimeout = null
  const DEBOUNCE_TIME = 300

  function onMouseEnter() {
    debounce = true
    clearTimeout(onMouseOverTimeout)

    gsap.to(arrow.current, { x: -3, duration: 0.1 })
    gsap.to(path.current, { x: -3, opacity: 1, duration: 0.1 })

    onMouseOverTimeout = setTimeout(() => {
      debounce = false
    }, DEBOUNCE_TIME)
  }

  function onMouseLeave() {
    clearTimeout(onMouseOutTimeout)
    if (debounce) {
      onMouseOutTimeout = setTimeout(() => {
        onMouseLeave()
      }, DEBOUNCE_TIME)
      return
    }

    gsap.to(arrow.current, { x: 0, duration: 0.1 })
    gsap.to(path.current, { x: 0, opacity: 0, duration: 0.1 })
  }

  return (
    <a
      href={href}
      className="flex items-center gap-2 py-4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={arrow}>←</div>
      <div ref={path} className="md:opacity-0">
        ~/blog
      </div>
    </a>
  )
}
