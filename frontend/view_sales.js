document.addEventListener('DOMContentLoaded', function () {
  const salesTable = document.getElementById('sales-table');
  const API_ENDPOINT = 'http://127.0.0.1:5000/sales'; // Replace with your API endpoint

  function fetchSales() {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((sales) => {
        salesTable.innerHTML = `
          <table class="sales-table">
            <thead>
              <tr>
                <th>كود البيع</th>
                <th>كود العميل</th>
                <th>التاريخ</th>
                <th>اسم العميل</th>
                <th>رقم الهاتف</th>
                <th>عدد الكراسي</th>
                <th>عدد الترابيزات</th>
                <th>منتجات أخرى</th>
                <th>المقدم</th>
                <th>المبلغ</th>
                <th>عدد الاقساط</th>
                <th>العنوان</th>
                <th>الحالة</th>
                <th>عدد الاقساط المحصلة</th>
                <th>اجمالى الاقساط القادمة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              ${sales.map(sale => `
                <tr>
                  <td>${sale.sale_id}</td>
                  <td>${sale.client_id}</td>
                  <td>${sale.created_at}</td>
                  <td>${sale.name}</td>
                  <td>${sale.phone}</td>
                  <td>${sale.chairs_number}</td>
                  <td>${sale.tables_number}</td>
                  <td>${sale.other_products}</td>
                  <td>${sale.discount}</td>
                  <td>${sale.total_amount}</td>
                  <td>${sale.installments_number}</td>
                  <td>${sale.address}</td>
                  <td>${sale.status}</td>
                  <td>${sale.collected_installment_number}</td>
                  <td>${sale.future_installments_total}</td>
                  <td>
                    <a href="update_sale.html?sale_id=${sale.sale_id}" class="edit-button" data-sale-id="${sale.sale_id}">
                      تعديل
                    </a>
                    <a href="delete_sale.html?sale_id=${sale.sale_id}" class="delete-button" data-sale-id="${sale.sale_id}">
                      حذف
                    </a>
                    <button class="issue-receipt-button" data-sale-id="${sale.sale_id}">
                      اصدار إيصال
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
          button.addEventListener('click', function (event) {
            event.preventDefault();
            const saleId = this.dataset.saleId;
            if (confirm("هل أنت متأكد من حذف هذا البيع؟")) {
              fetch(`${API_ENDPOINT}/${saleId}`, {
                method: 'DELETE',
              })
                .then((response) => {
                  if (response.ok) {
                    fetchSales(); // Refresh the table after deletion
                  } else {
                    alert('حدث خطأ أثناء حذف البيع.');
                  }
                })
                .catch((error) => {
                  alert('حدث خطأ أثناء الاتصال بالخادم.');
                });
            }
          });
        });

        const issueReceiptButtons = document.querySelectorAll('.issue-receipt-button');
        issueReceiptButtons.forEach(button => {
          button.addEventListener('click', function () {
            const saleId = this.dataset.saleId;
            fetch(`${API_ENDPOINT}/${saleId}`, {
              method: 'POST',
            })
              .then((response) => {
                if (response.ok) {
                  fetchSales();
                } else {
                  alert('حدث خطأ أثناء إصدار الإيصال.');
                }
              })
              .catch((error) => {
                alert('حدث خطأ أثناء الاتصال بالخادم.');
              });
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching sales:', error);
      });
  }

  fetchSales();
});