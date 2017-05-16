var state = {
  status: 'starting',
  uptime: undefined,
  download: {
    progress: undefined,
    speed: undefined,
  },
  processing: {
    filename: undefined,
    checksum: undefined,
  },
  upload: {
    acd: undefined,
    gdrive: undefined,
  },
};

module.exports = { state };
