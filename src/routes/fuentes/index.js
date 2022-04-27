function task({res, path}) {
  res.sendFile(`${path}/fuentes.mp4`);
}

module.exports = task;
