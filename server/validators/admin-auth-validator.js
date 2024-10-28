const z = require('zod');
//npm install zod package
const adminregSchema = z.object({
    name:z
    .string({required_error:"Name is Required"})
    .trim()
    .min(3,{message:"Name must be at least 3 characters"})
    .max(50,{message:"Name must not be more than 50 characters"}),
    mail:z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email must be at least 3 characters"})
    .max(50,{message:"Email must not be more than 50 characters"}),
    pass:z
    .string({required_error:"Password is Required"})
    .trim()
    .min(7,{message:"Password must be at least 7 characters"})
    .max(1024,{message:"Password must not be more than 1024 characters"})
})

module.exports =adminregSchema;