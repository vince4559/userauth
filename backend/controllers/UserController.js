const userModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRETE_KEY

exports.signUp = async(req, res, next) => {
    const {name, email, password} = req.body

    // checking if user already existed to avoid duplicated data
    let existingUser;
    try {
        existingUser = await userModel.findOne({email:email})
    } catch (error) {
        console.log(error)
    }

    if(existingUser){
        return res.status(400).json({message:'User with same incredentails already existed'})
    }

    // submitting user details  to database
    const hashedPassword = bcrypt.hashSync(password)  // encrypting password
    const user = userModel({
        name, 
        email, 
        password: hashedPassword
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }
    return res.status(201).json({message:'signup succesfull', user:user})
}



 exports.login = async(req, res, next) => {
    const {email, password} = req.body
    //check if user exist
    let existingUser;

    try {
        existingUser = await userModel.findOne({email:email})
    } catch (error) {
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message: 'user does not exist, try again'})
    }

    // compare password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:'Invalid email or password'})
    }
    // token
    const token = jwt.sign({id:existingUser._id}, JWT_SECRET_KEY, {
        expiresIn:'45s'
    });

    console.log("Generated Token\n", token)


    // checking if cookies already existed
    if( req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ""
    }

        // cookie
        res.cookie(String(existingUser._id), token, {
            path:'/',
            expires: new Date(Date.now() + 1000 * 45),
            httpOnly: true,
            sameSite:'lax'
        });

    return res
    .status(200)
    .json({message:'Successfully logged in', user:existingUser, token})
}

    exports.verifyToken = (req, res, next) => {
        // use this
        const cookies = req.headers.cookie;
        // console.log(cookies)
        const token = cookies.split("=")[1];
        // console.log(token)

        // try this
        // const headers = req.headers[`authorization`];
        // const token = headers.split(" ")[1];

        if(!token){
            return res.status(404).json({message:'no token found'})
        }
        jwt.verify(String(token),JWT_SECRET_KEY, (err, user) => {
            if(err){
              return  res.status(400).json({message:'Invalid Token'})
            }
            console.log(user.id)
            req.id = user.id
        });
        next()
}


exports.getUser =async (req, res, next) => {
    const userId = req.id
    let user;

    try {
        user = await userModel.findById(userId, "-password");
    } catch (err) {
       return new Error(err)
    }

    if(!user){
        return res.status(404).json({message:'User not found'})
    }
        return res.status(200).json({user})
};

exports.refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const prevToken = cookies.split("=")[1];

    if(!prevToken){
        return res.status(400).json({message: "we couldn't find token "})
    }
    
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
        if(err){
            console.log(err);
            return res.status(403).json({message:"Authentication failed"})
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        // token
    const token = jwt.sign({id:user.id}, JWT_SECRET_KEY, {
        expiresIn:'45s'
    });
    console.log("Generated Token\n", token)

        // cookie
        res.cookie(String(user.id), token, {
            path:'/',
            expires: new Date(Date.now() + 1000 * 45),
            httpOnly: true,
            sameSite:'lax'
        });

        req.id = user.id;
        next()
    })
};


exports.logOut = (req, res, next) => {
    const cookies = req.headers.cookie  
    const prevToken = cookies.split("=")[1];

    if(!prevToken){
        return res.status(400).json({message: "we couldn't find token "})
    }
    
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
        if(err){
            console.log(err);
            return res.status(403).json({message:"Authentication failed"})
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({message: "Logged out Successfully"})
    })
}

