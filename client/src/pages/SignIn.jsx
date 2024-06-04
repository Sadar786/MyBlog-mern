import { Label, TextInput, Button, Alert, Spinner} from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redex/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
   

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please provide all the fields."));
    }
    try {
      dispatch(signInStart());
      const resp = await fetch("/api/auth/signin", { method: "POST", headers: { "Content-Type": "application/json" },body: JSON.stringify(formData),
      });
      if (!resp.ok) {
        const errorData = await resp.json();
        dispatch(signInFailure(errorData.message));
        return;
      }
      const data = await resp.json();
      if (data.success === false) {
        dispatch(signInFailure(data.errMessage));
      }
      console.log("Response:", data);
      if (resp.ok) {
        dispatch(signInSuccess(data));
        console.log(data)
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
      console.error("Fetch error:", err);
    }
  };
 const errorDisapear = () => {
  dispatch(signInStart())
 }
  return (
    <div className="pt-20" >
    <div className="min-h-screen  dark:bg-[rgb(16, 23, 42)]">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="font-bold text-3xl sm:text-4xl dark:text-white"
          >
            <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              sadar's
            </span>
            blog
          </Link>
          <p className="text-small mt-5">
            This is My blog you can signin with Email or Google
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className=""
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth onClick={errorDisapear}/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 " color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
