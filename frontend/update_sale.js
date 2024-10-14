document.addEventListener('DOMContentLoaded', function () {
  const updateSaleForm = document.getElementById('update-sale-form');
  const updateSaleError = document.getElementById('update-sale-error');
  const API_ENDPOINT = 'http://127.0.0.1:5000/sales'; // Replace with your API endpoint

  updateSaleForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const saleId = document.getElementById('update-sale_id').value;
    const name = document.getElementById('update-name').value;
    const phone = document.getElementById('update-phone').value;
    const chairs_number = document.getElementById('update-chairs_number').value;
    const tables_number = document.getElementById('update-tables_number').value;
    const other_products = document.getElementById('update-other_products').value;
    const discount = document.getElementById('update-discount').value;
    const total_amount = document.getElementById('update-total_amount').value;
    const installments_number = document.getElementById('update-installments_number').value;
    const address = document.getElementById('update-address').value;
    const notes = document.getElementById('update-notes').value;
    const status = document.getElementById('update-status').value;
    const collected_installment_number = document.getElementById('update-collected_installment_number').value;
    const future_installments_total = document.getElementById('update-future_installments_total').value;

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
      collected_installment_number,
      future_installments_total,
    };

    fetch(`${API_ENDPOINT}/${saleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to view_sales.html after successful update
          window.location.href = 'view_sales.html';
          updateSaleError.textContent = '';
        } else {
          updateSaleError.textContent = 'حدث خطأ أثناء تحديث معلومات البيع.';
        }
      })
      .catch((error) => {
        updateSaleError.textContent = 'حدث خطأ أثناء الاتصال بالخادم.';
      });
  });
});