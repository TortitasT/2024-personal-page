import * as fs from 'fs'

interface project {
  name: string
  full_name: string
  description: string
  owner: string
  fork: boolean
  technologies: string[]
  url: string
}

const API_KEY = process.env.GITHUB_API_KEY

const headers: any = {}
if (API_KEY) {
  headers['Authorization'] = `Bearer ${API_KEY}`
}

async function getRepositories(user: string, page = 1): Promise<any> {
  const response = await fetch(
    `https://api.github.com/users/${user}/repos?sort=updated&per_page=100&page=${page}`,
    {
      headers,
    }
  ).then((res) => res.json())

  if (response.message) {
    return response
  }

  if (response.length < 100) {
    return response
  }

  const nextResponse = await getRepositories(user, page + 1)

  if (nextResponse.message) {
    return nextResponse
  }

  return [...response, ...nextResponse]
}

async function getRepositoryLanguages(user: string, repo: string) {
  return await fetch(`https://api.github.com/repos/${user}/${repo}/languages`, {
    headers,
  }).then((res) => res.json())
}

function saveProject(project: project) {
  let projects: project[] = []

  try {
    projects = JSON.parse(fs.readFileSync('./public/projects.json', 'utf-8'))
  } catch (e) {}

  projects.push(project)
  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(projects, null, 2),
    'utf-8'
  )
}

async function main() {
  let repos = await getRepositories('tortitast')
  if (repos.message) {
    console.log(repos.message)
    process.exit(1)
  }
  repos = repos.filter((value: any, index: number, self: any) => {
    return self.indexOf(value) === index
  })

  for (const repo of repos) {
    try {
      const languages = await getRepositoryLanguages('tortitast', repo.name)

      if (languages.message) {
        console.log(languages.message)
        continue
      }

      const technologies = [...Object.keys(languages), ...(repo.topics ?? [])]
        .filter(
          (value: any, index: number, self: any) =>
            self.indexOf(value) === index
        )
        .map((value) => value.toLowerCase())

      saveProject({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        owner: repo.owner.login ?? 'tortitast',
        fork: repo.fork,
        technologies: technologies,
        url: repo.html_url,
      })

      console.log(`Saved ${repo.name}`)
    } catch (e) {
      console.log(e)
      continue
    }
  }

  console.log('Done!')
}

function clearDuplicates() {
  const projects: project[] = JSON.parse(
    fs.readFileSync('./public/projects.json', 'utf-8')
  )

  const uniqueProjects = projects.filter(
    (value: any, index: number, self: any) =>
      self.findIndex((p: any) => p.name === value.name) === index
  )

  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(uniqueProjects, null, 2),
    'utf-8'
  )
}

await main()
// clearDuplicates()
