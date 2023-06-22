import nc from 'next-connect';
import bcrypt from 'bcrypt';
import db from '../../../utils/db';
import User from '@/models/User';
import { createActivationToken } from '@/utils/tokens';
import { validateEmail } from '@/utils/validation';
import sendActivationEmail from '@/utils/sendEmails';

const handler = nc();

// Sign Up handler
handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    const addedUser = await newUser.save();

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activation_token}`;

    sendActivationEmail(email, url);
    await db.disconnectDb();

    res.status(200).json({
      message: 'Successfully signed up. Please active your email',
      activation_token,
      url,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;
