// Connexion utilisateur
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Connexion réussie !");
    window.location.href = "../index.html";
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect.");
  }
});

