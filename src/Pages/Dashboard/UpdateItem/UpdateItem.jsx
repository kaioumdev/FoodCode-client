import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, price, recipe, image, _id } = useLoaderData();
  const { register, handleSubmit, reset, watch } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [previewImage, setPreviewImage] = useState(image);

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: data.price,
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(`menu/${_id}`, menuItem);
      reset();

      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `"${data.name}" has been updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <SectionTitle heading="Update Item" subHeading="Refresh Info" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        {/* Recipe Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe Name</span>
          </label>
          <input
            {...register("name", { required: true })}
            required
            type="text"
            defaultValue={name}
            placeholder="Enter recipe name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category & Price */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              defaultValue={category}
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              defaultValue={price}
              type="text"
              placeholder="Enter price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe Details</span>
          </label>
          <textarea
            defaultValue={recipe}
            {...register("recipe")}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Enter recipe details"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Upload Image</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
            onChange={(e) => setPreviewImage(URL.createObjectURL(e.target.files[0]))}
          />
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="flex justify-center">
            <img
              src={previewImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border shadow-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
          Update Menu Item <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
