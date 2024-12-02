document.getElementById('appealForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Your appeal has been submitted successfully!');
    this.reset();
});
