/* -----> Third Party Packages <----- */
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")  // Cross-Origin Resource Sharing

/* -----> create Express server Instance <----- */
const app = express();

/* -----> Enable CORS for all routes <----- */
app.use(cors());

/* -----> Handling JSON Object Request <----- */
app.use(express.json());

/* -----> Connect to MongoDB database<----- */ 
// databaseName: andepraveen
const dbUrl= "mongodb+srv://andepraveen2024:andepraveen2024@andepraveen.3inavmo.mongodb.net/andepraveen?retryWrites=true&w=majority&appName=andepraveen"
mongoose.connect(dbUrl).then(() => console.log("Database connected")
).catch((err) => console.log(err))

/* -----> Create Schema <----- */
const TodoSchema = mongoose.Schema(
  {
  item: { type: String, required: true, index: true },
  isChecked: Boolean
  }, 
  {
  // Define indexes here
  indexes: [
    { item: 1 }
  ]
})

/* -----> Create Collection <----- */
const TodoList = mongoose.model("todoApplication", TodoSchema)

/* -----> Routes <----- */
// 00 Home
app.get("/", (request, response)=>{
    console.log("Home")
    response.send("Home")
})

// 01 Add Todo
app.post("/add-todo", async (request, response)=>{
    console.log("Add Todo")
    // console.log(request.body)
    const {item, isChecked} = request.body
    
    const newTodo = new TodoList({
        item,
        isChecked
    })
    console.log(newTodo)
    await newTodo.save()

    // const finalData = await TodoList.find()
    // response.send(finalData)
    response.send("Successfully Todo Added")
})

// 02 Get Todolist
app.get("/todolist", async (request, response)=>{
    console.log("Get Todolist")

    const todoList = await TodoList.find()
    console.log(todoList)
    response.send(todoList)

})


/* -----> Assigning a port Number to the server <----- */
const port = 5000
app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
})