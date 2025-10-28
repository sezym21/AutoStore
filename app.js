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
		.then((products) => {
			document.querySelector('.products-container').innerHTML = products
				.map(
					(product) => `
         <div class="product-card">
				<img
					src=${product.imageURL}
					alt="Product image"
				/>
				<div class="product-info">
					<h3>${product.marca} ${product.model}</h3>
					<div class="pret">${product.pret} EUR</div>
					<div class="buttons">
						<a href="details.html?id=${product.id}" class="details-btn">Details</a>
						<button data-id=${product.id} class="cart-btn">Add to Cart</button>
					</div>
				</div>
			</div>   
      `
				)
				.join('');
			const addToCartButtons = document.querySelectorAll('.cart-btn');
			addToCartButtons.forEach((button) => {
				button.addEventListener('click', (e) => {
					const productId = e.target.dataset.id;
					const product = products.filter(
						(product) => product.id === productId
					)[0];
					console.log(product);

					let cart = JSON.parse(localStorage.getItem('cart')) || {};

					if (cart[productId]) {
						cart[productId].quantity++;
					} else {
						cart[productId] = {
							quantity: 1,
							pret: product.pret,
							image: product.imageURL,
							marca: product.marca,
						};
					}

					localStorage.setItem('cart', JSON.stringify(cart));
				});
			});
		});
}