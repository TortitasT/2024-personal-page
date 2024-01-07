export { Footer }

import { Signature } from '../components/Signature.jsx'
import clsx from 'clsx'

function Footer({ className }) {
  return (
    <footer
      className={clsx(
        'mt-auto px-4 pb-2 md:px-6 grid grid-cols-2 md:grid-cols-3',
        className
      )}
    >
      <div>
        <Signature />
      </div>

      <div className="hidden md:flex justify-center items-center text-sm">
        <a
          href="https://github.com/TortitasT/2024-personal-page/"
          className="font-light"
        >
          Inspect the source code
        </a>
      </div>

      <div className="flex justify-end items-center">
        <a
          href="https://www.linkedin.com/in/v%C3%ADctor-garc%C3%ADa-fern%C3%A1ndez-a7a669200?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bgejpxt4aSOqkq2Mqd%2F3caA%3D%3D"
          className="hover:brightness-150"
          target="_blank"
        >
          <img
            src="/tech/linkedin.svg"
            className="h-5 w-5 mr-2 grayscale"
            alt="GitHub icon"
          />
        </a>

        <a
          href="https://github.com/TortitasT/"
          className="hover:brightness-150"
          target="_blank"
        >
          <img
            src="/tech/github.svg"
            className="h-5 w-5 mr-2 grayscale"
            alt="GitHub icon"
          />
        </a>
      </div>
    </footer>
  )
}
