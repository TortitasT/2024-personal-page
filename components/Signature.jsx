export { Signature }

import './Signature.css'
import signature from '../pages/assets/signature.svg?raw'

function Signature() {
  return (
    <div
      className="signature"
      dangerouslySetInnerHTML={{ __html: signature }}
    ></div>
  )
}
