"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = (field: string, value: string) => {
    const newErrors: Partial<FormData> = { ...errors };

    switch (field) {
      case "name":
        if (!value || !/^[A-Za-z ]+$/.test(value)) {
          newErrors.name = "Please enter a valid name";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!value || !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "phoneNumber":
        if (!value || !/^\d{10}$/.test(value)) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = Object.keys(formData).every((field) =>
      validate(field, formData[field as keyof FormData])
    );
    if (isFormValid) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[40%]  min-h-[60%]   p-4 border rounded-md shadow-md space-y-4 glass"
      >
        <div className="space-y-2">
          <label className=" text-gray-700">Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please enter your full name"
            className="mt-1 capitalize w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className=" text-gray-700">Email *</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className=" text-gray-700">Phone Number *</label>
          <input
            name="phoneNumber"
            type="number"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please enter your phone number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-xs">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className=" text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            placeholder="Write a message..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600 resize-none"
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: "25px" }}
          className="w-full py-2  rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none  "
        >
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Form Data</h2>
              <button onClick={closeModal}>
                <AiOutlineClose className="text-gray-700" size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong className="text-black">Name:</strong> {formData.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-black">Email:</strong> {formData.email}
              </p>
              <p className="text-gray-700">
                <strong className="text-black">Phone Number:</strong>{" "}
                {formData.phoneNumber}
              </p>
              <p className="text-gray-700">
                <strong className="text-black">Message:</strong>{" "}
                {formData.message}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
