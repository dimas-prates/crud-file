import express from 'express'
import "dotenv/config"
import routes from './routes'

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(routes)

app.listen(port, () => { console.log(`\n Server's running on port ${port} \n`) })