import {SignUpInput } from "@kaushik_kd/medium-common";
import { Backend_Url } from "../config";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const Auth = ({type} : {type : "signin" | "signup"})  =>{
    const navigate = useNavigate();
    const [input, setInputs] = useState<SignUpInput>({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })
    async function sendRequest (){
        try{
        const response = await axios.post(`${Backend_Url}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, input)
        const token = response.data.token
        console.log(input);
        
        localStorage.setItem("token", token);
        navigate("/blogs")
        }
        catch(err){

        }
    }
    return <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="max-w-lg">
                        <div className="px-10">
                            <div className="font-bold text-4xl">
                            Create an account
                            </div>
                            <div className="text-slate-400 mt-2 pb-3">
                            {type==="signup" ? "Already have an account?" : "Don't have an account?" } <Link to={type === "signup" ? "/signin" : "/signup"}>Login</Link>
                            </div>
                        </div>
                        <div>
                            <Labelling label= "Email" placeholder="JohnDoe@gmail.com" onChange={(e)=>{
                            setInputs(c =>({
                               ...c,
                               email: e.target.value
                                 }))
                            }}/>
                            <Labelling label= "Password" type={"password"} placeholder="John Doe" onChange={(e)=>{
                            setInputs(c =>({
                               ...c,
                               password: e.target.value
                                 }))
                            }}/>
                            {type === "signup" ? <Labelling label= "Firstname" placeholder="John Doe" onChange={(e)=>{
                            setInputs(c =>({
                               ...c,
                               firstname: e.target.value
                                 }))
                            }}/> : null}
                            {type === "signup" ? <Labelling label= "Lastname" placeholder="John Doe" onChange={(e)=>{
                            setInputs(c =>({
                               ...c,
                               lastname: e.target.value
                                 })) 
                            }} /> : null }
                            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-3">{type==="signup" ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </div>
                </div>
           </div>
}
interface LabellingType {
      label: string;
      placeholder: string;
      onChange : (e: ChangeEvent<HTMLInputElement>) => void;
      type?: string;
}

function Labelling ({label , placeholder , onChange, type} : LabellingType  ){

    return <div>
               <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1.5">
                        {label}
                    </label>
                    <input onChange={onChange} type={type || "text"} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder={placeholder}/>
                </div>
            </div>
}