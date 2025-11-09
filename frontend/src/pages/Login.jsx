import { useState } from "react"

const Login = () => {
  const [currentState, setCurrenetState] = useState("Log In");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 mb-10">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        <p className="font-serif text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Log In' ? "" :
        < input type="text" className="w-full px-3 py-2 border border-gray-700 rounded-md" placeholder="Name" required />
      }

      <input type="email" className="w-full px-3 py-2 border border-gray-700 rounded-md" placeholder="Email" required />
      <input type="password" className="w-full px-3 py-2 border border-gray-700 rounded-md" placeholder="Password" required />
      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer text-gray-400">Forgot your password?</p>
        {
          currentState == "Log In" ? <p onClick={() => setCurrenetState('Sign Up')} className="cursor-pointer">Create Account</p> : <p onClick={() => setCurrenetState('Log In')} className="cursor-pointer ">Log In</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">{currentState === 'Log In' ? 'Sign In' : "Sign Up"}</button>
    </form>
  )
}
export default Login