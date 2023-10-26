import { useRef } from "preact/hooks";
import { gsap } from "gsap";

export { Menu };

function Menu() {
  const DURATION = 0.3;

  const ButtonState = {
    OPEN: 0,
    CLOSED: 1,
  };

  const button = useRef();
  let buttonState = ButtonState.CLOSED;

  function toggleMenu() {
    const bar1 = button.current.children[0];
    const bar2 = button.current.children[1];
    const bar3 = button.current.children[2];

    buttonState =
      buttonState === ButtonState.CLOSED
        ? ButtonState.OPEN
        : ButtonState.CLOSED;

    if (buttonState === ButtonState.OPEN) {
      const y = button.current.getBoundingClientRect().y / 2.5;

      gsap.to(bar1, { rotate: -45, y, duration: DURATION });
      gsap.to(bar2, { opacity: 0, duration: DURATION });
      gsap.to(bar3, { rotate: 45, y: -y, duration: DURATION });
    } else if (buttonState === ButtonState.CLOSED) {
      gsap.to(bar1, { rotate: 0, y: 0, duration: DURATION });
      gsap.to(bar2, { opacity: 1, duration: DURATION });
      gsap.to(bar3, { rotate: 0, y: 0, duration: DURATION });
    }
  }

  return (
    <div className="mix-blend-exclusion p-6 flex justify-end">
      <button ref={button} onClick={toggleMenu} className="flex flex-col gap-2">
        <div className="w-6 h-[2px] bg-white"></div>
        <div className="w-6 h-[2px] bg-white"></div>
        <div className="w-6 h-[2px] bg-white"></div>
      </button>
    </div>
  );
}
