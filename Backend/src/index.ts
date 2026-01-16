import { Hono } from 'hono'

const app = new Hono()

app.post("/api/v1/user/signup",(c) => {
  return c.text("signup")
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

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza18yUUZHQ1RkQXJRalZXci1Jd3phNEwiLCJhcGlfa2V5IjoiMDFLRjJTMTVNRDhNRFc1SkVOTlAyMjBIRkYiLCJ0ZW5hbnRfaWQiOiIwMmE4ZmQ4YWEzZjg2ZTA4NTM5MjVhNjkxOTQxYzFhOWNkNGFkZDFhZDJhYTBkZTg0MzFiMjRhYjJmYzZiMTc3IiwiaW50ZXJuYWxfc2VjcmV0IjoiZjdjMzRkY2YtOTg0Yy00NTk4LThiNDUtNDhhODZmZGEwMmYzIn0.1UDVuM1QUOaj3E2naNKA1e4B8DM9rL8lTEZ5dIyi53A"