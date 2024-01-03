import * as fs from 'fs'

interface svg {
  id: number
  title: string
  category: string
  route:
    | string
    | {
        dark: string
        light: string
      }
  url: string
}

const DIR = './public/tech'

async function handleSingleIcon(
  filename: string,
  route: string
): Promise<void> {
  try {
    const data = await fetch(route).then((res) => res.text())
    fs.writeFileSync(`${DIR}/${filename}.svg`, data)

    console.log(`Downloaded ${filename}`)
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
): Promise<void> {
  try {
    const { dark, light } = route

    const darkData = fetch(dark)
      .then((res) => res.text())
      .then((data) => {
        fs.writeFileSync(`${DIR}/${filename}-dark.svg`, data)
      })

    const lightData = fetch(light)
      .then((res) => res.text())
      .then((data) => {
        fs.writeFileSync(`${DIR}/${filename}-light.svg`, data)
      })

    await Promise.all([darkData, lightData]).catch((e) => {
      if (e.code === 'UND_ERR_CONNECT_TIMEOUT') {
        return handleMultipleIcons(filename, route)
      }
    })

    console.log(`Downloaded ${filename}`)
  } catch (error) {
    console.warn(error, route)
  }
}

async function handleIcon(icon: svg): Promise<void> {
  const { id, title, route } = icon

  const hasDarkMode = typeof route === 'object'
  const filename = title
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace('/', '-')
    .replace('+', '')

  if (hasDarkMode) {
    return await handleMultipleIcons(filename, route)
  }

  return await handleSingleIcon(filename, route)
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

console.log('Done!')
