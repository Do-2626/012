document.addEventListener('DOMContentLoaded', function () {
  const deleteSaleForm = document.getElementById('delete-sale-form');
  const deleteSaleError = document.getElementById('delete-sale-error');
  const API_ENDPOINT = 'http://127.0.0.1:5000/sales'; // Replace with your API endpoint

  deleteSaleForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const saleId = document.getElementById('delete-sale_id').value;

    if (confirm("هل أنت متأكد من حذف هذا البيع؟")) {
      fetch(`${API_ENDPOINT}/${saleId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to view_sales.html after successful deletion
            window.location.href = 'view_sales.html';
            deleteSaleError.textContent = '';
          } else {
            deleteSaleError.textContent = 'حدث خطأ أثناء حذف البيع.';
          }
        })
        .catch((error) => {
          deleteSaleError.textContent = 'حدث خطأ أثناء الاتصال بالخادم.';
        });
    }
  });
});