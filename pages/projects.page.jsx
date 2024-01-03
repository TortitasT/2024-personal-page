import { useState, useMemo, useEffect, useRef } from 'preact/hooks'
import { Search } from '../components/Search.jsx'

import tech from '../public/tech.json'
import projects from '../public/projects.json'

const SHOWN_CATEGORIES = ['Language', 'Framework', 'Library']

function SearchResults({
  show,
  filteredSearch,
  addFilter,
  search,
  removeLastFilter,
}) {
  const [selected, setSelected] = useState(0)
  const scrollElement = useRef(null)

  let backspaceCount = 0

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

      if (e.key === 'Backspace' && search.length === 0) {
        backspaceCount++

        if (backspaceCount === 2) {
          removeLastFilter()
          backspaceCount = 0
        }
      } else {
        backspaceCount = 0
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

  if (!show) {
    return
  }

  return (
    <div
      className="flex flex-col gap-2 mt-2 max-h-[50vh] overflow-y-auto"
      ref={scrollElement}
    >
      {filteredSearch.map((technology, index) => {
        return (
          <div
            className={
              'flex items-center justify-between gap-2 p-2 text-sm' +
              (selected === index ? ' bg-gray-400/20 rounded-md' : '')
            }
            onClick={() => setSelected(index)}
          >
            <div className="flex flex-col gap-1">
              <h2>{technology.name}</h2>
              <small>{technology.category}</small>
            </div>
            {technology.icon && (
              <img
                src={
                  new URL(
                    technology.icon?.dark || false
                      ? technology.icon.dark
                      : technology.icon,
                    import.meta.url.replace('pages', '')
                  ).href
                }
                className="h-6 w-6 mr-2"
                alt={`${technology.name} icon`}
              />
            )}
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

            <button
              onClick={() => removeFilter(technology)}
              className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
            >
              X
            </button>
          </div>
        )
      })}
      {filters.length === 0 && (
        <div className="p-1 border-primary text-[0.6rem] opacity-50">
          No filters
        </div>
      )}
    </div>
  )
}

export function Page() {
  const [search, setSearch] = useState('')
  const [filteredTech, setFilteredTech] = useState(
    tech
      .filter((technology) => SHOWN_CATEGORIES.includes(technology.category))
      .filter((technology) => {
        return projects.some((project) => {
          return project.technologies.includes(technology.name.toLowerCase())
        })
      })
  )
  const [filters, setFilters] = useState([])

  const filteredSearch = useMemo(() => {
    return filteredTech
      .filter((technology) => {
        return !filters.find((filter) => filter.name === technology.name)
      })
      .filter((technology) => {
        return technology.name.toLowerCase().includes(search.toLowerCase())
      })
  })

  const filteredProjects = useMemo(() => {
    if (filters.length === 0) {
      return projects
    }

    return projects.filter((project) => {
      return filters.some((filter) => {
        return project.technologies.includes(filter.name.toLowerCase())
      })
    })
  })

  return (
    <main className="p-4 sm:p-6 flex flex-col gap-8 text-justify mix-blend-exclusion">
      <h1 className="text-6xl">projects</h1>

      <div className="p-4 border-primary max-w-xl">
        <Search setSearch={setSearch} search={search} />

        <SearchFilters
          filters={filters}
          removeFilter={(technology) => {
            setFilters(
              filters.filter((filter) => filter.name !== technology.name)
            )
          }}
        />

        <SearchResults
          show={search.length > 0 && filteredSearch.length > 0}
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
          search={search}
          removeLastFilter={() => {
            setFilters((filters) => filters.slice(0, filters.length - 1))
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {filteredProjects.map((project) => {
          return (
            <div className="p-4 grid grid-cols-3 auto-rows-fr gap-2 border-primary bg-black">
              <div className="col-span-2 w-max">
                <h2 className="text-2xl">{project.name}</h2>
                <small className="text-sm opacity-50">
                  {project.full_name}
                </small>
              </div>

              <div className="flex justify-end items-start">
                {project.fork ? (
                  <div className="p-1 border-primary text-[0.6rem] opacity-50">
                    Fork
                  </div>
                ) : null}
              </div>

              <p className="text-sm mt-2 col-span-3">{project.description}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
