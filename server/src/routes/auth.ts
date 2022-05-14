import express from 'express';
import prisma from '../lib/clients/prisma';

const authRouter = express.Router();

// Add middleware to make sure requests are from Auth0
authRouter.use((req, res, next) => {
  const { secret } = req.body;
  if (secret == process.env.AUTH0_HOOK_SECRET) {
    next();
  } else {
    // Not from Auth0
    res.sendStatus(403);
  }
});

// This endpoint is hit by Auth0 on PreUserRegistration
// Set up a user in chat db
authRouter.post('/create-user-hook', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create new user in db
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    // Send 201 response with user id for Auth0 user metadata
    // Then Auth0 can send the userId in the accesstoken
    res.status(201).send({
      userId: user.id,
    });
  } catch (e) {
    res.status(500).send({
      reason: e,
    });
  }
});

export default authRouter;
