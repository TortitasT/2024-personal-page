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

async function getRepositories(user: string) {
  return await fetch(
    `https://api.github.com/users/${user}/repos?sort=updated`,
    {
      headers,
    }
  ).then((res) => res.json())
}

async function getRepositoryLanguages(user: string, repo: string) {
  return await fetch(`https://api.github.com/repos/${user}/${repo}/languages`, {
    headers,
  }).then((res) => res.json())
}

function saveProject(project: project) {
  const projects = JSON.parse(
    fs.readFileSync('./public/projects.json', 'utf-8')
  )

  projects.push(project)
  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(projects, null, 2),
    'utf-8'
  )
}

async function main() {
  const repos = await getRepositories('tortitast')
  if (repos.message) {
    console.log(repos.message)
    process.exit(1)
  }

  for (const repo of repos) {
    try {
      const languages = await getRepositoryLanguages('tortitast', repo.name)
      const technologies = Object.keys(languages)

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

await main()
