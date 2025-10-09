window.addEventListener('DOMContentLoaded', displayProducts);

const URL = 'https://68e3ee658e116898997a7a6c.mockapi.io/data';

function displayProducts() {
	fetch(URL)
		.then((response) => {
			if (response.ok === false) {
				throw new Error('Networn error!');
			} else {
				return response.json();
			}
		})
		.then(
			(products) =>
				(document.querySelector('.products-container').innerHTML = products
					.map(
						(product) => `
         <div class="product-card">
				<img
					src=${product.imageURL}
					alt="Product image"
				/>
				<div class="product-info">
					<h3>${product.marca} ${product.model} ${product.an} </h3>
					<div class="price">Pret: ${product.pret} EUR</div>
					<div class="buttons">
						<button class="details-btn">Details</button>
						<button class="cart-btn">Add to Cart</button>
					</div>
				</div>
			</div>   
      `
					)
					.join(''))
		);
}
