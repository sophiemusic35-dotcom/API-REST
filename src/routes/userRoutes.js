import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser
} from '../controller/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.delete('/:id', deleteUser)

export default router
