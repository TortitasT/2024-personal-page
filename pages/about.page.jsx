export function Page() {
  return (
    <main className="p-6 flex flex-col gap-3 max-w-xl text-justify mix-blend-exclusion">
      <h1 className="text-6xl">about</h1>

      <p>
        Hi, I'm Victor Garcia, a web developer, indie game developer and
        programming enthusiast.
      </p>
      <p>
        I work as a developer at{" "}
        <a href="https://descom.es" target="_blank">
          Descom.es
        </a>
        , a software company based on La Nucia, Spain, where I work with{" "}
        <span class="text--aws">AWS</span>,{" "}
        <span class="text--nuxt">Nuxt.js</span> and{" "}
        <span class="text--laravel">Laravel</span>.
      </p>
      <p>
        In my free time I work on projects with{" "}
        <span class="text--rust">Rust</span>, <span class="text--go">Go</span>{" "}
        and other interesting technologies. You can check out all my games on my{" "}
        <a href="https://tortitas.itch.io/" target="_blank">
          itch.io
        </a>{" "}
        profile or head to my{" "}
        <a href="https://github.com/tortitast" target="_blank">
          Github
        </a>{" "}
        to see the rest of my work.
      </p>
    </main>
  );
}
