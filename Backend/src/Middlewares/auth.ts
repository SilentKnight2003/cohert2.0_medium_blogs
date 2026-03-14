import { decode, verify } from 'hono/jwt'
import { MiddlewareHandler } from 'hono'
type Bindings = {
    JWT_SECRET: string
}

type Variables = {
     userId:string,
}
export const authHandler:MiddlewareHandler<{Bindings:Bindings,Variables:Variables}> = (async (c,next) => {
  const authHeader = c.req.header("authorization")|| "";
  const user = await verify(authHeader,c.env.JWT_SECRET,'HS256')
  if (user) {
    c.set("userId",user.id as string);
    await next();
  }else{
     return c.json({
      message:"You are not logged in."
     },403)
  }
 
})