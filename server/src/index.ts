// const fastify = Fastify({
//   logger: false,
// });

import { buildApp } from "./app";

async function startServer() {
  const app = await buildApp();

  app.listen({ port: 3000 }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
    console.log(`Server listening at ${address}`);
  });
}

startServer();
