import { Quote } from '../components/Quote.jsx'
import { CursorFluidShader } from '../components/CursorFluidShader.jsx'

export function Page() {
  return (
    <>
      <CursorFluidShader />
      <main className="flex flex-col justify-center gap-3 flex-1 p-6">
        <div className="mix-blend-exclusion">
          <h1>Víctor García</h1>
        </div>
        <div className="mix-blend-color-dodge">
          <h2>overcomplicated and excessive</h2>
        </div>

        <Quote />
      </main>
    </>
  )
}
