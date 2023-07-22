"use strict";

let btn = document.querySelector(".start-button");
let stopBtn = document.querySelector(".stop-button");
let mediaRecorder;

btn.addEventListener("click", async function () {
  try {
    // Get screen and audio stream using getDisplayMedia
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    mediaRecorder = new RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm",
      bitsPerSecond: 128000,
    });

    mediaRecorder.startRecording();
  } catch (err) {
    console.error("Error accessing screen/audio:", err);
  }
});

stopBtn.addEventListener("click", function () {
  mediaRecorder.stopRecording(function () {
    let blob = mediaRecorder.getBlob();
    let url = URL.createObjectURL(blob);

    let video = document.querySelector("video");
    video.src = url;

    let a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  });
});
