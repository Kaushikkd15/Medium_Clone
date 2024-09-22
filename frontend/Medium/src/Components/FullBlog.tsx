import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const FullBlog = ({blog} : {blog: Blog}) =>{
    return  <div>
                <Appbar />
               <div className="grid grid-cols-12 w-full max-w-screen-xl pt-20 px-10">
                  <div className="col-span-8">
                    <div className="text-3xl font-bold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 15th June 2024
                    </div>
                    <div className="text-xl font-light pt-2">
                         {blog.content}
                    </div> 
                  </div>
                        <div className="col-span-4 ml-10">
                          <div className="text-slate-500">
                          Author
                          </div>
                          <div className="flex w-full pt-2">
                            <div className="pr-4 flex flex-col justify-center">
                              <Avatar name={blog.author.firstname} size={"big"} />
                            </div>
                            <div>
                                <div className=" text-xl font-bold">
                                  {blog.author.firstname}
                                </div>
                                <div className="text-slate-500">
                                Reversing the psycology, ace of all, jack of non. Yes, I yapp about a lot of things
                                </div>
                              </div>
                          </div> 
                        </div>
                </div>
            </div>
}