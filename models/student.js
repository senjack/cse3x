// 1. Import requirements i.e. Schema & Model
const {Schema, model} = require('mongoose');


// 2. Create a Schema for a given Object, i.e. 
    // Define fields for a specific object, each field with its corresponding meta data
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,

    },
    lastName: {
        type: String,
        required: true,
    },
});


// 3. Create a model for the object.
// Specify the Model name and its Schema
const Student = model('student', StudentSchema);

// 4. Export the Model
module.exports = Student;
