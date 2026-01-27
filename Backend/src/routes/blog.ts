import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

type Bindings = {
  ACCELERATE_URL: string,
  JWT_SECRET: string
}
export const blogRouter = new Hono<{Bindings:Bindings}>()
blogRouter.post("/",async (c) => {
   
    try{
       const data = await c.req.json();
       console.log(data)
        const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());

    const Blog = await prisma.post.create({
     data:{
       title:data.title,
       content:data.content,
       authorId: data.authorId
     }
    })
    return c.json({
        id:Blog.id
    })
    }
    catch(Err){
         return c.text("Internal server Error",500)
    }
    
})
blogRouter.put("/",async(c) => {
  const data = await c.req.json();
    try{
        const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());

    const Blog = await prisma.post.update({
        where:{
            id:data.id
        },
        data:{
        title:data.title,
        content:data.content,
     }
    })
    return c.json({
         title:Blog.title,
         content:Blog.content
    })
    }
    catch(Err){
         return c.text("Error while fetching",411)
    }
})

blogRouter.get("/bulk",async (c) => {
  console.log("hello")
  try{
    const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    console.log(prisma)
    const blogs = await prisma.post.findMany()
    console.log(blogs)
    return c.json({
          data:blogs
    })

  }catch(Err){
      return c.text("Error while fetching",411)
  }
})


blogRouter.get("/:id",async (c) => {
  try{
    const id = c.req.param("id");
    const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());
    const Blog = await prisma.post.findFirst({
      where:{
        authorId:Number(id)
      }
    })
    return c.json({
      data:Blog
    })

  }catch(Err){
    return c.text("Error while fetching",500)
  }
  
})
