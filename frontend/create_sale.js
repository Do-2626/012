document.addEventListener('DOMContentLoaded', function () {
  const addSaleForm = document.getElementById('add-sale-form');
  const addSaleError = document.getElementById('add-sale-error');
  const API_ENDPOINT = 'http://127.0.0.1:5000/sales'; // Replace with your API endpoint

  addSaleForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const chairs_number = document.getElementById('chairs_number').value;
    const tables_number = document.getElementById('tables_number').value;
    const other_products = document.getElementById('other_products').value;
    const discount = document.getElementById('discount').value;
    const total_amount = document.getElementById('total_amount').value;
    const installments_number = document.getElementById('installments_number').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    const status = document.getElementById('status').value;

    const saleData = {
      name,
      phone,
      chairs_number,
      tables_number,
      other_products,
      discount,
      total_amount,
      installments_number,
      address,
      notes,
      status,
    };

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to view_sales.html after successful creation
          window.location.href = 'view_sales.html'; 
          addSaleError.textContent = '';
        } else {
          addSaleError.textContent = 'حدث خطأ أثناء إضافة البيع.';
        }
      })
      .catch((error) => {
        addSaleError.textContent = 'حدث خطأ أثناء الاتصال بالخادم.';
      });
  });
});