import React from "react";
import bgauth from "../assets/bgauth.jpg";
import { FaMicrosoft, FaGooglePlusG } from "react-icons/fa";
import SignIn from "../components/forms/SignIn.jsx";

import { SignInButton, useSignIn } from "@clerk/clerk-react";

const Auth = () => {
  const clerk = useSignIn();

  const handleSignInWithMicrosoft = async () => {
    await clerk.signIn.create({
      strategy: "oauth_microsoft",
      redirectUrl:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?access_type=offline&client_id=d9477026-2585-40cf-8745-5b9221293a31&prompt=consent&redirect_uri=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback&response_type=code&scope=openid+email+profile+offline_access&state=xw6oxbscskzk43l0dj5dg30iwr3lvg9dzp8vy00j",
      actionCompleteRedirectUrl: "/",
    });
  };

  return (
    <>
      <section className="relative py-20 2xl:py-10 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap mx-4">
              <div className="w-full lg:w-1/2 px-4 order-last lg:order-first">
                <div className="relative hidden lg:block max-w-lg mx-auto lg:mx-0 lg:max-w-2xl h-full">
                  <img
                    className="block w-full h-142 sm:h-full object-cover rounded-[2rem]"
                    alt=""
                    src={bgauth}
                  />
                  <div className="absolute bottom-0 w-full left-0 h-full flex items-center justify-center p-10">
                    <div className="max-w-md mx-auto">
                      <h4 className="font-heading text-2xl md:text-5xl lg:text-6xl text-white font-bold mb-8">
                        Sign in to your account
                      </h4>
                      <div className="md:flex mb-20">
                        <div className="mb-6 md:mb-0 md:mr-8 pt-3 text-gray-600">
                          <svg
                            width="84"
                            height="10"
                            viewBox="0 0 84 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75L1 4.25ZM84 5.00001L76.5 0.669879L76.5 9.33013L84 5.00001ZM1 5.75L77.25 5.75001L77.25 4.25001L1 4.25L1 5.75Z"
                              fill="#FAFBFC"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-200">
                            Please enter your details to proceed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="max-w-lg lg:pt-8 2xl:pt-24 lg:pb-8 mx-auto 2xl:mr-0">
                  <h3 className="text-2xl md:text-5xl text-gray-50 font-bold mb-4">
                    Welcome Back
                  </h3>
                  <div className="flex flex-wrap mb-6 items-center -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                      <SignInButton></SignInButton>
                      <button
                        className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100"
                        onClick={handleSignInWithMicrosoft}
                      >
                        <FaMicrosoft size={25} color="white" />
                        <span className="ml-4 text-sm font-semibold text-gray-50">
                          Login with Microsoft
                        </span>
                      </button>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <a
                        className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100"
                        href="#"
                      >
                        <FaGooglePlusG size={25} color="white" />
                        <span className="ml-4 text-sm font-semibold text-gray-100">
                          Login with Google
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="flex mb-6 items-center">
                    <div className="w-full h-px bg-gray-300"></div>
                    <span className="mx-4 text-sm font-semibold text-gray-300">
                      Or
                    </span>
                    <div className="w-full h-px bg-gray-300"></div>
                  </div>
                  <SignIn />

                  <div className="text-center">
                    <span className="text-xs font-semibold text-gray-900">
                      <span>Don’t have an account?</span>
                      <a
                        className="inline-block ml-1 text-orange-900 hover:text-orange-700"
                        href="#"
                      >
                        Sign up
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
