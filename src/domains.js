/*
 * Basics
 * https://vercel.com/docs/rest-api
 * REST architecture
 * HTTP 1 1.1 *2*
 * Content-Type: application/json
 * Vercel Access Token required
 * Authorization: Bearer <TOKEN>
 * RATE LIMITS
 * X-RateLimit-Limit: 100
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const vercelToken = readFileSync(
  join(__dirname, '../vercel-token.txt'),
  'utf-8'
).replace('\n', '');

const headers = [
  ['Authorization', `Bearer ${vercelToken}`],
  ['Content-Type', 'application/json'],
];

const routesPath = join(__dirname, 'routes');

readdirSync(routesPath).forEach((r) => {
  const domainsPath = `${routesPath}/${r}/domains.json`;

  if (existsSync(domainsPath)) {
    const domains = require(domainsPath);

    for (let i = 0; i < domains.length; ++i) {
      const body = JSON.stringify(
        Object.assign(
          { name: `${domains[i]}.vercel.app` },
          i !== 0
            ? {
                redirect: `${domains[0]}.vercel.app`,
                redirectStatusCode: 301,
              }
            : null
        )
      );

      fetch('https://api.vercel.com/v8/projects/0b1/domains', {
        method: 'POST',
        headers,
        body,
      }).then((res) => console.log(res));
    }
  }
});
