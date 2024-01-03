import { useState, useMemo, useEffect, useRef } from 'preact/hooks'
import { Search } from '../components/search'

import tech from '../public/tech.json'

const SHOWN_CATEGORIES = ['Language', 'Framework']

function SearchResults({ show, filteredSearch }) {
  if (!show) {
    return
  }

  const [selected, setSelected] = useState(0)
  const scrollElement = useRef(null)

  useEffect(() => {
    const keydownCallback = (e) => {
      if (e.key === 'ArrowDown') {
        if (selected >= filteredSearch.length - 1) {
          return
        }

        setSelected((selected) => selected + 1)
      }

      if (e.key === 'ArrowUp') {
        if (selected === 0) {
          return
        }

        setSelected((selected) => selected - 1)
      }
    }

    if (selected > filteredSearch.length - 1 && filteredSearch.length > 0) {
      setSelected(filteredSearch.length - 1)
    }

    setTimeout(() => {
      const selectedElement = scrollElement.current.children[selected]
      scrollElement.current.scrollTo({
        top: selectedElement.offsetTop - 500,
        behavior: 'smooth',
      })
    })

    window.addEventListener('keydown', keydownCallback)
    return () => {
      window.removeEventListener('keydown', keydownCallback)
    }
  })

  return (
    <div
      className="flex flex-col gap-2 mt-4 max-h-[50vh] overflow-y-auto"
      ref={scrollElement}
    >
      {filteredSearch.map((technology, index) => {
        return (
          <div
            className={
              'flex flex-col gap-2 p-2 text-sm' +
              (selected === index ? ' bg-gray-400/20 rounded-md' : '')
            }
            onClick={() => setSelected(index)}
          >
            <h2 className="">{technology.name}</h2>
          </div>
        )
      })}
    </div>
  )
}

export function Page() {
  const [search, setSearch] = useState('')
  const [filteredTech, setFilteredTech] = useState(
    tech.filter((technology) => SHOWN_CATEGORIES.includes(technology.category))
  )

  // const categories = useMemo(() => {
  //   return tech
  //     .reduce((acc, technology) => {
  //       if (!acc.find((category) => category.name === technology.category)) {
  //         acc.push({
  //           name: technology.category,
  //           tech: [technology],
  //         })
  //       } else {
  //         acc
  //           .find((category) => category.name === technology.category)
  //           .tech.push(technology)
  //       }
  //
  //       return acc
  //     }, [])
  //     .sort((a, b) => b.tech.length - a.tech.length)
  // })

  const filteredSearch = useMemo(() => {
    return filteredTech.filter((technology) => {
      return technology.name.toLowerCase().includes(search.toLowerCase())
    })
  })

  return (
    <main className="p-6 flex flex-col gap-8 max-w-xl text-justify mix-blend-exclusion">
      <h1 className="text-6xl">projects</h1>

      <div className="p-4 border-primary">
        <Search setSearch={setSearch} />

        <SearchResults
          show={search.length > 0}
          filteredSearch={filteredSearch}
        />
      </div>

      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}

      {/* <pre>{JSON.stringify(tech, null, 2)}</pre> */}
    </main>
  )
}
