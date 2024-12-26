//Module open check
let open = false;

let presigned = "";
let preKey = "";
let publicUrlImg = "";
let large = false;
let sending = false;

// Override console methods
const originalError = console.error;
const originalWarn = console.warn;
const consoleErrors = [];
const consoleWarnings = [];

console.error = function (...args) {
  errors.push(args.join(" "));
  originalError.apply(console, args);
};

console.warn = function (...args) {
  warnings.push(args.join(" "));
  originalWarn.apply(console, args);

  alert(consoleWarnings);
};

//Drawing functionality
let isDrawing = false;
let drawingActive = false;
let currentPath = "";
let currentPathElement = null;
let paths = [];
let color = "#FF0000";

//Values for sending feedback
let nameIn = "";
let desc = "";
let title = "";
let image = "";

let user = "{{userId}}";
let client = "{{clientId}}";

let mouseYPos;
let mouseXPos;

const checkScreenSize = () => {
  if (window.innerWidth > 1023) {
    return true;
  }

  return false;
};

const toggleOpen = () => {
  open = !open;

  const buttonToggle = document.getElementById("fbopenbutton");
  const input = document.querySelectorAll("#fbinputbox");
  const submitButton = document.getElementById("fbsubmitter");

  if (open) {
    buttonToggle.style.rotate = "180deg";
    input.forEach((inpu) => {
      inpu.style.display = "flex";
      inpu.style.height = "auto";
    });
    submitButton.style.display = "flex";
  } else {
    buttonToggle.style.rotate = "0deg";
    input.forEach((inpu) => {
      inpu.style.display = "none";
      inpu.style.height = "0px";
    });
    submitButton.style.display = "none";
  }
};

//Data handlers
const setName = (e) => {
  nameIn = e.currentTarget.value;

  console.log("Name", e.currentTarget.value);
};

const setDesc = (e) => {
  desc = e.target.value;
  console.log("Desc", e.currentTarget.value);
};

const addTitle = (e) => {
  title = e.target.value;
  console.log("Title", e.currentTarget.value);
};
async function uploadImageToS3(file, presignedUrl) {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type, // Ensure the Content-Type matches the presigned URL
      },
    });
    if (response.ok) {
      toastAlert(true, "Image captured");
    } else {
      console.error("Upload failed:", response.statusText);
      toastAlert(true, "Image not sent");
    }
  } catch (err) {
    console.error("Error during upload:", err);
  }
}

//Delete captured Screenshot

async function clearScreenshot() {
  const noImg = document.getElementById("fbnoShot").style;
  const isImg = document.getElementById("fbisShot").style;

  noImg.display = "flex";
  isImg.display = "none";
  presigned = "";
  image = "";
  publicUrlImg = "";
}

// Example: Capturing and uploading a screenshot
async function captureAndUploadScreenshot(presignedUrl) {
  const element = document.body;

  const canvas = await html2canvas(element, {
    useCORS: true,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
    x: window.scrollX,
    y: window.scrollY,
  });

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  await uploadImageToS3(blob, presignedUrl);
}

// Fetch the presigned URL from your server
async function fetchPresignedUrl() {
  try {
    const response = await fetch(
      "http://localhost:3002/generate-presigned-url"
    );
    const { url, publicUrl } = await response.json();
    publicUrlImg = publicUrl;
    return url;
  } catch (err) {
    console.error("Error fetching presigned URL:", err);
    throw err;
  }
}

const resetInputs = () => {
  const name = document.getElementById("fbnameinput");
  const title = document.getElementById("fbtitleinput");
  const desc = document.getElementById("fbdescript");

  name.value = "";
  title.value = "";
  desc.value = "";
};

const capureTrigger = async () => {
  const noImg = document.getElementById("fbnoShot").style;
  const isImg = document.getElementById("fbisShot").style;
  const imgbox = document.getElementById("fbimgSend");
  const controls = document.getElementById("fbcontrolbox").style;

  const submissionbox = document.getElementById("fbsubbox").style;

  submissionbox.display = "none";
  controls.display = "none";
  const presignedUrl = await fetchPresignedUrl();
  await captureAndUploadScreenshot(presignedUrl);

  setTimeout(() => {
    noImg.display = "none";
    isImg.display = "flex";
    submissionbox.display = "flex";
    controls.display = "flex";
    imgbox.src = publicUrlImg;
  }, 300);
};

//Toast

const toastAlert = (result, text) => {
  const toast = document.getElementById("fbtoaster");
  const style = toast.style;

  toast.innerHTML = text;
  switch (result) {
    case true:
      style.display = "flex";
      style.color = "white";
      style.backgroundColor = "green";
      style.animation = "";

      break;
    default:
      style.color = "white";
      style.display = "flex";
      style.backgroundColor = "red";
  }

  setTimeout(() => {
    style.display = "none";
  }, 1500);
};

//Send feedback
const sendFeedbackToClient = async () => {
  const subButton = document.getElementById("fbsubmitter");

  if (nameIn == "" || desc == "" || title == "") {
    toastAlert(false, "Please enter all fields before sending!");
    return;
  }
  try {
    sending = true;
    subButton.disabled = true;
    subButton.innerHTML = "Sending...";

    const userAgent = navigator.userAgent;

    // Extract Browser
    const browserMatch = userAgent.match(
      /(Chrome|Safari|Firefox|Edge|Opera)\/(\d+\.\d+\.\d+\.\d+)/
    );
    const browser = browserMatch ? browserMatch[1] : "Unknown Browser";

    // Extract Device and OS
    const deviceMatch = userAgent.match(/\((.*?)\)/);
    const device = deviceMatch ? deviceMatch[1] : "Unknown Device";

    const sendFeedback = await fetch("http://localhost:3000/newfeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user,
        clientId: client,
        feedbackTitle: title,
        feedbackBody: desc,
        ImageUrl: publicUrlImg,
        by: nameIn,
        errors: consoleErrors,
        warnings: consoleWarnings,
        device: {
          browser: browser,
          device: device,
        },
      }),
    });

    setTimeout(() => {
      toastAlert(true, "Feedback sent!");
      nameIn = "";
      desc = "";
      title = "";
      image = "";

      resetInputs();
      sending = false;
      subButton.disabled = false;
      subButton.innerHTML = "Send feedback";
    }, 100);
  } catch (error) {
    toastAlert(false, "Something went wrong!");
    sending = false;
    subButton.disabled = false;
  }
};

//Track mousePos for placing paths

const mousePos = (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  mouseXPos = posX;
  mouseYPos = posY;
};

const toggleDrawingActive = () => {
  // Check current cursor state and toggle between pen and default
  const button = document.getElementById("fbdrawing");
  const currentCursor = document.body.style.cursor;
  const drawingField = document.querySelector(".fbdrawing-overlay");

  if (
    currentCursor ===
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M13.9713 8.02792C14.5398 7.45944 15.4615 7.45944 16.0299 8.02792C16.5984 8.59639 16.5984 9.51807 16.0299 10.0865L12.0091 14.1074C11.4978 14.6187 11.2421 14.8744 10.9507 15.0773C10.692 15.2575 10.413 15.4064 10.1194 15.521C9.78861 15.6501 9.43388 15.7203 8.72443 15.8605L7.9668 16.0102L8.15783 15.1976C8.31291 14.5379 8.39045 14.2081 8.51946 13.9006C8.634 13.6276 8.77848 13.3682 8.95026 13.1271C9.14376 12.8555 9.38334 12.6159 9.8625 12.1367L13.9713 8.02792Z' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E\") 0 24, auto"
  ) {
    document.body.style.cursor = "default";
    button.style.border = "2px solid black";
    button.style.backgroundColor = "white";
    drawingField.classList.remove("active");
    isDrawing = false;
  } else {
    // Set custom pen cursor using the same SVG that's used in the pen button
    document.body.style.cursor =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M13.9713 8.02792C14.5398 7.45944 15.4615 7.45944 16.0299 8.02792C16.5984 8.59639 16.5984 9.51807 16.0299 10.0865L12.0091 14.1074C11.4978 14.6187 11.2421 14.8744 10.9507 15.0773C10.692 15.2575 10.413 15.4064 10.1194 15.521C9.78861 15.6501 9.43388 15.7203 8.72443 15.8605L7.9668 16.0102L8.15783 15.1976C8.31291 14.5379 8.39045 14.2081 8.51946 13.9006C8.634 13.6276 8.77848 13.3682 8.95026 13.1271C9.14376 12.8555 9.38334 12.6159 9.8625 12.1367L13.9713 8.02792Z' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E\") 0 24, auto";
    isDrawing = true;

    drawingField.classList.add("active");
    button.style.border = "2px solid blue";
    button.style.backgroundColor = "#BFDBFE";
  }
};

//Create drawing functionallity

const startDraw = (event) => {
  if (!isDrawing) return;

  const svg = event.target.closest("svg");
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  currentPath = `M ${x} ${y}`;
  currentPathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  currentPathElement.setAttribute("stroke", color);
  currentPathElement.setAttribute("stroke-width", "2");
  currentPathElement.setAttribute("fill", "none");
  currentPathElement.setAttribute("d", currentPath);

  svg.appendChild(currentPathElement);
  paths.push(currentPathElement);
};

const draw = (event) => {
  if (!isDrawing || !currentPathElement) return;

  const svg = event.target.closest("svg");
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  currentPath += ` L ${x} ${y}`;
  currentPathElement.setAttribute("d", currentPath);
};

const stopDraw = () => {
  currentPathElement = null;
};

const changeColor = (e) => {
  const colorDisp = document.getElementById("fbcolorDisp");
  color = e.target.value;
  colorDisp.style.backgroundColor = color;
};

const initDrawing = () => {
  //Track mousePos for placing paths

  const container = document.createElement("div");
  container.className = "fbdrawing-overlay";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.addEventListener("mousedown", startDraw);
  svg.addEventListener("mousemove", draw);
  svg.addEventListener("mouseup", stopDraw);
  svg.addEventListener("mouseleave", stopDraw);

  container.appendChild(svg);
  document.body.appendChild(container);

  large = checkScreenSize();

  if (large) {
    const controls = document.createElement("div");
    controls.id = "fbcontrolbox";
    const contStyle = controls.style;

    //Controller base styles
    contStyle.position = "fixed";
    contStyle.zIndex = 1001;
    contStyle.padding = "12px";
    contStyle.borderRadius = "10px";
    contStyle.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
    contStyle.left = "50%";
    contStyle.transform = "translate()";
    contStyle.bottom = "20px";
    contStyle.backgroundColor = "white";
    contStyle.display = "flex";
    contStyle.gap = "4px";
    contStyle.justifyContent = "center";
    contStyle.alignItems = "center";
    contStyle.height = "auto";

    /* Control Buttons */
    //Drawing Toggle
    const pen = document.createElement("button");
    pen.id = "fbdrawing";
    pen.innerHTML =
      '<svg viewBox="0 0 24 24" style="width: 25px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.9713 8.02792C14.5398 7.45944 15.4615 7.45944 16.0299 8.02792C16.5984 8.59639 16.5984 9.51807 16.0299 10.0865L12.0091 14.1074C11.4978 14.6187 11.2421 14.8744 10.9507 15.0773C10.692 15.2575 10.413 15.4064 10.1194 15.521C9.78861 15.6501 9.43388 15.7203 8.72443 15.8605L7.9668 16.0102L8.15783 15.1976C8.31291 14.5379 8.39045 14.2081 8.51946 13.9006C8.634 13.6276 8.77848 13.3682 8.95026 13.1271C9.14376 12.8555 9.38334 12.6159 9.8625 12.1367L13.9713 8.02792Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    const penStyle = pen.style;
    penStyle.height = "100%";
    penStyle.display = "flex";
    penStyle.justifyContent = "center";
    penStyle.alignItems = "center";
    penStyle.padding = "2px";
    penStyle.cursor = "pointer";
    penStyle.backgroundColor = "white";
    penStyle.borderRadius = "4px";

    pen.addEventListener("click", toggleDrawingActive);

    controls.appendChild(pen);

    //Undo Draw
    const undo = document.createElement("button");
    undo.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" style="width: 25px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8H16.5C18.9853 8 21 10.0147 21 12.5C21 14.9853 18.9853 17 16.5 17H3M3 8L6 5M3 8L6 11" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    const undoStyle = undo.style;
    undoStyle.height = "100%";
    undoStyle.display = "flex";
    undoStyle.justifyContent = "center";
    undoStyle.alignItems = "center";
    undoStyle.padding = "2px";
    undoStyle.cursor = "pointer";
    undoStyle.backgroundColor = "white";
    undoStyle.borderRadius = "4px";

    undo.addEventListener("click", () => {
      if (paths.length > 0) {
        const lastPath = paths.pop();
        lastPath.remove();
      }
    });

    controls.appendChild(undo);
    //Clear drawing
    const del = document.createElement("button");
    del.addEventListener("click", () => {
      const svg = document.querySelector(".fbdrawing-overlay svg");
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      paths = [];
    });
    del.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" style="width: 25px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    const delStyle = del.style;
    delStyle.height = "100%";
    delStyle.display = "flex";
    delStyle.justifyContent = "center";
    delStyle.alignItems = "center";
    delStyle.padding = "2px";
    delStyle.cursor = "pointer";
    delStyle.backgroundColor = "white";
    delStyle.borderRadius = "4px";
    controls.appendChild(del);

    const splitter = document.createElement("div");
    splitter.id = "fblineD";

    controls.appendChild(splitter);

    const colorWrap = document.createElement("label");
    colorWrap.id = "fbcolorWrap";

    const colorBall = document.createElement("div");
    colorBall.style.backgroundColor = color;
    colorBall.id = "fbcolorDisp";

    const colorButton = document.createElement("input");
    colorButton.id = "colorSelect";
    colorButton.type = "color";
    colorButton.value = color;
    colorButton.addEventListener("change", changeColor);

    colorBall.appendChild(colorButton);
    colorWrap.appendChild(colorBall);

    controls.appendChild(colorWrap);
    //Append to html
    document.body.appendChild(controls);
  } else {
    return;
  }
};

//Render the base UI.
(async function renderUi() {
  const submissionbox = document.createElement("section");
  submissionbox.id = "fbsubbox";

  //Create toast for sending confirmations to user

  const toast = document.createElement("div");
  toast.id = "fbtoaster";

  //Create header field
  const header = document.createElement("div");
  header.style.width = "100%";
  header.style.display = "flex"; // Display as flex
  header.style.justifyContent = "space-between"; // Top centered
  header.style.alignItems = "center";
  header.style.color = "black";
  header.style.fontFamily = "'Poppins', sans-serif";
  header.innerHTML = "Submit feedback!";

  //Button for opening and closing menu
  const openButton = document.createElement("button");
  openButton.id = "fbopenbutton";
  openButton.style.backgroundColor = "transparent";
  openButton.style.border = "none";
  openButton.style.width = "25px";
  openButton.style.display = "flex";
  openButton.style.rotate = open ? "180deg" : "0deg";
  openButton.style.justifyContent = "center";
  openButton.style.alignItems = "center";
  openButton.style.transition = "all 0.3s ease-in-out";
  openButton.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F"></path> </g></svg>';

  //Add eventlistner to toggle open
  openButton.addEventListener("click", toggleOpen);

  //Append button
  header.appendChild(openButton);

  //Create box for input name
  const box = document.createElement("div");
  box.id = "fbinputbox";
  box.style.width = "100%";
  box.style.height = "0px";
  box.style.display = "none";
  box.style.flexDirection = "column";
  box.style.justifyContent = "flex-start";
  box.style.gap = "3px";
  box.style.alignItems = "flex-start";
  box.style.fontFamily = "'Poppins', sans-serif";

  const nameLabel = document.createElement("label");
  nameLabel.for = "nameinput";
  nameLabel.innerHTML = "Name";
  nameLabel.style.color = "black";
  box.appendChild(nameLabel);
  const name = document.createElement("input");
  name.id = "fbnameinput";
  name.placeholder = "Enter your name";
  name.style.width = "100%";
  name.style.padding = "4px";
  name.style.borderRadius = "5px";
  name.style.border = "1px solid black";
  name.style.fontSize = "16px";
  name.value = nameIn;
  name.addEventListener("input", setName);
  box.appendChild(name);

  //Create box for input name
  const boxTitle = document.createElement("div");
  boxTitle.id = "fbinputbox";
  boxTitle.style.width = "100%";
  boxTitle.style.height = "0px";
  boxTitle.style.display = "none";
  boxTitle.style.flexDirection = "column";
  boxTitle.style.justifyContent = "flex-start";
  boxTitle.style.gap = "3px";
  boxTitle.style.alignItems = "flex-start";
  boxTitle.style.fontFamily = "'Poppins', sans-serif";

  const titleLabel = document.createElement("label");
  titleLabel.innerHTML = "Title";
  titleLabel.style.color = "black";
  boxTitle.appendChild(titleLabel);
  const title = document.createElement("input");
  title.id = "fbtitleinput";
  title.placeholder = "What is the issue?";
  title.style.width = "100%";
  title.style.padding = "4px";
  title.style.borderRadius = "5px";
  title.style.border = "1px solid black";
  title.style.fontSize = "16px";
  title.addEventListener("input", addTitle);
  boxTitle.appendChild(title);

  //Description textarea
  const boxDesc = document.createElement("div");
  boxDesc.id = "fbinputbox";

  const descLabel = document.createElement("label");
  descLabel.innerHTML = "Describe it.";
  descLabel.style.color = "black";
  boxDesc.appendChild(descLabel);

  const descArea = document.createElement("textarea");
  descArea.id = "fbdescript";
  descArea.addEventListener("input", setDesc);
  boxDesc.appendChild(descArea);

  //Screenshot

  const boxShot = document.createElement("div");
  boxShot.id = "fbinputbox";

  const shotLabel = document.createElement("label");
  shotLabel.innerHTML = "Screenshot";
  shotLabel.style.color = "black";
  boxShot.appendChild(shotLabel);

  const shotBox = document.createElement("div");

  //Screenshot not taken

  const noScreen = document.createElement("button");
  noScreen.id = "fbnoShot";
  noScreen.innerHTML = "No sceenshot taken. Take one!";
  noScreen.addEventListener("click", capureTrigger);
  shotBox.appendChild(noScreen);
  //Screenshot taken

  const html2canScript = document.createElement("script");

  html2canScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

  const awsScript = document.createElement("script");

  awsScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1692.0/aws-sdk.min.js";

  const isScreen = document.createElement("div");
  isScreen.id = "fbisShot";

  const remImg = document.createElement("button");
  remImg.id = "fbdelBtn";
  remImg.innerHTML = "X";

  remImg.addEventListener("click", clearScreenshot);
  isScreen.appendChild(remImg);

  const image = document.createElement("img");
  image.id = "fbimgSend";

  isScreen.appendChild(image);
  boxShot.appendChild(shotBox);
  shotBox.appendChild(isScreen);

  const styles = document.createElement("style");
  styles.textContent = `

    #colorSelect{

   height: 33px;
    width: auto;
    aspect-ratio: 1/1;
    border: 2px solid black;
    opacity: 0;
    position: absolute;
    }


    #fbcolorWrap{
    position: relative;
    height: 33px;
    width: auto;
    aspect-ratio: 1/1;
    border-radius: 5px;
    border: 2px solid black;

    display: flex;
    justify-content:center;
    align-items:center;
    }


    #fbcolorDisp{

    width: 20px;
    height: 20px;
    border-radius: 20%;
    border: 2px solid black;
    }


    #fblineD{
    height: 33px;
    width: 2px;
    background-color: black;
    }

   .fbdrawing-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1000;
    }
    .fbdrawing-overlay.active {
      pointer-events: all !important;
    }

    #fbsubbox{
    position: fixed;
    width: 300px;
    height: auto;
    padding: 12px;
    background-color: white;
    bottom: 20px;
    right: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 500;
    gap: 4px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease-in-out;

  }


  #fbtoaster{
 border-radius: 5px;
 padding: 6px;
 font-family: 'Poppins', sans-serif;
 display: flex;
 justify-content: center;
 align-items: center;
 position: fixed;
 z-index: 600;
 right: 10px;
 top:10px;
}


  #fbdescript{
    width: 100%;
    padding: 4px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 16px;
  }

    #fbinputbox{
    width: 100%;
    height: 0px;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    gap: 3px;
    align-items: flex-start;
    font-family: 'Poppins', sans-serif;
  }

  #fbscreenshot{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #fbnoShot{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 6px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    border-radius: 6px;
    background-color: transparent;
    flex-direction: column;
  }

  #fbisShot{
    display: none;
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 5px;
    border: 1px solid black;
    overflow: hidden;
  }
  #fbdelBtn{
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }

  #fbimgSend{
    display:block;
    width:100%;
    height:100%;
    object-fit: cover;
  }




  #fbsubmitter{
    width: 100%;
    padding : 6px;
    border:none;
    color:white;
    font-size:20px;
    border-radius: 6px;
    display:none;
    justify-content:center;
    align-items:center;
    background-color: blue;
  }`;

  //Draw tool

  //Submit button

  const button = document.createElement("button");
  button.id = "fbsubmitter";
  button.innerHTML = "Send Feedback";
  button.addEventListener("click", sendFeedbackToClient);

  const cloudScript = document.createElement("script");
  cloudScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.13.1/cloudinary-core.js";

  document.head.appendChild(styles);
  document.body.appendChild(html2canScript);
  document.body.appendChild(cloudScript);
  document.body.appendChild(awsScript);

  //Append elements
  submissionbox.appendChild(header);
  document.body.appendChild(submissionbox);
  submissionbox.appendChild(toast);

  //Input name
  submissionbox.appendChild(box);
  submissionbox.appendChild(boxTitle);
  submissionbox.appendChild(boxDesc);
  submissionbox.appendChild(boxShot);
  submissionbox.appendChild(button);

  window.addEventListener("resize", checkScreenSize);
  initDrawing();
})();

//Errors?
