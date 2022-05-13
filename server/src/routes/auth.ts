import express from 'express';
import prisma from 'src/lib/clients/prisma';

const authRouter = express.Router();

// This endpoint is hit by Auth0 on PreUserRegistration
// Set up a user in chat db
authRouter.post('create-user-hook', async (req, res) => {
  try {
    const { name, email } = req.body;
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.send({
      success: true,
      message: 'created',
    });
  } catch (e) {
    res.send({
      success: false,
      message: e,
    });
  }
});

export default authRouter;
