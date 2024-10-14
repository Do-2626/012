document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = this.href;
    });
  });
});