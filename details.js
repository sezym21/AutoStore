const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

const URL = 'https://68e3ee658e116898997a7a6c.mockapi.io/data';

fetch(`${URL}/${id}`)
	.then((response) => response.json())
	.then((product) => {
		const container = document.querySelector('.details-container');

		container.innerHTML = `
      <div class="product-details-card">
        <img src="${product.imageURL}" alt="${product.marca} ${product.model}" class="details-image" />
        <div class="details-info">
          <h2 class="details-title">${product.marca} ${product.model}</h2>
          <p><strong>An:</strong> ${product.an}</p>
          <p><strong>Combustibil:</strong> ${product.Combustibil}</p>
          <p><strong>Cutie:</strong> ${product.Cutie}</p>
          <p><strong>Km:</strong> ${product.km}</p>
          <p><strong>Culoare:</strong> ${product.Culoare}</p>
          <p><strong>Preț:</strong> <span class="details-price">${product.pret} €</span></p>
          <p class="details-description">${product.detalii}</p>
        </div>
      </div>
    `;
	})
	.catch((error) => {
		console.error('Eroare la aducerea produsului:', error);
		document.querySelector('.details-container').innerHTML =
			'<p>Eroare la încărcarea datelor produsului.</p>';
	});
