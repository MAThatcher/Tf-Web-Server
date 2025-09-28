const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const key = require('./key');

router.get(`/personal`, async function (req, res, next) {
  try {
    const { message = '', sender = '' } = req.query;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Missing message query parameter' });
    }
    const MAX_CHARS = 1950;
    const chunks = [];
    for (let i = 0; i < message.length; i += MAX_CHARS) {
      chunks.push(message.slice(i, i + MAX_CHARS));
    }
    const results = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const content = `\`\`\`${sender}:${chunk}\`\`\``;
      try {
  const resp = await axios.post(`${key.personal}`, { content: content });
  results.push({ part: i + 1, success: true, status: resp?.status });
      } catch (err) {
        console.error(`Error posting personal chunk ${i + 1}:`, err.message || err);
        results.push({ part: i + 1, success: false, error: err.message || err });
      }
    }
    res.json({
      success: true,
      message: '/personal call successful',
      parts: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Error:", error.message);
    try {
      const logPath = path.join(__dirname, '..', 'error.log');
      const logEntry = `${new Date().toISOString()} - /personal error: ${error.message}\n${error.stack || ''}\n\n`;
      fs.appendFile(logPath, logEntry, (fsErr) => {
        if (fsErr) {
          console.error('Failed to write error log:', fsErr.message);
        }
      });
    } catch (fsCatchErr) {
      console.error('Failed to prepare error log:', fsCatchErr.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(`/RenMessage`, function (req, res, next) {
  try {
  const { message, sender, character, radius } = req.query;
    const content = `\`\`\`${sender}${sender !== character ? " (" + character + ")" : ""} ${radius}s:
${message}\`\`\``;

    axios.post(
      `${key.RenMessage}`, { content: content }
    );

    res.json({
      success: true,
      message: '/message call successfull',
    });
  }
  catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(`/RenLog`, function (req, res, next) {
  try {
    const { charName, eventType, eventId, eventCategory, params } = req.query;

    const content = `\`\`\`Who:${charName}
Event Category:${eventCategory}
Event Type:${eventType}
Event Id: ${eventId}
Params: ${params}\`\`\``;
    axios.post(
      `${key.RenLog}`, { content: content, }
    );
    res.json({
      success: true,
      message: '/log call successfull',
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;