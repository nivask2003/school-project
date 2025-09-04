import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("image", data.image[0]);

    try {
      const res = await axios.post("/api/addSchool", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: true })} placeholder="School Name" className="w-full p-2 border"/>
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("address", { required: true })} placeholder="Address" className="w-full p-2 border"/>
        <input {...register("city", { required: true })} placeholder="City" className="w-full p-2 border"/>
        <input {...register("state", { required: true })} placeholder="State" className="w-full p-2 border"/>
        <input type="number" {...register("contact", { required: true })} placeholder="Contact Number" className="w-full p-2 border"/>
        
        <input type="email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="w-full p-2 border"/>
        {errors.email_id && <p className="text-red-500">Valid email required</p>}

        <input type="file" {...register("image", { required: true })} className="w-full p-2 border"/>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
