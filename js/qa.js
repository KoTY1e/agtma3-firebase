const scriptURL =
  "https://script.google.com/macros/s/AKfycbzgqEPMKiavIPFF4mibRGRStTFF-XV3WpjM1YtyAadm4E7mPYYdmF6N8RzOvc10kfwzqw/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((Response) => {
      msg.innerHTML = "Done✅";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 2000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

function setupToggle(buttonId, divId) {
  const btn = document.getElementById(buttonId);
  btn.addEventListener("click", () => {
    const div = document.getElementById(divId);
    const isVisible = div.style.display === "block";
    div.style.display = isVisible ? "none" : "block";
    btn.textContent = isVisible ? "⬇" : "⬆";
  });
}

setupToggle("answer1-btn", "answer1");
setupToggle("answer2-btn", "answer2");
setupToggle("answer3-btn", "answer3");
