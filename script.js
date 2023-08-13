const htmlCodeInput = document.querySelector("#html-code");
const cssCodeInput = document.querySelector("#css-code");
const jsCodeInput = document.querySelector("#js-code");
const runButton = document.querySelector("#run-button");
const previewContent = document.querySelector("#preview-content");

runButton.addEventListener("click", function () {
  const htmlCode = htmlCodeInput.value.trim();
  const cssCode = cssCodeInput.value.trim();
  const jsCode = jsCodeInput.value.trim();

  if (!htmlCode && !cssCode && !jsCode) {
    // Display error message
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Enter the HTML, CSS, and JavaScript code';
    document.body.appendChild(errorMessage);

    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 3000); // Remove error message after 3 seconds
    return;
  }

  previewContent.innerHTML = "";

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  const blurBackground = document.createElement("div");
  blurBackground.classList.add("blur-background");
  blurBackground.appendChild(spinner);
  document.body.appendChild(blurBackground);

  setTimeout(() => {
    document.body.removeChild(blurBackground);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, "text/html");

    const style = document.createElement("style");
    style.textContent = cssCode; // Use textContent instead of innerHTML for security
    doc.head.appendChild(style);

    const script = document.createElement("script");
    script.textContent = jsCode; // Use textContent instead of innerHTML for security
    doc.body.appendChild(script);

    const clonedBody = doc.body.cloneNode(true);
    previewContent.appendChild(clonedBody);
  }, 10000); // 10000 milliseconds = 10 seconds
});
