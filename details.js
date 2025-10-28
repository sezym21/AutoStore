const productContainer = document.getElementById('product-details');

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    productContainer.innerHTML = `<p>Produsul nu a fost găsit.</p>`;
    return;
  }

  fetch(`https://68e3ee658e116898997a7a6c.mockapi.io/data/${id}`)
    .then(res => res.json())
    .then(product => {
      if (!product) {
        productContainer.innerHTML = `<p>Produsul nu există.</p>`;
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      let quantityInCart = cart[id] ? cart[id].quantity : 1;

      // fallback pentru câmpurile care pot lipsi
      const marca = product.marca || 'N/A';
      const model = product.model || '';
      const pret = product.pret || 0;
      const imageURL = product.imageURL || 'placeholder.jpg';
      const detalii = product.detalii || '';
      const an = product.an || '';
      const combustibil = product.Combustibil || '';
      const cutie = product.Cutie || '';
      const km = product.km || '';
      const culoare = product.Culoare || '';

      productContainer.innerHTML = `
        <img class="details-image" src="${imageURL}" alt="${marca}" />
        <div class="details-info">
          <h2 class="details-title">${marca} ${model}</h2>
          <p class="details-price">${pret} EUR</p>
          <p class="details-description">${detalii}</p>
          <p><strong>An:</strong> ${an}</p>
          <p><strong>Combustibil:</strong> ${combustibil}</p>
          <p><strong>Cutie:</strong> ${cutie}</p>
          <p><strong>KM:</strong> ${km}</p>
          <p><strong>Culoare:</strong> ${culoare}</p>

          <div style="display:flex; align-items:center; gap:10px; margin:10px 0;">
            <button id="decrease" style="padding:6px 10px; border-radius:8px;">-</button>
            <span id="quantity">${quantityInCart}</span>
            <button id="increase" style="padding:6px 10px; border-radius:8px;">+</button>
          </div>

          <button id="buy-btn" class="cart-btn">Cumpără</button>
        </div>
      `;

      const quantitySpan = document.getElementById('quantity');
      let quantity = quantityInCart;

      document.getElementById('increase').addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
      });

      document.getElementById('decrease').addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
        }
      });

      document.getElementById('buy-btn').addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[id]) {
          cart[id].quantity += quantity;
        } else {
          cart[id] = {
            marca: marca,
            pret: pret,
            imageURL: imageURL,
            quantity: quantity
          };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
      });
    })
    .catch(err => {
      console.error(err);
      productContainer.innerHTML = `<p>Eroare la încărcarea produsului.</p>`;
    });
});
