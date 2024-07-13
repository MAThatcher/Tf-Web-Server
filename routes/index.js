const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const key = require('./key');

router.get(`/personal`, function (req, res, next) {
  try {
    const { message, sender } = req.query;
    const content = `\`\`\`${sender}:${message}\`\`\``;

    axios.post(
      `${key.personal}`,
      {
        content: content,
      }
    );
    res.json({
      success: true,
      message: '/personal call successfull',
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(`/RenMessage`, function (req, res, next) {
  try {
    const { message, sender, character, location, radius } = req.query;
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
    const shift = `${params}`
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