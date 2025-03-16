const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint to fetch the download URL
app.get('/download', (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const command = `yt-dlp -g ${videoUrl}`;

  // Execute the yt-dlp command to get the direct download URL
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error fetching video URL:', stderr);
      return res.status(500).json({ error: 'Failed to fetch video URL' });
    }

    const downloadUrl = stdout.trim();
    res.json({ downloadUrl });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
