import * as fs from 'fs'

type route = string | { dark: string; light: string }

interface svg {
  id: number
  title: string
  category: string
  route: route
  url: string
}

interface tech {
  name: string
  icon: route
  category: string
  url: string
  custom?: boolean
}

const DIR = './public/tech'
const techs: tech[] = []

async function handleSingleIcon(
  filename: string,
  route: string
): Promise<route> {
  try {
    const data = await fetch(route).then((res) => res.text())
    const localRoute = `${DIR}/${filename}.svg`
    fs.writeFileSync(localRoute, data)

    console.log(`Downloaded ${filename}`)
    return localRoute
  } catch (error) {
    if (error.code === 'UND_ERR_CONNECT_TIMEOUT') {
      return handleSingleIcon(filename, route)
    }
  }
}

async function handleMultipleIcons(
  filename: string,
  route: {
    dark: string
    light: string
  }
): Promise<route> {
  const { dark, light } = route

  const darkPromise = fetch(dark)
    .then((res) => res.text())
    .then((data) => {
      const localRoute = `${DIR}/${filename}-dark.svg`
      fs.writeFileSync(localRoute, data)
      return localRoute
    })

  const lightPromise = fetch(light)
    .then((res) => res.text())
    .then((data) => {
      const localRoute = `${DIR}/${filename}-light.svg`
      fs.writeFileSync(localRoute, data)
      return localRoute
    })

  const result = await Promise.all([darkPromise, lightPromise])
    .then(([darkRoute, lightRoute]: [string, string]) => {
      return {
        dark: darkRoute,
        light: lightRoute,
      } as route
    })
    .catch((error) => {
      return null
    })

  if (!result) {
    return handleMultipleIcons(filename, route)
  }

  console.log(`Downloaded ${filename}`)
  return result
}

async function handleIcon(icon: svg): Promise<void> {
  const { id, title, route, category, url } = icon

  const hasDarkMode = typeof route === 'object'
  const filename = title
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace('/', '-')
    .replace('+', '')

  const localRoute = hasDarkMode
    ? await handleMultipleIcons(filename, route)
    : await handleSingleIcon(filename, route)

  techs.push({
    name: title,
    icon: localRoute,
    category,
    url,
  })
}

async function handleIcons(icons: svg[]) {
  const promises = icons.map((icon) => handleIcon(icon))
  await Promise.all(promises)
}

async function fetchIcons(): Promise<svg[]> {
  try {
    const res = await fetch('https://svgl.app/api/svgs')
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

fs.mkdirSync(DIR, { recursive: true })

const icons = await fetchIcons()
await handleIcons(icons)

try {
  const currentTechs = JSON.parse(
    fs.readFileSync('./public/tech.json', 'utf-8')
  )

  const currentCustomTechs = currentTechs.filter((tech: tech) => tech.custom)
  techs.push(...currentCustomTechs)

  for (const tech of techs) {
    const foundCurrentTech = currentTechs.find(
      (currentTech: tech) => currentTech.name === tech.name
    )

    if (foundCurrentTech && foundCurrentTech.alias) {
      tech.alias = foundCurrentTech.alias
    }
  }
} catch (e) {}

fs.writeFileSync('./public/tech.json', JSON.stringify(techs, null, 2), 'utf-8')
console.log('Done!')
