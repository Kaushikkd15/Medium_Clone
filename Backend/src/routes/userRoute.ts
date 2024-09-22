import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@kaushik_kd/medium-common"

export const userRouter = new Hono<{
   Bindings: {
    DATABASE_URL: string,
    JWT_Secret: string
   }
}>();


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body)
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
    if(!success){
        c.status(403);
        return c.json({error: "Invalid Inputs "})
    }
    const user=  await prisma.user.create({
         data: {
          email:  body.email,
          password: body.password,
          firstname: body.firstname,
          lastname: body.lastname
         },
    })
    const token = await sign({id: user.id},c.env.JWT_Secret);
    return c.json({jwt:token})  
  })
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL})
    const body = await c.req.json()
    const { success } = signInInput.safeParse(body)
    if(!success){
        c.status(403);
        return c.json({err: "Invalid Inputs "})
    }
    const user= await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
  
    if(!user){
      c.status(403);
      return c.json({error: "User not found"})
    }
     const token = await sign({id:user.id}, c.env.JWT_Secret);
     return c.json({token})
  })