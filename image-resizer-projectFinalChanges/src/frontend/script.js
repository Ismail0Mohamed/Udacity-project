const resizeImage = (path, width, height) => {
      if (!width || !height) {
            alert("Please enter both width and height.");
      } else {
            window.open(`${path.replace('/uploads', '')}?width=${width}&height=${height}`, '_blank');
            setTimeout(loadGallery, 2000);
      }
}

const deleteImage = (path) => {
      fetch(`/images/${path}`, { method: 'DELETE' })
      .then((res) => {
            if (res.status == 203) {
                  // alert('image deleted successfully');
                  loadGallery(); // Reload gallery after successful deletion
            } else {
                  alert('there was an error deleting the image');
                  console.log(res);
            }
      })
      .catch((error) => {
            console.error('Delete request failed:', error);
            alert('there was an error deleting the image');
      });
}

const createImageCon = (path, img) => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('con')

      const deleteBtn = document.createElement('div');
      deleteBtn.innerHTML = '❌';
      deleteBtn.classList.add('delete');
      deleteBtn.addEventListener('click', () => {deleteImage(path.split('/uploads/images/')[1])});

      imgContainer.appendChild(deleteBtn);
      imgContainer.appendChild(img);

      return imgContainer;
}

// Function to fetch and render gallery images
function loadGallery() {
      fetch("/api/images")
            .then((res) => res.json())
            .then((imagePaths) => {
                  const gallery = document.getElementById("gallery");
                  gallery.innerHTML = "";
                  imagePaths.forEach((path) => {
                        const img = document.createElement("img");
                        img.src = path;
                        img.alt = "Gallery Image";

                        img.addEventListener("click", () => {
                              const width = document.querySelector('input[name="width"]').value;
                              const height = document.querySelector('input[name="height"]').value;

                              resizeImage(path, width, height);
                        });

                        gallery.appendChild(createImageCon(path, img));
                  });
            });
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadGallery);
document.addEventListener("visibilitychange", loadGallery);

const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);

      try {
            const response = await fetch("/upload", {
                  method: "POST",
                  body: formData,
            });

            if (!response.ok) {
                  const error = await response.text();
                  alert("Upload failed: " + error);
                  return;
            }

            // alert("Upload successful!");
            loadGallery(); // Reload gallery after upload

            const result = await response.json();
            window.open(result.resizedImageUrl, "_blank");

            // Optionally, reset form inputs after upload
            form.reset();

      } catch (err) {
            alert("Error uploading file: " + err.message);
      }
});