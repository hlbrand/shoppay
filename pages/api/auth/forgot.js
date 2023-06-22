import nc from 'next-connect';
import db from '@/utils/db';
import User from '@/models/User';
import { createResetToken } from '@/utils/tokens';
import { resetEmail } from '@/utils/sendEmails';

const handler = nc();

// Sign Up handler
handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' });
    }

    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

    resetEmail(email, url);
    await db.disconnectDb();

    res.status(200).json({
      message: 'An email has been sent to you, use it to reset your password',
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
