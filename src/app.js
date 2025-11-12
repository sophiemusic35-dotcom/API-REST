import express from 'express'
import userRoutes from "./routes/userRoutes.js"

const app = express()
app.use(express.json())

// Rutas
app.use('/users', userRoutes)

// Prueba inicial
app.get('/', (req, res) => {
  res.send('API funcionando con Prisma + Express')
})

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'))
