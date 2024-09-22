import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Appbar = () =>{
  return <div className="flex justify-between border-b py-4 px-10">
              <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
                   Medium
              </Link>
              <div className="h-full">
                   <Link to={"/publish"}>
                      <button type="button"  className="text-white bg-green-700 hover:bg-green-800 mr-6 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2">Publish</button>
                    </Link>
                  <Avatar name="Kaushik" size={"big"} />
              </div>
        </div>
}