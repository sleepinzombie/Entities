import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
} from './api/routes.ts';

const router = new Router();
const prevPath = '/api/v1';

router
  .get('/', (ctx: RouterContext) => {
    ctx.response.status = 200;
    ctx.response.body = "Welcome to KinesisGames' Entities API!";
  })
  .get(`${prevPath}/`, getEntities)
  .post(`${prevPath}/add`, createEntity)
  .post(`${prevPath}/update`, updateEntity)
  .post(`${prevPath}/delete`, deleteEntity);

const port: number = parseInt(config().API_PORT);
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  oakCors({
    origin: 'http://localhost:3000',
  })
);

app.listen({ port: port });
console.log(`Listening on port: ${port}`);
