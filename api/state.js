var state = {
  status: 'starting',
  uptime: undefined,
  queue: [
    {
      url: 'https://mega.co.nz/!sodsbguit6723fbf2gu1ibf1',
    },
    {
      url: 'https://mega.co.nz/!ahahah1ehi11jj1j1j1j1',
    },
  ],
  downloads: [
    {
      status: 'starting',
    },
    {
      status: 'error',
      uptime: '00:01:54',
      download: {
        progress: '100%',
        speed: '5.0 MB/s',
      },
    },
    {
      status: 'complete',
      uptime: '00:10:23',
      download: {
        progress: '100%',
        speed: '3.0 MB/s',
      },
      processing: {
        filename: 'ddd24dad-b7b2-434b-8dc4-f1117da01c30',
        checksum: 'ddd24dad-b7b2',
      },
      upload: {
        acd: 'complete',
        gdrive: 'complete',
      },
    },
  ],
};

module.exports = { state };
