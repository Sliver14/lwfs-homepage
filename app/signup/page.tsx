"use client";
import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import country from '../utils/country.js';
import zones from "../utils/zones.js";
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
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
      };
    
      const validationSchema = Yup.object().shape({
        // title: Yup.string()
        // .required('Title is required') // Make the title mandatory
        // .oneOf(['Pastor', 'Deacon', 'Deaconess', 'Brother', 'Sister'], 'Invalid title selection'), // Restrict to valid options
    
        firstName: Yup.string().required(""),
    
        lastName: Yup.string().required(""),
    
        countryCode: Yup.string().required(""),
    
        phoneNumber: Yup.string().max(15, "Phone number must not exceed 15 digits")
          .matches(/^\d+$/, "Phone number must contain only numbers")
          .required("Phone number is required"),
    
        zone: Yup.string().required(""),
          
        church: Yup.string().required(""),
    
        email: Yup.string().email("Invalid email address").required("Email is required"),
    
        country: Yup.string().required(""),
        
      });

      useEffect(()=>{
        console.log(email)
          localStorage.setItem("userEmail", email); // ✅ Save email in localStorage
      },[email])

      //handle signup
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/signup", data);
            router.push("/signup/verify");
            setSuccess(response.data.message);
            
        } catch(error){
            console.error("Error Signing up", error);
            if (error.response?.data?.error.includes('User not verified')){
            const response2 = await axios.post("api/auth/resendcode", {email});
            router.push("signup/verify");
            }
            setError(error.response?.data?.error || "Error verifiying code");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='flex flex-col  w-screen h-screen'>
        <div className='flex w-full p-5 justify-between opacity-50'>
            <FaChevronLeft className='text-xl cursor-pointer transition transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.back()}/>
            <AiFillHome className='text-3xl cursor-pointer transition transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.push("/")}/>
        </div>
        <div className='flex flex-col my-auto gap-5'>
                <div className='flex flex-col justify-center items-center' >
                  <h2 className='text-2xl font-bold ' >Create Account</h2>
              </div>
              <div className='pb-10'>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ values, handleChange, setFieldValue }) => (
                <Form className="max-w-md mx-auto bg-white  rounded-lg p-6 space-y-4">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-gray-700 font-medium mb-1">
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="firstName" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-gray-700 font-medium mb-1">
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="lastName" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Country */}
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-gray-700 font-medium mb-1">
                      Country
                    </label>
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                    <ErrorMessage name="countryCode" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label htmlFor="phoneNumber" className="text-gray-700 font-medium mb-1">
                      Phone Number
                    </label>
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="phoneNumber" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Zone */}
                  <div className="flex flex-col">
                    <label htmlFor="zone" className="text-gray-700 font-medium mb-1">
                      Zone
                    </label>
                    <Field
                      as="select"
                      name="zone"
                      id="zone"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                    <ErrorMessage name="zone" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Church */}
                  <div className="flex flex-col">
                    <label htmlFor="church" className="text-gray-700 font-medium mb-1">
                      Church
                    </label>
                    <Field
                      id="church"
                      name="church"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="church" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={values.email}
                      // Update Formik's state and external `setEmail`
                      onChange={(e) => {
                        handleChange(e);
                        setEmail(e.target.value); // Update external state
                        setFieldValue("email", e.target.value); // Update Formik state
                      }}
                      
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="email" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Error & Success Messages */}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {success && <p className="text-green-500 text-center">{success}</p>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-blue-950 text-white font-medium rounded-md p-2 mt-4 w-full transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register" }
                  </button>
                </Form>
              )}
              </Formik>

              {/* Already Registered */}
              <span className="block text-center mt-2 text-md">
                    Already registered?{" "}
                    <a
                      onClick={() => router.push("/signin")}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Login
                    </a>
                  </span>

              </div>
        </div>
    </div>
  )
}

export default Signup
