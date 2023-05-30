const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const key=require('./key');

router.get(`/message`, function (req, res, next) {
  const { message, sender, character, location, radius } = req.query;
  //`\`TeleportPlayer ${location}\`
  const content = `\`\`\`${sender}${sender !== character ? " (" + character + ")" : ""} ${radius}s:
${message}\`\`\``;

  axios.post(
    `${key.chat}`,
    {
      content: content,
    }
  );
  const currentDate = new Date();
  const currentTime = currentDate.toTimeString().split(' ')[0]; // Get the time portion of the timestamp
  const logFileName = `Logger_${currentDate.toISOString().split('T')[0]}.txt`;
  const logFilePath = `logs/${logFileName}`; // Path to the log file
  const logEntry = `${currentTime} - ${sender}${sender !== character ? " (" + character + ")" : ""} ${radius}s:
  ${message}\n\n`; // Append a new line to the data
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  // Write the data to the log file (appending if the file exists, creating if it doesn't)
  fs.appendFile(logFilePath, logEntry, (err) => { 
    if (err) {
    console.error(`Error writing to log file: ${err}`);
  } else {
    console.log(`Data appended to log file: ${logFileName}`);
  }});

  res.json({
    ManifestFileVersion: "000000000000",
    bIsFileData: false,
    AppID: "000000000000",
    AppNameString: "",
    BuildVersionString: "",
    LaunchExeString: "",
    LaunchCommand: "",
    PrereqIds: [],
    PrereqName: "",
    PrereqPath: "",
    PrereqArgs: "",
    FileManifestList: [],
    ChunkHashList: {},
    ChunkShaList: {},
    DataGroupList: {},
    ChunkFilesizeList: {},
    CustomFields: {},
  });
});


router.get(`/log`, function (req, res, next) {
  const { charName, eventType, eventId, eventCategory, params } = req.query;

  const content = `\`\`\`Who:${charName}
Log: ${eventType}
Event Category:${eventCategory}
Event Type:${eventType}
Event Id: ${eventId}
Params: ${params}\`\`\``;

  axios.post(
    `${key.rr}`,
    {
      content: content,
    }
  );

  res.json({
    ManifestFileVersion: "000000000000",
    bIsFileData: false,
    AppID: "000000000000",
    AppNameString: "",
    BuildVersionString: "",
    LaunchExeString: "",
    LaunchCommand: "",
    PrereqIds: [],
    PrereqName: "",
    PrereqPath: "",
    PrereqArgs: "",
    FileManifestList: [],
    ChunkHashList: {},
    ChunkShaList: {},
    DataGroupList: {},
    ChunkFilesizeList: {},
    CustomFields: {},
  });
});

module.exports = router;
