import { useForm } from "react-hook-form";
import { categories } from "../../utils/categories";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { message } from "antd";
import { useNavigate } from "react-router";

function AddProduct() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const productCollectionRef = collection(db, "products");
    const obj = {
      ...data,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      status: "active",
    };
    addDoc(productCollectionRef, obj).then(() => {
      reset();
      message.success("Product Added Successfully");
      navigate("/");
    });
  };

  console.log(watch("title")); // watch input value by passing the name of it

  return (
    <form
      className="flex flex-col text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        placeholder={"Product Title"}
        obj={{ ...register("title", { required: true, maxLength: 30 }) }}
        errorMsg={"Text Length should be between 1 to 30"}
        formKey={"title"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Description"}
        obj={{ ...register("desc", { required: true }) }}
        errorMsg={"Decs is required"}
        formKey={"desc"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Price"}
        obj={{ ...register("price", { required: true }) }}
        errorMsg={"Price is required"}
        formKey={"price"}
        type={"number"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Image"}
        obj={{ ...register("img", { required: true }) }}
        errorMsg={"Image is required"}
        formKey={"img"}
        type={"url"}
        errors={errors}
      />

      <CustomInput
        placeholder={"Product Location"}
        obj={{ ...register("location", { required: true }) }}
        errorMsg={"Location is required"}
        formKey={"location"}
        errors={errors}
      />

      <CustomInput
        placeholder={"Product Quantity"}
        obj={{ ...register("quantity", { required: true }) }}
        errorMsg={"Quantity is required"}
        formKey={"quantity"}
        errors={errors}
      />

      <div className="mx-4">
        <select
          className="border mt-2 w-full border-purple-600 lg:w-2/3 mx-auto p-4 rounded-md"
          {...register("category")}
        >
          {categories.map((data) => (
            <option value={data.slug}>{data.name}</option>
          ))}
        </select>
      </div>

      <input
        className="bg-purple-200
        my-4
        inline rounded cursor-pointer mx-auto p-2 px-4"
        type="submit"
      />
    </form>
  );
}

export default AddProduct;

const CustomInput = ({ formKey, obj, placeholder, errors, errorMsg, type }) => {
  return (
    <div className="flex flex-col mx-4">
      <input
        className="border mt-2 w-full  h-10 border-purple-600 lg:w-2/3 mx-auto p-4 rounded-md"
        placeholder={placeholder}
        type={type ? type : "text"}
        {...obj}
      />
      {errors[formKey] && (
        <span className="text-sm mb-1 text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};
