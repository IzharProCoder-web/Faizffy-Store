/* AddAddress.jsx */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full my-2 px-2 py-2.5 border border-gray-300 rounded outline-none text-black focus:border-black transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      aria-label={placeholder}
    />
  );
};

const AddAddress = () => {
  const { user, navigate, axios } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    district: "",
    postalCode: "",
    phone: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/address/add",
        {
          firstName: address.firstName,
          lastName: address.lastName,
          email: address.email,
          street: address.street,
          city: address.city,
          district: address.district,
          postalCode: address.postalCode,
          phone: address.phone,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-black">Address</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-20 mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                placeholder="First Name"
                type="text"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              placeholder="Email Address"
              type="email"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              placeholder="Street"
              type="text"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                placeholder="City"
                type="text"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="district"
                placeholder="District"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="postalCode"
                placeholder="Postal Code"
                type="text"
              />
              <div></div>
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              placeholder="Phone"
              type="text"
            />
            <button className="w-full mt-6 bg-black text-white py-3 hover:bg-gray-800 transition uppercase cursor-pointer">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0 filter grayscale"
          src={assets.add_address_iamge}
          alt="Add Address Illustration"
        />
      </div>
    </div>
  );
};

export default AddAddress;