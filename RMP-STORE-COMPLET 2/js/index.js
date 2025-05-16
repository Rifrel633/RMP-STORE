// Récupérer le panier depuis localStorage ou créer un tableau vide
function getCart() {
  const cart = localStorage.getItem('rmpstore_cart');
  return cart ? JSON.parse(cart) : [];
}

// Sauvegarder le panier dans localStorage
function saveCart(cart) {
  localStorage.setItem('rmpstore_cart', JSON.stringify(cart));
}

// Met à jour l'affichage du nombre d'articles dans le panier
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = `Panier (${count})`;
  }
}

// Ajouter un produit au panier
function addToCart(productName) {
  let cart = getCart();

  // Chercher si produit existe déjà dans le panier
  const productIndex = cart.findIndex(item => item.name === productName);

  if (productIndex > -1) {
    // Si existe, augmenter la quantité
    cart[productIndex].quantity++;
  } else {
    // Sinon, ajouter un nouveau produit avec quantité 1
    cart.push({ name: productName, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${productName} a été ajouté au panier !`);
}

// Initialisation au chargement de la page
window.addEventListener('load', () => {
  updateCartCount();
});

