document.getElementById('imageUploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');

    const file = imageInput.files[0];

    if (!file || !titleInput.value || !descriptionInput.value) {
        alert('Please fill in all fields and select an image');
        return;
    }

    console.log('Form data collected:', {
        file,
        title: titleInput.value,
        description: descriptionInput.value,
    });

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', titleInput.value);
    formData.append('description', descriptionInput.value);


    console.log('Form data ready for upload:', formData);

    uploadImage(formData);
});

document.getElementById('addPublicationButton').addEventListener('click', function () {
    const publicationTitleInput = document.getElementById('publicationTitleInput');
    const publicationDateInput = document.getElementById('publicationDateInput');
    const publicationDescriptionInput = document.getElementById('publicationDescriptionInput');

    const publicationData = {
        title: publicationTitleInput.value,
        date: publicationDateInput.value,
        description: publicationDescriptionInput.value,
    };

    console.log('Publication data collected:', publicationData);

    addPublication(publicationData);
});

function uploadImage(formData) {
    console.log('Uploading image...');

    fetch('http://localhost:3000/api/admin/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Image uploaded successfully:', data);

            const filenameInput = document.getElementById('filenameInput');
            filenameInput.value = data.imageUrl; // Use the uploaded filename for downloading
            alert('Image uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        });
}

function addPublication(publicationData) {
    console.log('Adding publication...');

    fetch('http://localhost:3000/api/admin/addPublication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(publicationData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Publication added successfully:', data);
            // You can update the timeline or perform other actions as needed
            alert('Publication added successfully!');
        })
        .catch(error => {
            console.error('Error adding publication:', error);
            alert('Failed to add publication. Please try again.');
        });
}

document.getElementById('downloadButton').addEventListener('click', function () {
    const filenameInput = document.getElementById('filenameInput');
    const filename = filenameInput.value;

    if (!filename) {
        alert('Please enter a filename');
        return;
    }

    console.log('Downloading image with filename:', filename);

    downloadImage(filename);
});

function downloadImage(filename) {
    console.log('Downloading image...');

    fetch(`http://localhost:3000/api/download/${filename}`, {
        method: 'GET',
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);

            // Set the src attribute of the image element to the downloaded image URL
            const downloadedImage = document.getElementById('downloadedImage');
            downloadedImage.src = url;

            // Display the image container
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.style.display = 'block';
            alert('Image downloaded successfully!');
        })
        .catch(error => {
            console.error('Error downloading image:', error);
            alert('Failed to download image. Please try again.');
        });
}


function addProject(projectData) {
    console.log('Adding project...');

    fetch('http://localhost:3000/api/admin/addProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Project added successfully:', data);
            // You can update the UI or perform other actions as needed
            alert('Project added successfully!');
        })
        .catch(error => {
            console.error('Error adding project:', error);
            alert('Failed to add project. Please try again.');
        });
}

// Event listener for the "Add Project" button
document.getElementById('addProjectButton').addEventListener('click', function () {
    const projectData = {
        title: document.getElementById('projectTitleInput').value,
        faculty: document.getElementById('projectFacultyInput').value,
        companyfund: document.getElementById('projectCompanyFundInput').value,
        date: document.getElementById('projectDateInput').value,
        summary: document.getElementById('projectSummaryInput').value,
    };

    addProject(projectData);
});
