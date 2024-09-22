import { Hono } from 'hono'
import {userRouter} from './routes/userRoute.js'
import { blogRouter } from './routes/blogRoute.js'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_Secret: string
  },
  Variables : {
		userId: string
	}
}>()
app.use('/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);




export default app
