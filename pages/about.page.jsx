export function Page() {
  return (
    <main className="p-6 flex flex-col gap-3 max-w-xl text-justify mix-blend-exclusion">
      <h1 className="text-6xl">about</h1>

      <p>
        Hi, I'm Victor Garcia, a web developer, indie game developer and
        programming enthusiast. Check me out on{" "}
        <a href="https://github.com/tortitast" target="_blank">
          Github
        </a>{" "}
        to see all my work.
      </p>
      <p>
        I work as a developer at{" "}
        <a href="https://descom.es" target="_blank">
          Descom.es
        </a>
        , a software company from La Nucia, Spain. Where I work with{" "}
        <span class="text--aws">AWS</span>,{" "}
        <span class="text--nuxt">Nuxt.js</span> and{" "}
        <span class="text--laravel">Laravel</span>.
      </p>
      <p>
        In my free time I make projects in <span class="text--rust">Rust</span>,{" "}
        <span class="text--go">Go</span> and many more interesting technologies,
        you can check my games out in my{" "}
        <a href="https://tortitas.itch.io/" target="_blank">
          itch.io
        </a>{" "}
        profile. As for my miscellaneous projects, you can check them out on my{" "}
        <a href="https://github.com/tortitast" target="_blank">
          Github
        </a>
      </p>
    </main>
  );
}
