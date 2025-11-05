import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    // Add your signup API call here
  };

  const inputClasses =
    "mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 sm:px-4 md:px-0 lg:px-30 lg:py-30">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="hidden md:flex md:items-center md:justify-center  p-8 lg:p-12">
              <img
                src="https://t3.ftcdn.net/jpg/03/70/92/84/360_F_370928450_R6g8c0j5cey86PUXE32W7KMiqIUe1fOI.jpg"
                alt="Login Illustration"
                className="w-full h-auto  max-w-sm object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Form Section */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="font-bold text-4xl text-gray-900 mb-3">
                  Create an Account
                </h1>
                <p className="text-gray-600 text-base">
                  Sign up to get started with our services
                </p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Full Name *
                  </label>
                  <div className="relative mt-2">
                    <FiUser
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      {...register("name", {
                        required: "Full name is required",
                      })}
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className={`${inputClasses} pl-12 ${
                        errors.name ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className={errorClasses}>{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email Address *
                  </label>
                  <div className="relative mt-2">
                    <FiMail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className={`${inputClasses} pl-12 ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className={errorClasses}>{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password *
                  </label>
                  <div className="relative mt-2">
                    <FiLock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create your password"
                      className={`${inputClasses} pl-12 pr-12 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className={errorClasses}>{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative mt-2">
                    <FiLock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === passwordValue ||
                          "Passwords do not match",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      className={`${inputClasses} pl-12 pr-12 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className={errorClasses}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-8 bg-blue-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-blue-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 active:scale-95"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
