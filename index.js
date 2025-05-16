document.addEventListener("DOMContentLoaded", () => {
  const produits = JSON.parse(localStorage.getItem("produits") || "[]");
  const list = document.getElementById("product-list");
  produits.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${p.image}" alt="">
                      <h4>${p.name}</h4>
                      <p>${parseInt(p.price).toLocaleString()} FCFA</p>`;
    list.appendChild(card);
  });
});
