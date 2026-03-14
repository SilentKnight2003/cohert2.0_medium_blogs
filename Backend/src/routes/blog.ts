import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { authHandler } from '../Middlewares/auth'


type Bindings = {
  ACCELERATE_URL: string,
  JWT_SECRET: string
}
type Variables = {
  userId:string
}

export const blogRouter = new Hono<{Bindings:Bindings,Variables:Variables}>()
blogRouter.use(authHandler)

// Create a new Blog for the current login user.
blogRouter.post("/",async (c) => {
    try{
       const data = await c.req.json();
       const authorId = c.get("userId")
        const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());

    const Blog = await prisma.post.create({
     data:{
       title:data.title,
       content:data.content,
       authorId:Number(authorId)
     }
    })
    return c.json({
        message:"Blog created successfully"
    })
    }
    catch(Err){
         return c.text("Internal server Error",500)
    }
    
})

// Show all blogs despite the user  login.
blogRouter.get("/bulk",async (c) => {
  try{
    const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany()
    return c.json({
          data:blogs
    })

  }catch(Err){
      return c.text("Error while fetching",411)
  }
})

// Update the blog for the login usre.
blogRouter.put("/:id",async(c) => {
  const data = await c.req.json();
  const id = c.req.param("id")
    try{
        const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());

    const Blog = await prisma.post.update({
        where:{
            id:Number(id)
        },
        data:{
        title:data.title,
        content:data.content,
     }
    })
    console.log(Blog)
    return c.json({
         title:Blog.title,
         content:Blog.content
    })
    }
    catch(Err){
         return c.text("Error while fetching",411)
    }
})

// show login user specific blog.
blogRouter.get("/:id",async (c) => {
  try{
    const id = c.req.param("id");
    const prisma =  new PrismaClient({
        accelerateUrl:c.env.ACCELERATE_URL,
        }).$extends(withAccelerate());
    const Blog = await prisma.post.findFirst({
      where:{
        id:Number(id)
      }
    })
    return c.json({
      data:Blog
    })

  }catch(Err){
    return c.text("Error while fetching",500)
  }
  
})
