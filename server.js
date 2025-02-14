const server = require('./app')
const port = 4000
const mongoose = require('mongoose')




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
}
main().catch(err => console.log(err)); 



server.listen(port,()=>{
    console.log("listening to port:",port)
})