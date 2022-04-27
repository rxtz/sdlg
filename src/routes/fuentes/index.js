function task({res, path}) {
  res.sendFile(`${path}/miami-me-lo-confirmó.mp4`);
}

module.exports = task;
