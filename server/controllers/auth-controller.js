
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Backend");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

const register = async(req,res)=>{
    try {
        console.log(req.body)
        res.status(200).json({message:req.body});
    } catch (err) {
        console.error(err);
        res.status(400).send("Page Not Found");
    }
}

module.exports = { home,register };
