import { CursorFluidShader } from '../components/CursorFluidShader.jsx'

export function Page() {
  function dateDiffDays(date1, date2) {
    const diff = Math.abs(date1.getTime() - date2.getTime())
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  function daysToYears(days) {
    return Math.round(days / 365)
  }

  const age = new Date().getFullYear() - 2004
  const descomExperience = daysToYears(
    dateDiffDays(new Date(2022, 2, 1), new Date())
  )

  const experience = {
    nuxt: descomExperience,
    laravel: descomExperience,
    aws: descomExperience,
  }

  return (
    <>
      <CursorFluidShader />
      <main className="p-6 flex flex-col gap-3 max-w-xl text-justify mix-blend-exclusion">
        <h1 className="text-6xl">about</h1>

        <p>
          Hi, I'm Victor Garcia, a {age} years old web developer, indie game
          developer and programming enthusiast.
        </p>

        <p>
          I work as a developer at{' '}
          <a href="https://descom.es" target="_blank">
            Descom.es
          </a>
          , a software company based on La Nucia, Spain, where I work with{' '}
          <span class="text--aws">AWS</span>,{' '}
          <span class="text--nuxt">Nuxt.js</span> and{' '}
          <span class="text--laravel">Laravel</span>.
        </p>

        <p>
          I currently have {experience.nuxt} years of experience with{' '}
          <span class="text--nuxt">Nuxt.js</span>, {experience.laravel} years
          with <span class="text--laravel">Laravel</span> and {experience.aws}{' '}
          years with <span class="text--aws">AWS</span>.
        </p>

        <p>
          In my free time I work on projects with{' '}
          <span class="text--rust">Rust</span>, <span class="text--go">Go</span>{' '}
          and other interesting technologies. You can check out all my games on
          my{' '}
          <a href="https://tortitas.itch.io/" target="_blank">
            itch.io
          </a>{' '}
          profile or head to my{' '}
          <a href="https://github.com/tortitast" target="_blank">
            Github
          </a>{' '}
          or <a href="/projects">projects page</a> to see the rest of my work.
        </p>
      </main>
    </>
  )
}
