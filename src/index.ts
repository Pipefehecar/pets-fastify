import Fastify from "fastify";
import foundationRoutes from "./routes/foundation";
import petRoutes from "./routes/pet";

const PORT = process.env.APP_RUNNING_PORT || 3000;
const fastify = Fastify({ logger: true });

fastify.register(foundationRoutes, { prefix: "/foundation" });
fastify.register(petRoutes, { prefix: "/pet" });

const start = async () => {
  try {
    await fastify.listen({ port: +PORT });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
