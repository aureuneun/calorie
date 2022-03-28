const Nutrient = ({
  createdAt,
  carbohydrateNutrient,
  proteinNutrient,
  fatNutrient,
}) => {
  return (
    // <tr>
    //   <th>{new Date(createdAt).toLocaleDateString()}</th>
    //   <td>{carbohydrateNutrient}</td>
    //   <td>{proteinNutrient}</td>
    //   <td>{parseInt(fatNutrient)}</td>
    // </tr>
    <div className="grid grid-cols-4 mb-1">
      <span className="text-center">
        {new Date(createdAt).toLocaleDateString()}
      </span>
      <span className="text-center">{carbohydrateNutrient.toFixed(1)}g</span>
      <span className="text-center">{proteinNutrient.toFixed(1)}g</span>
      <span className="text-center">{fatNutrient.toFixed(1)}g</span>
    </div>
  );
};

export default Nutrient;
