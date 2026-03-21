import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput,loginInput } from '@subhransujena/medium-common'
import {sign} from "hono/jwt"



type Bindings = {
  ACCELERATE_URL: string,
  JWT_SECRET: string
}
export const userRouter = new Hono<{Bindings:Bindings}>()

/// Signup Route ///
userRouter.post("/signup",async(c) => {
  const data = await c.req.json();
  const parsed = signupInput.safeParse(data);
  if(!parsed.success){
    return c.text("Incorrect inputs.",411)
  }
  try{
     const prisma =  new PrismaClient({
     accelerateUrl:c.env.ACCELERATE_URL,
     }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({where:{
      email:data.email
    }})
    if(user){
       return c.text("User is present",401)
    }
    const User = await prisma.user.create({
     data:{
       username:data.username,
       email:data.email,
       password:data.password
     }
    })
    const jwt = await sign({
      id:User.id
    },c.env.JWT_SECRET)
     return c.text(jwt)

  }catch(Err){
    return c.text("Internal server Error",500)
  }
  
})
/// Login Route ///
userRouter.post("/login",async (c) => {
  const data = await c.req.json();
  const parsed = loginInput.safeParse(data)
  if(!parsed.success){
    c.status(411)
    return c.json({
      message:"Inputs not correct"
    })
  }
  try{
    const prisma =  new PrismaClient({
     accelerateUrl:c.env.ACCELERATE_URL,
     }).$extends(withAccelerate());
     const user = await prisma.user.findFirst({where:{
      username:data.username,
      password:data.password
    }})
    if(!user){
      c.status(403);
      return c.text("User not present.");
    }
    const jwt = await sign({
      id:user.id
    },c.env.JWT_SECRET)
    return c.text(jwt)
  }
  catch(err){
    return c.text("Internal server error",501)

  }
})