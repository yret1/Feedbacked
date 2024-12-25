//Module open check
let open = false;

let presigned = "";
let preKey = "";
let publicUrlImg = "";

//Values for sending feedback
let nameIn = "";
let desc = "";
let title = "";
let image = "";

let user = "{{userId}}";
let client = "{{clientId}}";

let mouseYPos;
let mouseXPos;

const toggleOpen = () => {
  open = !open;

  const buttonToggle = document.getElementById("openbutton");
  const input = document.querySelectorAll("#inputbox");
  const submitButton = document.getElementById("submitter");

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
  const noImg = document.getElementById("noShot").style;
  const isImg = document.getElementById("isShot").style;

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

const capureTrigger = async () => {
  const noImg = document.getElementById("noShot").style;
  const isImg = document.getElementById("isShot").style;
  const imgbox = document.getElementById("imgSend");

  const submissionbox = document.getElementById("subbox").style;

  submissionbox.display = "none";
  const presignedUrl = await fetchPresignedUrl();
  await captureAndUploadScreenshot(presignedUrl);

  setTimeout(() => {
    noImg.display = "none";
    isImg.display = "flex";
    submissionbox.display = "flex";
    imgbox.src = publicUrlImg;
  }, 300);
};

//Toast

const toastAlert = (result, text) => {
  const toast = document.getElementById("toaster");
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
  const feedbackmodel = {
    userId: user,
    clientId: client,
    feedbackTitle: title,
    feedbackBody: desc,
    ImageUrl: publicUrlImg,
    by: nameIn,
  };

  try {
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
      }),
    });

    const response = feedback.json();

    if (response.ok) {
      console.log("Added feedback");
    } else {
      console.log("oops something went wrong.");
    }
  } catch (error) {}
};

//Track mousePos for placing paths

const mousePos = (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  mouseXPos = posX;
  mouseYPos = posY;
};

//Create drawing functionallity

const initDrawing = () => {
  //Track mousePos for placing paths
  //Add all eventelisteners needed
  //Movement listner document.addEventListener("mousemove", mousePos);
  //OnStart listner document.addEventListener("mousedown", startDraw);
  //OnEnd listner document.addEventListener("mouseup", startDraw);
};

//Render the base UI.
(async function renderUi() {
  const submissionbox = document.createElement("section");
  submissionbox.id = "subbox";
  submissionbox.style.position = "fixed"; // 'fixed' is often better than 'absolute'
  submissionbox.style.width = "300px";
  submissionbox.style.height = "auto";
  submissionbox.style.padding = "12px"; // Added padding
  submissionbox.style.backgroundColor = "white";
  submissionbox.style.bottom = "20px"; // Add some padding from bottom
  submissionbox.style.right = "20px"; // Add some padding from right
  submissionbox.style.borderRadius = "10px"; // Optional: rounded corners
  submissionbox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)"; // Optional: subtle shadow
  submissionbox.style.display = "flex"; // Display as flex
  submissionbox.style.flexDirection = "column"; // Column alignment
  submissionbox.style.justifyContent = "flex-start"; // Top centered
  submissionbox.style.alignItems = "center";
  submissionbox.style.zIndex = "500";
  submissionbox.style.gap = "4px";
  submissionbox.style.fontFamily = "'Poppins', sans-serif";
  submissionbox.style.transition = "all 0.3s ease-in-out";

  //Create toast for sending confirmations to user

  const toast = document.createElement("div");
  toast.id = "toaster";
  const toastS = toast.style;
  toastS.borderRadius = "5px";
  toastS.padding = "6px";
  toastS.fontFamily = "'Poppins', sans-serif";
  toastS.display = "flex";
  toastS.justifyContent = "center";
  toastS.alignItems = "center";
  toastS.position = "fixed";
  toastS.zIndex = "600";
  toastS.right = "10px";
  toastS.top = "10px";

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
  openButton.id = "openbutton";
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
  box.id = "inputbox";
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
  name.id = "nameinput";
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
  boxTitle.id = "inputbox";
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
  boxDesc.id = "inputbox";
  boxDesc.style.width = "100%";
  boxDesc.style.height = "0px";
  boxDesc.style.display = "none";
  boxDesc.style.flexDirection = "column";
  boxDesc.style.justifyContent = "flex-start";
  boxDesc.style.gap = "3px";
  boxDesc.style.alignItems = "flex-start";
  boxDesc.style.fontFamily = "'Poppins', sans-serif";

  const descLabel = document.createElement("label");
  descLabel.innerHTML = "Describe it.";
  descLabel.style.color = "black";
  boxDesc.appendChild(descLabel);

  const descArea = document.createElement("textarea");
  descArea.style.width = "100%";
  descArea.style.padding = "4px";
  descArea.style.borderRadius = "5px";
  descArea.style.border = "1px solid black";
  descArea.style.fontSize = "16px";

  descArea.addEventListener("input", setDesc);
  boxDesc.appendChild(descArea);

  //Screenshot

  const boxShot = document.createElement("div");
  boxShot.id = "inputbox";
  boxShot.style.width = "100%";
  boxShot.style.height = "0px";
  boxShot.style.display = "none";
  boxShot.style.flexDirection = "column";
  boxShot.style.justifyContent = "flex-start";
  boxShot.style.gap = "3px";
  boxShot.style.alignItems = "flex-start";
  boxShot.style.fontFamily = "'Poppins', sans-serif";

  const shotLabel = document.createElement("label");
  shotLabel.innerHTML = "Screenshot";
  shotLabel.style.color = "black";
  boxShot.appendChild(shotLabel);

  const shotBox = document.createElement("div");
  shotBox.id = "screenshot";
  shotBox.style.width = "100%";
  shotBox.style.display = "flex";
  shotBox.style.justifyContent = "center";
  shotBox.style.alignContent = "center";

  //Screenshot not taken

  const noScreen = document.createElement("button");
  noScreen.id = "noShot";

  noScreen.innerHTML = "No sceenshot taken. Take one!";
  noScreen.style.display = "flex";
  noScreen.style.justifyContent = "flex-start";
  noScreen.style.flexDirection = "column";
  noScreen.style.padding = "6px";
  noScreen.style.cursor = "pointer";
  noScreen.style.fontFamily = "'Poppins', sans-serif";
  noScreen.style.fontWeight = "600";
  noScreen.style.borderRadius = "6px";
  noScreen.style.backgroundColor = "transparent";
  noScreen.style.flexDirection = "column";
  noScreen.style.flexDirection = "column";
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
  isScreen.id = "isShot";

  const screenStyle = isScreen.style;
  screenStyle.display = "none";
  screenStyle.position = "relative";
  screenStyle.width = "100%";
  screenStyle.aspectRatio = "16/9";
  screenStyle.borderRadius = "5px";
  screenStyle.border = "1px solid black";
  screenStyle.overflow = "hidden";

  const remImg = document.createElement("button");
  remImg.id = "delBtn";
  remImg.innerHTML = "X";
  const remStyle = remImg.style;
  remStyle.position = "absolute";
  remStyle.top = "0";
  remStyle.right = "0";
  remStyle.backgroundColor = "red";
  remStyle.color = "white";
  remStyle.display = "flex";
  remStyle.justifyContent = "center";
  remStyle.alignItems = "center";
  remStyle.padding = "5px";
  remStyle.border = "none";
  remStyle.borderRadius = "2px";
  remStyle.cursor = "pointer";

  remImg.addEventListener("click", clearScreenshot);
  isScreen.appendChild(remImg);
  const image = document.createElement("img");

  image.id = "imgSend";
  image.style.display = "block";
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "cover";

  isScreen.appendChild(image);
  boxShot.appendChild(shotBox);
  shotBox.appendChild(isScreen);

  //Draw tool

  //Submit button

  const button = document.createElement("button");

  button.id = "submitter";

  button.style.width = "100%";
  button.style.padding = "6px";
  button.style.border = "none";
  button.style.display = "none";
  button.style.color = "white";
  button.style.fontSize = "20px";
  button.style.borderRadius = "6px";
  button.style.backgroundColor = "blue";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.innerHTML = "Send Feedback";

  button.addEventListener("click", sendFeedbackToClient);

  const cloudScript = document.createElement("script");
  cloudScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.13.1/cloudinary-core.js";

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

  initDrawing();
})();

//Errors?
