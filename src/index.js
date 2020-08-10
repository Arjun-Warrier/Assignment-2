const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const port = process.env.PORT;

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})