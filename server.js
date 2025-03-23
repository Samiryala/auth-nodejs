require('dotenv').config()
const exp=require('express')
const connecttodb=require('./database/db')
const authrouter=require('./routers/auth-routes')
const homerouter=require('./routers/home-page')
const adminrouter=require('./routers/admin-page')
const uploadimage=require('./routers/image-routes')
//database connection 
connecttodb()

const app = exp()
const port =process.env.port || 3000

app.listen(port,()=>{
    console.log('server up')
})
app.use(exp.json())//testa3mele bech tesma3 ll body bl json 
app.use('/api/auth',authrouter)
app.use('/api/home',homerouter)
app.use('/api/admin',adminrouter)
app.use('/api/image',uploadimage)