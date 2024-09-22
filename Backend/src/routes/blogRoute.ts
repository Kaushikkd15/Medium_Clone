import { createBlog, updateBlogInput } from "@kaushik_kd/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_Secret: string;
    }, 
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    
      try{
      const user = await verify(jwt, c.env.JWT_Secret)
      if(user){
        c.set("userId", user.id as string);
        await next();
      }else{
        c.status(403);
        return c.json({msg: "Unauthorized"});
      }
    }catch(error){
      c.status(403);
        return c.json({msg: "Unauthorized"});
    }
   
  })

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const { success } = createBlog.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({err: "Invalid Inputs "})
    }
    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({id: blog.id})
  })
  blogRouter.put('/', async (c) => {
     const body = await c.req.json()
     const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
     const { success } = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({err: "Invalid Inputs "})
    }
     const blogUpdate = await prisma.blog.update({
          where:{
               id: body.id
          },
          data:{
            title: body.title,
            content: body.content,
          }
     })

    return c.json({msg: 'blog Updated'});
  })
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
    
    try{
        const blog = await prisma.blog.findMany({
            select: {
              id: true,
              title: true,
              content: true,
              author: {
                select: {
                  firstname: true
                }
              }
            }
        })
        return c.json({blog});
    }catch(err){
        c.status(403);
        return c.json({msg: "There's an error while fetching blog posts"})
    }
    
  })



  blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
    
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: id
            },select: {
              id: true,
              title: true,
              content: true,
              author: {
                select: {
                  firstname: true
                }
              }
            }
        })
        return c.json({blog});
    }catch(err){
        c.status(403);
        return c.json({msg: "There's an error while fetching blog posts"})
    }
    
  })
