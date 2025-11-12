import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { user: true }, // opcional, para mostrar el usuario asociado
    })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Crear nueva tarea
export const createTask = async (req, res) => {
  const { title, completed, userId } = req.body
  try {
    const newTask = await prisma.task.create({
      data: { title, completed, userId },
    })
    res.json(newTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Actualizar tarea
export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body
  try {
    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, completed },
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Eliminar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.task.delete({ where: { id: Number(id) } })
    res.json({ message: 'Tarea eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
