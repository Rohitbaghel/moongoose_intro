const express = require('express');
const mongoose = require('mongoose');

const connect = ()=>{
    return mongoose.connect("mongodb+srv://rohit11:rohit11@cluster0.iidm5.mongodb.net/entertainment")
}

const userSchema = new mongoose.Schema({
    
    movie_name:{type: String, require:true , unique:true},
    movie_genre:{type: String, require:true},
    production_year:{type: Number, require:true},
    budget:{type: Number, require:true},


},
{
    versionKey:false,
    timestamps:true,
}
)

const Movies = mongoose.model('movie', userSchema)
const app = express()


app.use(express.json())




app.get("/movies", async (req, res) =>{
    try{
        const movie = await Movies.find().lean().exec()
        res.send({movie})
        res.status(200).send({movie})
    }catch(e){
        res.status(404).json({status: e.message})
    }
})


app.get('/movies/:id', async (req, res) => {
    try{

        const movie = await Movies.findById(req.params.id).lean().exec()
    
        res.send({movie})
    }catch(err){
        res.status(404).json({status: e.message})
    }
})

app.post("/movies",async (req, res) => {
    try{
        const movie = await Movies.create(req.body)
        res.status(201).send(movie)

    }catch(err){
        res.status(500).json({status: err.message})
    }
})

app.patch("/movies/:id", async (req, res) =>{
    try{
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        })
      res.status(201).send(movie)

    }catch (er) {
        res.status(500).json({status: er.message})
    }
})


app.delete("/movies/:id", async (req, res) =>{
    try{
        const movie = await Movies.findByIdAndDelete(req.params.id,).lean().exec()
    
        res.status(200).send(movie)

    }catch(e){
        res.status(500).json({message: e.message})
    }
})





app.listen(2345,async ()=>{
   await connect()
    console.log("Listening on port 2345");
})