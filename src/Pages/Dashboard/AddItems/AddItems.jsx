import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <SectionTitle
        heading="add an Item"
        subHeading="What's new?"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <select
          {...register("category")}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Select a Category?
          </option>
          <option value="salad">Salad</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="dessert">Dessert</option>
          <option value="drinks">Drinks</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddItems;
