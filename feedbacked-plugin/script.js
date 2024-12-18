//Module open check
let open = false;

//Values for sending feedback

let nameIn = "";
let desc = "";
let image = "";

const issuesAdded = [];

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
};

const mouseTracker = (e) => {
  // Normalize the event object to work across different browsers
  e = e || window.event;

  // Get mouse coordinates
  const mouseX = e.clientX || e.pageX;
  const mouseY = e.clientY || e.pageY;

  // You can return the coordinates if needed
  mouseYPos = mouseY;
  mouseXPos = mouseX;
};

const takeScreenShot = () => {
  const screenTaken = document.getElementById("isShot").style;
  const screenNotTaken = document.getElementById("noShot").style;

  screenTaken.display = "flex";
  screenNotTaken.display = "none";
};
const createIssueBox = () => {
  const newIssue = document.createElement("div");

  const style = newIssue.style;

  style.minWidth = "100px";
  style.padding = "6px";
  style.position = "absolute";
  style.backgroundColor = "red";
  style.left = mouseXPos;
  style.top = mouseYPos;

  document.body.appendChild(newIssue);
};

//Toast

const toastAlert = (result) => {
  const toast = document.getElementById("toaster");
  const style = toast.style;
  switch (result) {
    case true:
      toast.innerHTML = "Feedback sent!";
      style.display = "flex";
      style.color = "white";
      style.backgroundColor = "green";
      style.animation = "";

      break;
    default:
      toast.innerHTML = "Oops, Something went wrong";
      style.color = "white";
      style.display = "flex";
      style.backgroundColor = "red";
  }

  setTimeout(() => {
    style.display = "none";
  }, 1500);
};

//Submit feedback
const sendFeedback = () => {
  const feedbackModel = {
    name: nameIn,
    desc: desc,
    image: image,
  };

  console.log("Submitted feedback", feedbackModel);
  toggleOpen();

  const check = feedbackModel.desc !== "" || feedbackModel.name !== "";

  if (check) {
    toastAlert(true);
  } else {
    toastAlert(false);
  }
};

//Render the base UI.
(function renderUi() {
  const submissionbox = document.createElement("section");

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

  //Track mouse
  document.addEventListener("mousemove", mouseTracker);
  document.body.addEventListener("click", createIssueBox);
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
  name.addEventListener("keypress", setName);
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
  title.addEventListener("input", setName);
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

  //Screenshot not taken

  const noScreen = document.createElement("button");
  noScreen.id = "noShot";

  noScreen.innerHTML = "No sceenshot taken. Take one!";
  noScreen.style.display = "flex";
  noScreen.style.justifyContent = "flex-start";
  noScreen.style.flexDirection = "column";
  noScreen.addEventListener("click", takeScreenShot);
  shotBox.appendChild(noScreen);
  //Screenshot taken

  const isScreen = document.createElement("div");
  isScreen.id = "isShot";

  isScreen.style.display = "none";
  isScreen.style.width = "100%";
  isScreen.style.aspectRatio = "video";

  const image = document.createElement("img");

  image.id = "imgSend";
  image.style.display = "block";
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "cover";

  isScreen.appendChild(image);
  boxShot.appendChild(shotBox);
  shotBox.appendChild(isScreen);

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

  button.addEventListener("click", sendFeedback);

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
})();

//Errors?
