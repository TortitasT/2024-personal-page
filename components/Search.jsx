export { Search }

import { useEffect, useRef } from 'preact/hooks'

function Search({ setSearch, search, setSelected }) {
  const input = useRef(null)

  useEffect(() => {
    const keydownCallback = (e) => {
      if (e.key === 'Escape') {
        input.current?.blur()
      }
    }

    if (search.length === 0) {
      setSelected(0)
    }

    document.addEventListener('keydown', keydownCallback)
    return () => {
      document.removeEventListener('keydown', keydownCallback)
    }
  })

  return (
    <div className="border-primary flex items-center">
      <svg
        dataSlot="icon"
        aria-hidden="true"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 ml-2"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        className="p-2 bg-transparent w-full"
        type="text"
        placeholder="Search technologies, projects, etc."
        tabIndex={1}
        value={search}
        ref={input}
        onInput={(e) => setSearch(e.target.value)}
      />
      <div className="p-1 mr-2 border-primary text-[0.6rem] font-sans">
        Enter
      </div>
    </div>
  )
}
