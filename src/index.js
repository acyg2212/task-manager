const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const multer = require('multer')
const upload = multer({
    dest: 'test',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        if (!file.originalname.match(/\.(doc | docx)$/)) {
            return cb(new Error('Please upload a Word Document'))
        }
        cb(undefined, true);
    }
})


app.post("/", upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

