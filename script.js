document
.getElementById("loginForm")
.addEventListener("submit", function (event) {
    event.preventDefault();
    const student_id = document.getElementById("username").value;
    const password = document.getElementById("pwd").value;

    // You can add your login validation logic here
    // For this example, we're just displaying the input values in an alert
    alert("Student ID: " + student_id + "\nPassword: " + password);
    console.log({student_id, password})
});
function myFunction() {
  var x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
