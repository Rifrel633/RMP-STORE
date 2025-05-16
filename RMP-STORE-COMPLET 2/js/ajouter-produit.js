document.getElementById("addProductForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageInput = document.getElementById("image");
  const reader = new FileReader();
  reader.onload = function () {
    const produits = JSON.parse(localStorage.getItem("produits") || "[]");
    produits.push({ name, price, image: reader.result });
    localStorage.setItem("produits", JSON.stringify(produits));
    alert("Produit ajouté !");
  };
  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  }
});
