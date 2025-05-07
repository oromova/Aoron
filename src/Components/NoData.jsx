import img from "../assets/noData.png";

const NoData = ({ label }) => {
  return (
    <div className="py-6">
      <div className="text-center w-full max-w-md mx-auto">
        <img className="mx-auto w-20" src={img} alt="img" />
        <p className="text-gray-500 mt-2">No {label} Available</p>
      </div>
    </div>
  );
};

export default NoData;

