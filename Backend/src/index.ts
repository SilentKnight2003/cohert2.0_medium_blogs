import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { schema } from './validation/auth'
type Bindings = {
  ACCELERATE_URL: string,
}
const app = new Hono<{Bindings:Bindings}>()

app.post("/api/v1/user/signup",async(c) => {
  // data got from body...
  const data = await c.req.json();
  // parse the data..
  const parsed = schema.safeParse(data);
  if(!parsed.success){
    return c.text("Invalid data",401)
  }
  // connect to the prismaclient 
  try{
     const prisma =  new PrismaClient({
     accelerateUrl:c.env.ACCELERATE_URL,
     }).$extends(withAccelerate());

    // found the user if it present..
    const user = await prisma.user.findFirst({where:{
      email:data.email
    }})
    if(user){
       return c.text("User is present",401)
    }

    // create the user.
    await prisma.user.create({
     data:{
       username:data.username,
       email:data.email,
       password:data.password
     }
    })
  return c.text("successfully signin.")

  }catch(Err){
    return c.text("Internal server Error",500)
  }
  
})
app.post("/api/v1/user/signin",(c) => {
  return c.text("signin")
})
app.post("/api/v1/blog",(c) => {
  return c.text("signin")
})
app.put("/api/v1/blog",(c) => {
  return c.text("signin")
})
app.get("/api/v1/blog/:id",(c) => {
  return c.text("signin")
})
app.get("/api/v1/blog/bulk",(c) => {
  return c.text("signin")
})
export default app

