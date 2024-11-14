const video = document.getElementById("video");
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Função para acessar a webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error("Erro ao acessar a webcam:", error);
    alert(
      "Não foi possível acessar a webcam. Verifique as permissões do navegador."
    );
  }
}

function captureImage() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

captureButton.addEventListener("click", captureImage);
window.addEventListener("load", startWebcam);
