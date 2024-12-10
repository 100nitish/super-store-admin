


const validate = (schema) =>async(req,res,next) =>{
 try{

    const parseBody = await schema.parseAsync(req.body)
    
    req.Body = parseBody;
    next();

 }catch(error){
    const message = "Fill the Input Properly"
    const extraDetails = error.errors[0].message;
    const status =422

    const err ={
        status,
        message,
        extraDetails
    }
//    res.status(400).json({msg:message})
next(err)
   console.log(err)
 }
}

module.exports={validate};