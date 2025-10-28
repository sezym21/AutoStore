window.addEventListener('DOMContentLoaded', renderTable);

const URL = 'https://68e3ee658e116898997a7a6c.mockapi.io/data';

const tableBody = document.querySelector('#products-table tbody');
const addOrEditBtn = document.querySelector('#add-or-edit-btn');
let isEditMode = false;
let productId;

const nameInput = document.getElementById('name'); // folosit pentru marca
const priceInput = document.getElementById('price');
const imageURLInput = document.getElementById('imageURL');
const descriptionInput = document.getElementById('detail');

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products
        .map(
          (product, index) => `
            <tr data-id=${product.id}>
               <td>${index + 1}</td>
               <td class="cell-img">
                  <img src="${product.imageURL}" alt="${product.marca}" />
               </td>
               <td class="cell-name">
                  ${product.marca} ${product.model || ''}
               </td>
               <td class="cell-price">
                  ${product.pret} €
               </td>
               <td>
                  <div class="actions">
                     <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                     <button class="btn delete" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                     </button>
                  </div>
               </td>
            </tr>
          `
        )
        .join('');
    });
}

addOrEditBtn.addEventListener('click', addOrEditNewProduct);

function addOrEditNewProduct(e) {
  e.preventDefault();

  const marca = nameInput.value;
  const pret = priceInput.value;
  const imageURL = imageURLInput.value;
  const detalii = descriptionInput.value;

  const newProduct = {
    marca: marca,
    pret: pret,
    imageURL: imageURL,
    detalii: detalii,
  };

  const method = isEditMode ? 'PUT' : 'POST';
  const newUrl = isEditMode ? `${URL}/${productId}` : URL;

  fetch(newUrl, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  }).then(() => {
    renderTable();
    resetForm();
  });
}

function resetForm() {
  nameInput.value = '';
  priceInput.value = '';
  imageURLInput.value = '';
  descriptionInput.value = '';

  if (isEditMode) {
    isEditMode = false;
    addOrEditBtn.innerHTML = 'Add product';
  }
}

tableBody.addEventListener('click', handleActions);

function handleActions(e) {
  const clickedElement = e.target;

  if (clickedElement.parentElement.classList.contains('edit')) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        nameInput.value = product.marca;
        priceInput.value = product.pret;
        imageURLInput.value = product.imageURL;
        descriptionInput.value = product.detalii;
      });
    isEditMode = true;
    addOrEditBtn.innerHTML = 'Save';
  } else if (clickedElement.parentElement.classList.contains('delete')) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`, {
      method: 'DELETE',
    }).then(() => renderTable());
  }
}

function getTableRow(editIcon) {
  return editIcon.closest('tr');
}
	