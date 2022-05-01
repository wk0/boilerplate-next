import thumper from '../../assets/thumper.png'
import Image from 'next/image'
import { OpenseaLogo } from '../Opensea'

export const Soldout = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={thumper}
        layout="fixed"
        width={100}
        height={100}
        alt="thumper"
      />

      <span className="mt-8 text-4xl text-[#00ff3d]">SOLD OUT!</span>
      <span className="mt-6 text-center text-xl">
        ACCESS TO FLEAR CITY IS CLOSED. KEYS TO THE CITY ARE AVAILABLE ON
        OPENSEA.
      </span>
      <a className="mt-6">
        <OpenseaLogo />
      </a>
    </div>
  )
}
