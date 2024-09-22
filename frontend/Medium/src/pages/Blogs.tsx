import { Appbar } from "../Components/Appbar"
import { BlogCard } from "../Components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () =>{
    const {loading , blogs} = useBlogs();

    if(loading){
        return <>
             Loading.... 
        </>
    }

    return <div>
               <Appbar/> 
                  <div className="flex justify-center">
                    <div>
                        {blogs.map(blog=>
                            <BlogCard id={blog.id} authorName={blog.author.firstname} title = {blog.title} content={blog.content}publishedDate="17.08.2024"/>
                        )}
                    </div>
                </div>
            </div>
}