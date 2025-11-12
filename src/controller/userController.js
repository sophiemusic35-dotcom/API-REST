import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//Traer los usuarios

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: { posts: true } // si usas relación con Post
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
      include: { posts: true }
    })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario' })
  }
}

// Crear un usuario
export const createUser = async (req, res) => {
  const { name, email } = req.body
  try {
    const newUser = await prisma.users.create({
      data: { name, email }
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.user.delete({ where: { id: Number(id) } })
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}
