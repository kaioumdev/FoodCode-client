// /* eslint-disable react/prop-types */
// const MenuItem = ({ item }) => {
//   const { name, image, recipe, price } = item;
//   return (
//     <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-md w-full max-w-lg">
//       <img
//         style={{ borderRadius: "0 200px 200px 200px" }}
//         className="w-24 h-24 object-cover"
//         src={image}
//         alt={name}
//       />
//       <div className="flex-1 text-center sm:text-left">
//         <h4 className="text-xl font-bold">{name}</h4>
//         <p className="text-gray-600">{recipe}</p>
//       </div>
//       <span className="text-yellow-600 font-semibold">${price}</span>
//     </div>
//   );
// };

// export default MenuItem;

/* eslint-disable react/prop-types */
const MenuItem = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-md w-full max-w-lg mx-auto">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-24 h-24 object-cover"
        src={image}
        alt={name}
      />
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-bold">{name}</h4>
        <p className="text-gray-600">{recipe}</p>
      </div>
      <span className="text-yellow-600 font-semibold">${price}</span>
    </div>
  );
};

export default MenuItem;
