import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const createUser = async (req, res) => {
  try {
    const maxIdUser = await User.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    const nextId = maxIdUser ? maxIdUser._id + 1 : 1;
    const newUser = new User({
      ...req.body,
      _id: nextId,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const maxIdUser = await User.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    const nextId = maxIdUser ? maxIdUser._id + 1 : 1;

    const userExists = await User.findOne({ $or: [{ email }] });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      _id: nextId,
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      // Generate OTP
      const otp = generateOTP(); // Implement your OTP generation logic

      // Store the OTP in the user object
      user.otp = otp;
      await user.save();

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with the email service you are using (e.g., Gmail, Outlook, etc.)
        auth: {
          user: 'tmailer853@gmail.com',
          pass: 'vmyosxmrlazkukew',
        },
      });  

      const mailOptions = {
        from: 'tmailer853@gmail.com', // Replace with your email address
        to: user.email,
        subject: 'Account Verification',
        text: `Your verification code is ${otp}`,
        // Alternatively, you can send a verification link instead of a code
        // html: `Click <a href="http://your-verification-link">here</a> to verify your account.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending verification email:', error);
          res.status(500).json({ error: 'Failed to send verification email' });
        } else {
          console.log('Verification email sent:', info.response);
          res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
          });
        }
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to generate OTP
const generateOTP = () => {
  // Implement your OTP generation logic here
  // For example, you can use a random number generator to generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(404).json({ error: "Invalid OTP" });
    }

    // Clear the OTP field in the user object
    user.otp = "";
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};