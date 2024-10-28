const z = require('zod');
//npm install zod package
const signupSchema = z.object({
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
    pnum:z
    .string({required_error:"Phone is Required"})
    .trim()
    .min(11,{message:"Phone must be at least 11 characters"})
    .max(20,{message:"Phone must not be more than 20 characters"}),
    pass:z
    .string({required_error:"Password is Required"})
    .trim()
    .min(7,{message:"Password must be at least 7 characters"})
    .max(1024,{message:"Password must not be more than 1024 characters"})
})

module.exports = signupSchema;