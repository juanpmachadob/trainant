import PartItem from './PartItem'

const PartList = ({ onClick, partType, partItems }) => {
  return (
    <section className="m-4 grid grid-cols-2 gap-4 overflow-y-auto">
      {partItems &&
        partItems.map((part) => (
          <PartItem key={part} part={part} type={partType} onClick={onClick} />
        ))}
    </section>
  )
}
export default PartList
