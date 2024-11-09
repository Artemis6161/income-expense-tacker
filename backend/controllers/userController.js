// const jwt = require('jsonwebtoken');
// const User = require('../models/Usermodels');

// // Register a new user
// exports.registerUser = async (req, res) => {
//     const { userName, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         user = new User({ userName, email, password });
//         await user.save();

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ token, userName: user.userName });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Login an existing user
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Create a token with userId and userName as payload
//         const token = jwt.sign(
//             { userId: user._id, userName: user.userName },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' } // Adjust the expiration as needed
//         );

//         // Respond with the token and optionally other user info
//         res.json({
//             message: 'Login successful',
//             token,
//             user: {
//                 userName: user.userName,
//                 userId: user._id,
//             },
//         });
//     } catch (error) {
//         console.error('Error in login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Get user profile
// exports.getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
