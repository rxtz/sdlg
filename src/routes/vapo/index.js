function task({res, path}) {
  res.sendFile(`${path}/vapo.mp4`);
}

module.exports = task;
