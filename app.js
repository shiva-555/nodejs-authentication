import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/router.js";
const app = express();
const port = 6000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);
// app.use('/api/post', router);
// app.use('/api/comment', router);


mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/my_DB", {
    useNewUrlParser:true
}).then(() => {
    console.log("connected!")
}).catch((err) => {
    console.log(err)
});

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
});