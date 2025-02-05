import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaUtensils, FaUpload } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, price, recipe, image, _id } = useLoaderData();
  const { register, handleSubmit, reset, watch } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // State for image preview
  const [previewImage, setPreviewImage] = useState(image);

  const onSubmit = async (data) => {
    let imageURL = previewImage; // Default to existing image

    // If a new image is selected, upload it
    if (data.image.length > 0) {
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    // Prepare the updated menu item data
    const menuItem = {
      name: data.name,
      category: data.category,
      price: data.price,
      recipe: data.recipe,
      image: imageURL,
    };

    // Send update request
    const menuRes = await axiosSecure.patch(`menu/${_id}`, menuItem);
    if (menuRes.data.modifiedCount > 0) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} has been updated successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-lg">
      <SectionTitle heading="Update Item" subHeading="Refresh Info" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Recipe Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Recipe Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            defaultValue={name}
            placeholder="Enter recipe name"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Category & Price (Grid Layout for Responsiveness) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
            <select
              defaultValue={category}
              {...register("category", { required: true })}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="default">Select a Category</option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Recipe Price</label>
            <input
              {...register("price", { required: true })}
              defaultValue={price}
              type="text"
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Recipe Details</label>
          <textarea
            defaultValue={recipe}
            {...register("recipe")}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe details"
            rows="4"
          ></textarea>
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="flex justify-center my-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border shadow-md"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Upload New Image (Optional)</label>
          <div className="flex items-center gap-4">
            <input
              {...register("image")}
              type="file"
              className="hidden"
              id="fileInput"
              onChange={(e) => setPreviewImage(URL.createObjectURL(e.target.files[0]))}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              <FaUpload />
              Choose File
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all"
        >
          Update Menu Item <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
