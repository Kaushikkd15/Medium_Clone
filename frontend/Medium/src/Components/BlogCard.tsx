import { Link } from "react-router-dom";
import {Avatar} from "../Components/Avatar"
interface BlogCardInputs {
      id: number;
      authorName: string;
      title: string;
      content: string;
      publishedDate: string;
}

export const BlogCard= ({id,authorName, title, content, publishedDate}: BlogCardInputs) =>{
         return <Link to={`/blog/${id}`}>
         
                <div className=" p-4 border-b border-slate-300 pb-3 w-screen max-w-screen-md">
                    <div className="flex w-full">
                        <div className="flex justify-center flex-col">
                        <Avatar size= "small" name={authorName} /> 
                        </div>
                        <div className="font-extralight px-2 text-sm flex justify-center flex-col ">
                        {authorName}
                        </div>
                        <div className="flex justify-center flex-col">
                            <Circle />
                        </div>
                        <div className="font-thin text-slate-400 text-sm pl-2 flex justify-center flex-col">
                        {publishedDate}
                        </div>
                    </div>
                    <div className=" text-xl font-semibold pt-2">
                        {title} 
                    </div>
                    <div className=" text-md font-thin">
                    {content.slice(0,100) + "..."} 
                    </div>
                    <div className="text-sm text-slate-400 pt-2">
                        {`${Math.ceil(content.length/100)} minute(s)`}
                    </div>
                </div>
            </Link>    
}

function Circle () {
    return <div className=" h-0.5 w-0.5 bg-slate-400">

    </div>
}
