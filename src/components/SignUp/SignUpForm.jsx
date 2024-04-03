import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import SignUpInfo from "./FirstStep";
import PersonalInfo from "./ThirdStep";
import OtherInfo from "./SecondStep";

import { signupUser, checkEmail, checkTag } from "../../services/RequestAuth";

import { useAuth } from "../../hooks/AuthProvider";

const SignUpForm = (props) => {
  const auth = useAuth();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFullname, setErrorFullname] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorTag, setErrorTag] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    tag: "",
    dob: "",
    avatar: "",
  });

  const handleNextStep = async () => {
    if (props.step == 0) {
      if (!validateFullName()) {
        return;
      }
      if ((await validateEmail()) == false) {
        return;
      }
    }
    if (props.step == 1) {
      if (!validatePassword()) {
        return;
      }
    } else if (props.step === 2) {
      if ((await validateTag()) == false) {
        return;
      }
      handleSubmit();
      return;
    }

    props.setStep(props.step + 1);
  };

  const validatePassword = () => {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (password === "") {
      setErrorPassword(true);
      toast.error("Please enter a password");
      return false;
    } else if (confirmPassword === "") {
      setErrorConfirmPassword(true);
      toast.error("Please confirm your password");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorConfirmPassword(true);
      toast.error("Passwords not matching");
      return false;
    }

    setErrorPassword(false);
    setErrorConfirmPassword(false);
    return true;
  };

  const validateFullName = () => {
    const fullName = formData.fullName;
    if (fullName == "") {
      toast.error("Please enter your fullname");
      setErrorFullname(true);
      return false;
    }
    setErrorFullname(false);
    return true;
  };

  const validateEmail = async () => {
    const email = formData.email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      toast.error("Please enter your email and fullname");
      setErrorEmail(true);
      return false;
    }
    if (!regex.test(email)) {
      toast.error("Please enter valid email");
      setErrorEmail(true);
      return false;
    }
    if ((await checkEmail(email)) == false) {
      toast.error("Email already taken");
      setErrorEmail(true);
      return false;
    }
    setErrorEmail(false);
    return true;
  };

  const validateTag = async () => {
    const tag = formData.tag;
    if (tag.length < 1 || tag.length > 15) {
      toast.error("Tag length must be between 1 and 15 ");
      setErrorTag(true);
      return false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(tag)) {
      toast.error("Only character alphabetic, numbers and _ is valid");
      setErrorTag(true);
      return false;
    } else if ((await checkTag(formData.tag)) == false) {
      toast.error("Tag already use");
      setErrorTag(true);
      return false;
    }
    setErrorTag(false);
    return true;
  };

  const handleSubmit = async () => {
    const input = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //auth.loginAction(input);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const FormTitles = ["Sign Up", "Personal Info", "Other"];

  const StepContent = {
    0: (
      <SignUpInfo
        formData={formData}
        setFormData={setFormData}
        errorEmail={errorEmail}
        errorFullname={errorFullname}
      />
    ),
    1: (
      <OtherInfo
        formData={formData}
        setFormData={setFormData}
        errorPassword={errorPassword}
        errorConfirmPassword={errorConfirmPassword}
      />
    ),
    2: (
      <PersonalInfo
        formData={formData}
        setFormData={setFormData}
        errorTag={errorTag}
      />
    ),
  };

  return (
    <div>
      <div className="form-container">
        <div className="body">{StepContent[props.step]}</div>
        <div className="footer">
          <button
            type="button"
            className="w-full h-12 text-center py-3 rounded-full bg-blue-500 text-white hover:bg-green-dark focus:outline-none"
            onClick={handleNextStep}
          >
            {props.step === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
