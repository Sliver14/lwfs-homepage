"use client";
import React, { useEffect } from 'react'
import axios, { AxiosError } from "axios";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image.js';
import country from '../utils/country.js';
import zones from "../utils/zones.js";
import { useRouter } from 'next/navigation';
// import { FaChevronLeft } from "react-icons/fa6";
// import { AiFillHome } from "react-icons/ai";
import { Eye, EyeOff, Mail, Lock, User, Phone, Church } from 'lucide-react';

// Define the type for the form values
interface SignupFormValues {
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  zone: string;
  country: string;
  church: string;
  email: string;
}

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(false); // Loading state
    const [showPassword, setShowPassword ] = useState(false);
    const initialValues = {
        // title: "",
        firstName: "",
        lastName: "",
        countryCode: "+234", // Match the code in countryCodes
        phoneNumber: "",
        zone: "",
        country: "Nigeria",
        church: "",
        // dateOfbirth: "",
        email: "",
        password: "",
      };
    
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        countryCode: Yup.string().required("Country Code is required"),
        phoneNumber: Yup.string()
          .max(15, "Phone number must not exceed 15 digits")
          .matches(/^\d+$/, "Phone number must contain only numbers")
          .required("Phone number is required"),
        zone: Yup.string().required("Zone is required"),
        church: Yup.string().required("Church is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        country: Yup.string().required("Country is required"),
        password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
      
        confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")as unknown as string, ""], "Passwords must match"),
      });

      useEffect(()=>{
        console.log(email)
          localStorage.setItem("userEmail", email); // ✅ Save email in localStorage
      },[email])

      //handle signup
    const onSubmit = async (data: SignupFormValues) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post("/api/auth/signup", data);
            router.push("/signup/verify");
            setSuccess(response.data.message);
            
        } catch(error){
            // console.error("Error Signing up", error);

             if (error instanceof AxiosError) {
                   const errorMessage = error.response?.data?.error ?? "Sign-up failed";
             
                   if (errorMessage.includes("User not verified")) {
                       setError("User not verified. Redirecting to verification...");
                       setTimeout(() => router.push("/signup/verify"), 2000);
                   } else {
                       setError(errorMessage);
                   }
                 } else {
                     setError("An unknown error occurred.");
                 }
                 } finally {
                 setLoading(false);
                 }
    }

  return (
    <div className='flex relative flex-col  w-screen h-screen overflow-hidden overflow-y-scroll lg:grid lg:grid-cols-2 lg:overflow-hidden'>
      <Image 
        src="/welcome/bg welcome app.png"
        alt=""
        layout="fill"
        objectFit="cover"
        className="flex -z-10 lg:hidden"
      />

      <Image
        src="/welcome/Logo-shadow.png"
        alt="Background"
        // layout="fill"
        width="90"
        height="90"
        objectFit="contain"
        className="flex absolute top-5 self-center justify-self-center z-20 lg:hidden"
      />
      {/* left */}
      <div className='hidden h-screen w-full lg:flex justify-center items-center'>
        <Image 
          src="/welcome/bg welcome app.png"
          alt=""
          layout="fill"
          objectFit="cover"
          className="hidden lg:flex -z-10"
        />

      <Image
        src="/welcome/Logo-shadow.png"
        alt="Background"
        // layout="fill"
        width="200"
        height="200"
        objectFit="contain"
        className="hidden lg:flex"
      />

      </div>

      {/* Right */}
      {/* <div className=' lg:flex lg:bg-white lg:overflow-y-scroll z-10'> */}
        <div className='flex relative flex-col bg-white rounded-t-2xl lg:overflow-y-scroll mt-14 lg:mt-0 lg:rounded-none lg:h-full lg:w-full'>

        <Image 
            src="/welcome/bg-transparent.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            className="hidden lg:flex -z-10"
          />
          <div className='flex flex-col my-auto gap-5 mt-16'>
                  <div className='flex flex-col justify-center items-center' >
                    <h2 className='text-4xl text-lwfs_blue font-bold ' >Create Account</h2>
                </div>
                
                <div className='pb-10'>   
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values, handleChange, setFieldValue }) => (
                  <Form className="max-w-md mx-auto bg-white  rounded-lg p-6 space-y-4 lg:bg-opacity-0">

                    {/* First Name */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                      <User className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          className="p-2 w-full border border-lwfs_blue pl-[15%] rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                      </div>
                      <ErrorMessage name="firstName" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                      <User className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          className="p-2 w-full border border-lwfs_blue pl-[15%] rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                      </div>
                      
                      <ErrorMessage name="lastName" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col">
                      {/* <label htmlFor="country" className="text-gray-700 font-medium mb-1">
                        Country
                      </label> */}
                      <Field
                        as="select"
                        name="country"
                        id="country"
                        className="p-2 w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        {country.map((country, index) => (
                          <option key={index} value={country}> 
                            {country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="countryCode" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                        <Phone className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          className="p-2 w-full pl-[15%] border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                      </div>
                    
                      <ErrorMessage name="phoneNumber" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Zone */}
                    <div className="flex flex-col">
                      {/* <label htmlFor="zone" className="text-gray-700 font-medium mb-1">
                        Zone
                      </label> */}
                      <Field
                        as="select"
                        name="zone"
                        id="zone"
                        className="p-2 w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                      >
                        <option value="" disabled>
                          Select your zone
                        </option>
                        {zones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="zone" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Church */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                      <Church className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="church"
                          name="church"
                          placeholder="Church"
                          className="p-2 pl-[15%] w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                      </div>
                      
                      <ErrorMessage name="church" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                        <Mail className="absolute left-[5%] opacity-50"/>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder='Email'
                          value={values.email}
                          // Update Formik's state and external `setEmail`
                          onChange={(e) => {
                            handleChange(e);
                            setEmail(e.target.value); // Update external state
                            setFieldValue("email", e.target.value); // Update Formik state
                          }}
                          
                          className="p-2 pl-[15%] w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                      </div>
                      
                      <ErrorMessage name="email" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                        <Lock className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="p-2 pl-[15%] w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                        <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                        {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* confirm password */}
                    <div className="flex flex-col">
                      <div className='flex relative justify-center items-center'>
                        <Lock className="absolute left-[5%] opacity-50"/>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="p-2 pl-[15%] w-full border border-lwfs_blue rounded-full focus:outline-none focus:ring-1 focus:ring-lwfs_blue"
                        />
                        <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                        {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="span" className="text-red-500 text-xs mt-1" />
                    </div>      
                    {/* <div className="flex flex-col"> */}
                      {/* Confirm Password Field */}
                      {/* <label className="text-gray-700 font-medium mb-1" htmlFor="confirmPassword">Confirm Password:</label>
                      <Field type="password" id="confirmPassword" name="confirmPassword" className="p-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-black"/>
                    </div> */}

                    {/* Error & Success Messages */}
                    {error && <p className="text-red-500 text-center text-xs">{error}</p>}
                    {success && <p className="text-green-500 text-center text-xs">{success}</p>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-lwfs_blue text-white text-2xl  font-medium rounded-full p-2 mt-4 w-full transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Sign up" }
                    </button>
                  </Form>
                )}
                </Formik>

                <div className="flex items-center gap-2 px-10">
                  <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Already Registered */}
                <span className="block text-center mt-2 text-md">
                      Already registered?{" "}
                      <a
                        onClick={() => router.push("/signin")}
                        className="font-bold hover:underline cursor-pointer"
                      >
                        Login
                      </a>
                    </span>

                </div>
          </div>
        </div>
      {/* </div> */}
      
        
    </div>
  )
}

export default Signup
