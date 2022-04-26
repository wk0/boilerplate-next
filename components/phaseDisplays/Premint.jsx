import thumper from '../../assets/thumper.png'
import Image from 'next/image'

export const Premint = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={thumper}
        layout="fixed"
        width={100}
        height={100}
        alt="thumper"
      />
      <span className="mt-8 text-center text-[32px]">
        GET READY TO ENTER FEAR CITY
      </span>
      <span className="mt-16 mb-8 text-2xl text-[#00ff3d]">
        MINTING STARTS IN
      </span>
    </div>
  )
}
