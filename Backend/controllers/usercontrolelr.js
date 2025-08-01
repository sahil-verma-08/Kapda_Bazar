
import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//   route for user login 


const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {

   try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
         return res.json({ success: false, message: "User not exist" })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
         const token = createToken(user._id)
         res.json({ success: true, token })
      }
      else {
         res.json({ success: false, message: 'invalid credentials' })
      }
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }
} 

// route for user register 

const registeruser = async (req, res) => {
   try {

      const { name, email, password } = req.body;
      //checking user already exists or not

      const exits = await userModel.findOne({ email })
      if (exits) {
         return res.json({ success: false, message: 'User already exist' })
      }

      // validate email formate &strong password

      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: 'Please enter valid email' })
      }
      if (password.length < 8) {
         return res.json({ success: false, message: 'Please enter strong password' })
      }


      // hashing user password

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new userModel({
         name,
         email,
         password: hashedPassword
      })

      const user = await newUser.save()

      const token = createToken(user._id)

      res.json({ success: true, token })


   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

//route for admin login 

const adminLogin = async (req, res) => {

   try {
      const {email,password}=req.body;
      if (email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token =jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
      }
      else{
         res.json({success:false,message:"Invalid credentials"})
      }
   } catch (error) {

      console.log(error);
      res.json ({success:false,message:error.message})
      
   }


}

export { loginUser, registeruser, adminLogin }