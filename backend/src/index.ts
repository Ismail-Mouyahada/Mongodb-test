import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import amqp from "amqplib/callback_api";
import itemRoutes from "./routes/item.routes";

dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

app.use("/api/items", itemRoutes);

// Connexion à RabbitMQ
amqp.connect("amqp://user:password@rabbitmq", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, channel) => {
    if (err) throw err;

    const queue = "messages";
    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      console.log("📩 Message reçu:", msg?.content.toString());
    });
  });
});

app.listen(PORT, () => console.log(`🚀 Serveur API sur http://localhost:${PORT}`));
