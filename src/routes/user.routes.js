import { Router } from 'express'
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller'

const router = Router()

// CREATE USER
router.post('/', createUser)

// GET USERS
router.get('/', getUsers)

// UPDATE USER
router.put('/', updateUser)

// DELETE USER
router.delete('/', deleteUser)

export default router