// Données panier / produits
const cart = JSON.parse(localStorage.getItem("rmpstore_cart") || "[]");
const products = JSON.parse(localStorage.getItem("rmpstore_products") || "[]");
const user = localStorage.getItem("connectedUser") || "Visiteur";

// Calcul total et vendeur
let total = 0;
let vendeur = null;
let subaccount_id = null;

cart.forEach(item => {
  const product = products.find(p => p.name === item.name);
  if (product) {
    total += product.price * item.quantity;
    if (!vendeur && product.subaccount_id) {
      vendeur = product.owner;
      subaccount_id = product.subaccount_id;
    }
  }
});

// Affichage résumé
document.addEventListener("DOMContentLoaded", () => {
  const resume = document.getElementById("summary");
  if (resume) {
    if (cart.length === 0) {
      resume.innerHTML = "<p>Votre panier est vide.</p>";
      document.querySelector("button").disabled = true;
    } else {
      resume.innerHTML = `
        Montant total : <strong>${total.toLocaleString("fr-FR")} XAF</strong><br>
        Bénéficiaire vendeur : <strong>${vendeur || "non défini"}</strong>
      `;
    }
  }
});

// Paiement Flutterwave
function makePayment() {
  if (!subaccount_id) {
    alert("Aucun sous-compte vendeur détecté.");
    return;
  }

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxx-X", // <-- À remplacer
    tx_ref: "RMP-" + Date.now(),
    amount: total,
    currency: "XAF",
    payment_options: "card,mobilemoneyfranco",
    customer: {
      email: user + "@rmp.local",
      phone_number: "242061234567", // Optionnel
      name: user
    },
    subaccounts: [
      {
        id: subaccount_id,
        transaction_split_ratio: 90
      }
    ],
    callback: function (response) {
      console.log("Paiement terminé :", response);
      alert("Paiement réussi !");
      enregistrerCommande();
      localStorage.removeItem("rmpstore_cart");
      window.location.href = "confirmation.html";
    },
    onclose: function () {
      alert("Paiement annulé.");
    },
    customizations: {
      title: "RMP STORE",
      description: "Paiement de votre commande",
      logo: "https://votre-site.com/logo.png"
    }
  });
}

// Enregistrer commande après paiement
function enregistrerCommande() {
  const commandes = JSON.parse(localStorage.getItem("rmpstore_orders") || "[]");
  const date = new Date().toISOString();

  cart.forEach(item => {
    commandes.push({
      productName: item.name,
      clientName: user,
      quantity: item.quantity,
      date: date
    });
  });

  localStorage.setItem("rmpstore_orders", JSON.stringify(commandes));
}
