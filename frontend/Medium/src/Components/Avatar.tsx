export const Avatar = ({name, size="small"} : {name : string, size: "small" | "big"}) =>{
    return  <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "h-6 w-6" : "h-10 w-10"}`}>
                        <span className={`font-medium text-xs text-gray-600 dark:text-gray-300 ${size === "small" ? "text-sm" : "text-md"}`}> {name[0]}</span>
                </div>
}