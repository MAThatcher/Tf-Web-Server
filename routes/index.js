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
${message}${location}\`\`\``;

  axios.post(
    `${key.chat}`,
    {
      content: content,
    }
  );
  const content2 = content + `_${location}`
  axios.post(
    `${key.home}`,
    {
      content: content2,
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
  // if (`${params}`.includes("Auto: HoF")) {
  //   const test = "<@178606380947603456> someone has been bad and murdered";
  //   axios.post(
  //     `${key.rr}`,
  //     {
  //       content:test,
  //     }
  //   );
  // } 

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

router.get(`/error`, function (req, res, next) {
  const { message } = req.query;

  const content = message

  axios.post(
    `${key.error}`,
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
