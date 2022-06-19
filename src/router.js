import { Router } from 'express';
const router = Router();

import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const routes = [];
const routesPath = join(__dirname, 'routes');

readdirSync(routesPath).forEach((r) => {
  routes.push(r);
});

router.get(['/', '/:r'], (req, res) => {
  const isDev = () => req.hostname === '127.0.0.1';

  if (req.path === '/' && (req.hostname === '0b1.vercel.app' || isDev())) {
    const routesLinks = [];

    for (const r of routes) {
      routesLinks.push(
        `${req.protocol}://${
          isDev() ? `${req.get('X-Forwarded-Host')}/${r}` : `${r}.vercel.app/`
        }`
      );
    }

    res.json(routesLinks); // send routes list
  }

  const r = isDev()
    ? req.params['r'] // localhost:3000/<r>
    : req.hostname.split('.')[0]; // <r>.vercel.app

  const staticFile = join(__dirname, '../public', r);
  const taskPath = `${routesPath}/${r}/index.js`;

  if (existsSync(staticFile)) {
    res.sendFile(staticFile);
  } else if (existsSync(taskPath)) {
    const task = require(taskPath);
    task({ req, res, path: taskPath.replace('index.js', '') });
  } else {
    res.status(404);
    res.json({ error: '404 Not Found' });
  }
});

export default router;
