const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const key = require('./key');

router.get(`/message`, function (req, res, next) {
  try {
    const { message, sender, character, location, radius } = req.query;
    const content = `\`\`\`${sender}${sender !== character ? " (" + character + ")" : ""} ${radius}s:
${message}\`\`\``;
    const content2 = content + `\`TeleportPlayer ${location}\``

    axios.post(
      `${key.chat}`, { content: content }
    );

    axios.post(
      `${key.home}`, { content: content2 }
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

router.get(`/log`, function (req, res, next) {
  try {
    const { charName, eventType, eventId, eventCategory, params } = req.query;

    const content = `\`\`\`Who:${charName}
Event Category:${eventCategory}
Event Type:${eventType}
Event Id: ${eventId}
Params: ${params}\`\`\``;
    const shift = `${params}`
    axios.post(
      `${key.rr}`, { content: content, }
    );
    res.json({
      success: true,
      message: '/log call successfull',
    });
    if (eventType === 'Dice' && eventId === 'RR_ABILITY_USE' && eventCategory === 'Roleplay Redux') {
      processShift(shift);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(`/error`, function ({ query }, res, next) {
  try {
    const { message } = query;
    const errormessage = message

    axios.post(
      `${key.error}`,
      {
        content: errormessage
      });
    res.json({
      success: true,
      message: 'Error message received and logged.',
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

function processShift(shift) {
  const shiftTypes = {
    "Start Lowtown Tavern Shift": "Lowtown Tavern",
    "Start Hightown Tavern Shift": "Hightown Tavern",
    "Start Lowtown Brothel Shift": "Lowtown Brothel",
    "Start Hightown Brothel Shift": "Hightown Brothel"
  };

  for (const [shiftType, location] of Object.entries(shiftTypes)) {
    if (shift.includes(shiftType)) {
      const pipeIndex = shift.indexOf('|');
      const openParenIndex = shift.indexOf('(');
      const nameSubstring = shift.substring(pipeIndex + 1, openParenIndex).trim();
      const content2 = `:exclamation: ${nameSubstring} has started working at the ${location}!`;
      postShift(content2, key.rr);
      break;
    }
  }
}
function postShift(content, key) {
  try {
    axios.post(
      key, { content }
    );
  }
  catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = router;