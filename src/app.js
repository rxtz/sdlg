import express from 'express';

import compression from 'compression';
import helmet from 'helmet';

import router from './router';

const app = express();

app.use(compression());
app.use(helmet());

app.use(router);

app.listen(process.env.PORT || 3000);

export default app;
