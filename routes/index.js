const express = require("express");
const router = express.Router();
const axios = require("axios");

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
