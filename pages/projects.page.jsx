import { useState, useMemo, useEffect, useRef } from 'preact/hooks'
import { Search } from '../components/Search.jsx'

import tech from '../public/tech.json'

const SHOWN_CATEGORIES = ['Language', 'Framework', 'Library']

function SearchResults({ show, filteredSearch, addFilter }) {
  if (!show) {
    return
  }

  const [selected, setSelected] = useState(0)
  const scrollElement = useRef(null)

  useEffect(() => {
    const keydownCallback = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()

        if (selected >= filteredSearch.length - 1) {
          return
        }

        setSelected((selected) => selected + 1)
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()

        if (selected === 0) {
          return
        }

        setSelected((selected) => selected - 1)
      }

      if (e.key === 'Enter') {
        const selectedTechnology = filteredSearch[selected]

        if (!selectedTechnology) {
          return
        }

        addFilter(selectedTechnology)
      }
    }

    if (selected > filteredSearch.length - 1 && filteredSearch.length > 0) {
      setSelected(filteredSearch.length - 1)
    }

    setTimeout(() => {
      const selectedElement = scrollElement.current?.children[selected] ?? null

      if (!selectedElement) {
        return
      }

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
      className="flex flex-col gap-2 mt-2 max-h-[50vh] overflow-y-auto"
      ref={scrollElement}
    >
      {filteredSearch.map((technology, index) => {
        return (
          <div
            className={
              'flex flex-col gap-1 p-2 text-sm' +
              (selected === index ? ' bg-gray-400/20 rounded-md' : '')
            }
            onClick={() => setSelected(index)}
          >
            <h2>{technology.name}</h2>
            <small>{technology.category}</small>
          </div>
        )
      })}
    </div>
  )
}

function SearchFilters({ filters, removeFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {filters.map((technology) => {
        return (
          <div className="p-1 border-primary text-[0.6rem]">
            {technology.name}
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
  const [filters, setFilters] = useState([])

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

        <SearchFilters
          filters={filters}
          removeFilter={(technology) => {
            setFilters((filters) =>
              filters.filter((filter) => filter.name !== technology.name)
            )
          }}
        />

        <SearchResults
          show={search.length > 0}
          filteredSearch={filteredSearch}
          addFilter={(technology) => {
            const alreadyFiltered = filters.find(
              (filter) => filter.name === technology.name
            )

            if (alreadyFiltered) {
              return
            }

            setFilters((filters) => [...filters, technology])
            setSearch('')
          }}
        />
      </div>
    </main>
  )
}
