import { useState } from 'react'

const PartItem = ({ part, type, onClick = () => {} }) => {
  const [image, setImage] = useState(`/images/${type}/${part}.png`)
  return (
    <div
      onClick={() => onClick(part)}
      className="flex cursor-pointer select-none flex-col items-center justify-between gap-2 rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border bg-white/75 p-2 shadow duration-150 hover:bg-customPurple hover:brightness-90"
    >
      <img
        className="w-24"
        src={image}
        alt={`Exercise part icon: ${part}`}
        onError={() => setImage('/images/partPlaceholder.gif')}
      />
      <span className="rounded-full bg-purple-900 px-2.5 py-0.5 text-center text-xs font-bold uppercase text-white">
        {part}
      </span>
    </div>
  )
}
export default PartItem
