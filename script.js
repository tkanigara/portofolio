function toggleDetails(detailsId) {
    const details = document.getElementById(detailsId);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Initially display the "About Me" section
document.addEventListener('DOMContentLoaded', () => {
    showSection('about');
});
