document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appealForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/submit-appeal', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('Failed to submit appeal. Please try again.');
            console.error(error);
        }
    });
});
