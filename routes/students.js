// 1. Import requirements i.e.
    // 1.1. Router from Express
    // 1.2. <model> from <models>

const {Router} = require('express');
const Student = require('./../models/student')

// 2. Create a Router instance
const router = Router()


// 3. Create routes
// 3.1. Create a post route for the model.
router.post('/', async (req,res)=>{
    const newStudent = new Student(req.body)
    try{
        const student = await newStudent.save()
        if(!student) throw Error('Something went wrong!')
        res.status(201).json(student)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

// 3.2. Create a get all route for the model.
router.get('/', async (req,res)=>{
    try{
        const students = await Student.find()
        if(!students) throw Error('Something went wrong!')
        res.status(200).json(students)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

// 3.3. Create a get one route for the model.
router.get('/:id', async (req,res)=>{
    const {id} = req.params

    try{
        const student = await Student.findById(id);
        if(!student) throw Error('Resource not found!')
        res.status(200).json(student)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


// 3.4. Create a put route for the model.
router.put('/:id', async (req,res)=>{
    const {id} = req.params
    updates = {...req.body}

    try{
        const student = await Student.findByIdAndUpdate(id, updates);

        if(!student) throw Error('Something went wrong!')

        const newStudent = {...student._doc, ...updates};
        res.status(200).json(newStudent)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


// 3.4. Create a delete route for the model.
router.delete('/:id', async (req,res)=>{
    const {id} = req.params

    try{
        const deleted = await Student.findByIdAndDelete(id);
        console.log(deleted);

        if(deleted==null) {
            res.status(404).json({message: 'Not Found'})
            return null
        }

        if(!deleted) throw Error('Something went wrong!')

        res.status(200).json(deleted)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

module.exports = router;