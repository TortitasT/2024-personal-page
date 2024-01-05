import { useRef, useEffect } from 'preact/hooks'
import { gsap } from 'gsap'

export { Menu }

function Menu() {
  const DURATION = 0.3

  const menu = useRef()
  const button = useRef()
  const buttonBar1 = useRef()
  const buttonBar2 = useRef()
  const buttonBar3 = useRef()
  let buttonState = false

  useEffect(() => {
    gsap.set(menu.current, { opacity: 0, x: 100 })
  }, [])

  function openButton() {
    const y = button.current.getBoundingClientRect().y / 2.5

    gsap.to(buttonBar1.current, { rotate: -45, y, duration: DURATION })
    gsap.to(buttonBar2.current, { opacity: 0, duration: DURATION })
    gsap.to(buttonBar3.current, { rotate: 45, y: -y, duration: DURATION })

    openMenu()
  }

  function closeButton() {
    const y = button.current.getBoundingClientRect().y / 2.5

    gsap.to(buttonBar1.current, { rotate: 0, y: 0, duration: DURATION })
    gsap.to(buttonBar2.current, { opacity: 1, duration: DURATION })
    gsap.to(buttonBar3.current, { rotate: 0, y: 0, duration: DURATION })

    closeMenu()
  }

  function openMenu() {
    gsap.to(menu.current, { opacity: 1, x: 0, duration: DURATION })
  }

  function closeMenu() {
    gsap.to(menu.current, { opacity: 0, x: 100, duration: DURATION })
  }

  function toggleMenu() {
    buttonState ? closeButton() : openButton()
    buttonState = !buttonState
  }

  return (
    <div className="mix-blend-exclusion p-6 flex justify-end sticky z-20">
      <button ref={button} onClick={toggleMenu} className="flex flex-col gap-2">
        <div ref={buttonBar1} className="w-6 h-[2px] bg-white"></div>
        <div ref={buttonBar2} className="w-6 h-[2px] bg-white"></div>
        <div ref={buttonBar3} className="w-6 h-[2px] bg-white"></div>
      </button>

      <nav
        ref={menu}
        className="flex flex-col gap-2 absolute top-16 right-6 text-xl z-20"
        style="transition: none 0s ease 0s; transform: translate(100px); translate: none; rotate: none; scale: none; opacity: 0;"
      >
        <a href="/" className="text-white">
          Home
        </a>
        <a href="/about" className="text-white">
          About
        </a>
        <a href="/projects" className="text-white">
          Projects
        </a>
        <a href="/blog" className="text-white">
          Blog
        </a>
      </nav>
    </div>
  )
}
