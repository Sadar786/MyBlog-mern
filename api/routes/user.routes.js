import express from 'express'
const UserRouter = express.Router();
import { test, updateUser, deleteUser, signOut, getUsers } from '../controllers/user.controllers.js';
import { verifyUser } from '../utils/verifyUser.js';

UserRouter.get('/test',test)
UserRouter.put('/api/update/:userId', verifyUser,   updateUser)
UserRouter.delete('/api/delete/:userId', verifyUser,   deleteUser)
UserRouter.post('/api/signout',    signOut)
UserRouter.get('/getUsers', verifyUser, getUsers)

export default UserRouter;