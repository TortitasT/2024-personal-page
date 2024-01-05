import { useState, useMemo, useEffect, useRef } from 'preact/hooks'
import { Search } from '../components/Search.jsx'
import { similarity } from '../lib/similarity.js'

import tech from './assets/tech.json'
import projects from './assets/projects.json'

const SHOWN_CATEGORIES = ['Language', 'Framework', 'Library', 'Software']
const INITIAL_FILTERED_TECH = tech
  .filter((technology) => SHOWN_CATEGORIES.includes(technology.category))
  .filter((technology) => {
    return projects.some((project) => {
      return (
        project.technologies.includes(technology.name.toLowerCase()) ||
        project.technologies.includes(technology.alias?.toLowerCase())
      )
    })
  })

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

function SearchAutocomplete({
  show,
  filteredSearch,
  addFilter,
  search,
  removeLastFilter,
  selected,
  setSelected,
}) {
  const [selectedModifiedByKeyboard, setSelectedModifiedByKeyboard] =
    useState(false)
  const scrollElement = useRef(null)

  let backspaceCount = 0

  useEffect(() => {
    const keydownCallback = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()

        if (selected >= filteredSearch.length - 1) {
          return
        }

        setSelectedModifiedByKeyboard(true)
        setSelected((selected) => selected + 1)
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()

        if (selected === 0) {
          return
        }

        setSelectedModifiedByKeyboard(true)
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

    if (selectedModifiedByKeyboard) {
      setTimeout(() => {
        const selectedElement =
          scrollElement.current?.children[selected] ?? null
        if (!selectedElement) {
          return
        }

        scrollElement.current.scrollTo({
          top: selectedElement.offsetTop - 500,
          behavior: 'smooth',
        })

        setSelectedModifiedByKeyboard(false)
      })
    }

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
              'flex items-center justify-between gap-2 cursor-pointer p-2 text-sm' +
              (selected === index ? ' bg-gray-400/20 rounded-md' : '')
            }
            onClick={(e) => {
              addFilter(technology)
            }}
            onMouseEnter={() => setSelected(index)}
          >
            <div className="flex flex-col gap-1">
              <h2>{technology.name}</h2>
              <small>{technology.category}</small>
            </div>
            {technology.icon && (
              <img
                src={(technology.icon?.dark || false
                  ? technology.icon.dark
                  : technology.icon
                ).replace('/public', '')}
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

function SearchResults({ filteredProjects, filters, setFilters }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      {filteredProjects.map((project) => {
        return (
          <a
            href={project.url}
            target="_blank"
            className="cursor-pointer p-4 grid grid-cols-1 md:grid-cols-2  gap-2 border-primary"
          >
            <div>
              <h2 className="text-2xl">{project.name}</h2>
              <small className="text-sm opacity-50">{project.full_name}</small>
            </div>

            <div className="flex justify-end items-start">
              {project.fork ? (
                <div className="p-1 border-primary text-[0.6rem] opacity-50">
                  Fork
                </div>
              ) : null}
            </div>

            <p className="text-sm mt-2 md:col-span-2">{project.description}</p>

            <div className="flex flex-wrap items-end justify-end gap-2 md:col-span-2">
              {project.technologies.map((technology) => {
                return (
                  <div className="p-1 border-primary text-[0.6rem]">
                    {technology}
                  </div>
                )
              })}
            </div>
          </a>
        )
      })}
      {filters.length > 0 && (
        <button
          className="cursor-pointer p-4 border-primary"
          onClick={() => {
            setFilters([])
          }}
        >
          <h2>Want more? Clear filters!</h2>
        </button>
      )}
    </div>
  )
}

export function Page() {
  const [search, setSearch] = useState('')
  const [filteredTech, setFilteredTech] = useState(INITIAL_FILTERED_TECH)
  const [filters, setFilters] = useState([])
  const [selected, setSelected] = useState(0)

  const filteredSearch = useMemo(() => {
    return filteredTech
      .filter((technology) => {
        return !filters.find((filter) => filter.name === technology.name)
      })
      .map((technology) => {
        return {
          ...technology,

          search_score: similarity(technology.name, search.toLowerCase()),
          alias_score: technology.alias
            ? similarity(technology.alias, search.toLowerCase())
            : 0,

          projects_count: projects.filter((project) => {
            return (
              project.technologies.includes(technology.name.toLowerCase()) ||
              project.technologies.includes(technology.alias?.toLowerCase())
            )
          }).length,
        }
      })
      .sort((a, b) => {
        return b.projects_count - a.projects_count
      })
      .sort((a, b) => {
        return b.alias_score - a.alias_score
      })
      .sort((a, b) => {
        return b.search_score - a.search_score
      })
  })

  const filteredProjects = useMemo(() => {
    if (filters.length === 0) {
      return projects
    }

    return projects.filter((project) => {
      return filters.some((filter) => {
        return (
          project.technologies.includes(filter.name.toLowerCase()) ||
          project.technologies.includes(filter.alias?.toLowerCase())
        )
      })
    })
  })

  return (
    <main className="p-4 sm:p-6 flex flex-col gap-8 text-justify mix-blend-exclusion">
      <h1 className="text-6xl">projects</h1>

      <div className="p-4 border-primary max-w-xl">
        <Search
          setSearch={setSearch}
          search={search}
          setSelected={setSelected}
        />

        <SearchFilters
          filters={filters}
          removeFilter={(technology) => {
            setFilters(
              filters.filter((filter) => filter.name !== technology.name)
            )
          }}
        />

        <SearchAutocomplete
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
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <SearchResults
        filteredProjects={filteredProjects}
        filters={filters}
        setFilters={setFilters}
      />
    </main>
  )
}
