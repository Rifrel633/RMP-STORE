// Enregistrement utilisateur
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.username === username)) {
    alert("Nom d'utilisateur déjà utilisé.");
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Inscription réussie !");
  window.location.href = "../connexion/connexion.html";
});
