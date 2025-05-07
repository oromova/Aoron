import img from "../assets/noData.png"

const NoData = ({label}) => {
  return (
    <div className='text-center py-6'>
      <img className="mx-auto w-20" src={img} alt="img" />
      <p className="text-gray-500 mt-2">No {label} Avilable</p>
    </div>
  )
}

export default NoData