import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'otptest064@gmail.com',
      pass: 'lfbg zpcb pvbg ztao',
    },
  });

  const mailOptions = {
    from: 'otptest064@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};