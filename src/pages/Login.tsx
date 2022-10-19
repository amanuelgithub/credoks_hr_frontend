import React from "react";

function Login() {
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-200 bg-black">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img src="images/credoks-logo.jpg" alt="credoks-logo" />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-3xl font-bold mb-0 mr-4">Sign in</p>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-yellow-500 before:mt-0.5 after:flex-1 after:border-t after:border-yellow-500 after:mt-0.5"></div>

              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                  />
                  <label
                    className="form-check-label inline-block text-gray-200"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-gray-200">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block px-7 py-3 bg-yellow-500 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
