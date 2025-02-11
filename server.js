const app = require('./app')
const port = 4000
const mongoose = require('mongoose')




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
}
main().catch(err => console.log(err)); 


app.listen(port,()=>{
    console.log("listening to port:",port)
})