const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");

let img = new Image();
let imgX = 0;
let imgY = 0;

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, imgX, imgY, img.width, img.height);
}

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    img.src = e.target.result;
    img.onload = () => {
      imgX = canvas.width / 2 - img.width / 2;
      imgY = canvas.height / 2 - img.height / 2;
      drawImage();
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

document.addEventListener("keydown", (event) => {
  const step = 10;

  switch (event.key) {
    case "ArrowUp":
      if (imgY > 0) imgY -= step;
      break;
    case "ArrowDown":
      if (imgY + img.height < canvas.height) imgY += step;
      break;
    case "ArrowLeft":
      if (imgX > 0) imgX -= step;
      break;
    case "ArrowRight":
      if (imgX + img.width < canvas.width) imgX += step;
      break;
  }

  drawImage();
});
