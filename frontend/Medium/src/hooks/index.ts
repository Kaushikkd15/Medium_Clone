import { useEffect, useState } from "react"
import axios from "axios";
import { Backend_Url } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "firstname": string
    }
}


export const useBlog = ({id} : {id: String}) =>{
   const [loading ,setLoading] = useState(true);
   const [blog, setBlog] = useState<Blog>();

   useEffect( ()=>{
    axios.get(`${Backend_Url}/api/v1/blog/${id}`, { 
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
    .then( response =>{
           setBlog(response.data.blog)
           setLoading(false);
    })
   }, [id])
   return {
    loading,
    blog
   }
}


export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect( ()=> {
       axios.get(`${Backend_Url}/api/v1/blog/bulk`, {
         headers: {
            Authorization: localStorage.getItem("token")
         }
       })
       .then( response =>{
           setBlogs(response.data.blog)
           setLoading(false);
       })
    }, [])

    return{
        loading,
        blogs
    }
}