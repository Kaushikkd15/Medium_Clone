import { ChangeEvent, useState } from "react"
import { Appbar } from "../Components/Appbar"
import { Backend_Url } from "../config";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const Publish = () =>{
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div className="">
            <Appbar />
               <div className="flex justify-center w-full pt-8">
                    <div className="max-w-screen-lg w-full">
                        <input onChange={(e)=>{
                            setTitle(e.target.value)
                        }} className="focus outline-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg " placeholder="Title" />
                        <TextEditor onChange= {(e)=>{
                            setDescription(e.target.value);
                        }} />
                        <button type="submit" onClick = {async ()=>{
                            const response = await axios.post(`${Backend_Url}/api/v1/blog`,{
                                title,
                                content: description
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            })
                            navigate(`/blog/${response.data.id}`)
                        }} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                          Publish post
                        </button>
                    </div>
                </div>
        </div> 
}   

function TextEditor({onChange}: {onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange ={onChange}id="editor" rows={8} className=" h-full border-0 focus:ring-0 focus:outline-none block w-full px-0 text-sm rounded-lg  text-gray-800 bg-white pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
}