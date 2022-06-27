const router = require('express').Router();

const fs = require('fs');
const path = require('path');

const routes = [];
const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((r) => {
  routes.push(r);
});

router.get(['/', '/:r'], (req, res) => {
  const isDev = () => req.hostname === '127.0.0.1';

  if (req.path === '/' && (req.hostname === 'sdlg.vercel.app' || isDev())) {
    const routesLinks = [];

    for (const r of routes) {
      routesLinks.push(
        `http${isDev() ? '' : 's'}://${
          isDev() ? `${req.get('X-Forwarded-Host')}/${r}` : `${r}.vercel.app/`
        }`
      );
    }

    res.json(routesLinks); // send routes list
  }

  const r = isDev()
    ? req.params['r'] // localhost:3000/<r>
    : req.hostname.split('.')[0]; // <r>.vercel.app

  const staticFile = path.join(__dirname, '../public', r);
  const taskPath = `${routesPath}/${r}/index.js`;

  if (fs.existsSync(staticFile)) {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.sendFile(staticFile);
  }
  else if (fs.existsSync(taskPath)) {
    const task = require(taskPath);
    task({ req, res, path: taskPath.replace('index.js', '') });
  }
  else {
    res.status(404);
    res.json({ error: '404 Not Found' });
  }
});

module.exports = router;
