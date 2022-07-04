function task({res, path}) {
  res.sendFile(`${path}/magnolia.mp4`);
}

module.exports = task;
