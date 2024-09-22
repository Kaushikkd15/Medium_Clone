import { z } from "zod"

export const signUpInput = z.object({
     email : z.string().email(),
     password: z.string().min(6),
     username: z.string(),
     lastname: z.string()
});

export type SignUpInput = z.infer<typeof signUpInput>

export const signInInput = z.object({
    email : z.string().email(),
    password: z.string().min(6)
})

export type SignInInput = z.infer<typeof signInInput>

export const createBlog = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlog = z.infer<typeof createBlog>

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>