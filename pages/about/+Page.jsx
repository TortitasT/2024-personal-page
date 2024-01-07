import { Footer } from '../../components/Footer.jsx'

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

  return (
    <>
      <main className="p-6 max-w-xl text-justify mix-blend-exclusion">
        <h1>about</h1>

        <p>
          Hi, I'm Victor Garcia, a {age}-year-old web developer, indie game
          developer and programming enthusiast.
        </p>

        {/* <p> */}
        {/*   I currently work at{' '} */}
        {/*   <a href="https://descom.es" target="_blank"> */}
        {/*     Descom.es */}
        {/*   </a> */}
        {/*   , a software company based on La Nucia, Spain. */}
        {/*   where I work with{' '} */}
        {/*   <span class="text--aws">AWS</span>,{' '} */}
        {/*   <span class="text--nuxt">Nuxt.js</span> and{' '} */}
        {/*   <span class="text--laravel">Laravel</span>. */}
        {/* </p> */}

        <p>
          I have {descomExperience} years of professional experience with{' '}
          <span class="text--nuxt">Nuxt.js</span>,{' '}
          <span class="text--laravel">Laravel</span> and{' '}
          <span class="text--aws">AWS</span>.
        </p>

        <p>
          In my free time, I work on projects with{' '}
          <span class="text--rust">Rust</span>, <span class="text--go">Go</span>{' '}
          and other interesting technologies.
        </p>

        <p>
          You can check out all my games on my{' '}
          <a href="https://tortitas.itch.io/" target="_blank">
            itch.io
          </a>{' '}
          profile, head to my{' '}
          <a href="https://github.com/tortitast" target="_blank">
            Github
          </a>{' '}
          or <a href="/projects">projects page</a> to see the rest of my work.
        </p>
      </main>

      <Footer />
    </>
  )
}
