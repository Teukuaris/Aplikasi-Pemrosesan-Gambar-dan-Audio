document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.match('image.*')) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 300; // Ubah sesuai kebutuhan Anda
                    const maxHeight = 300; // Ubah sesuai kebutuhan Anda
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    document.getElementById('imagePreview').innerHTML = '';
                    document.getElementById('imagePreview').appendChild(canvas);
                };
                img.src = e.target.result;
            } else {
                const img = document.createElement('img');
                img.src = e.target.result;
                document.getElementById('imagePreview').innerHTML = '';
                document.getElementById('imagePreview').appendChild(img);
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('audioInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = e.target.result;
            document.getElementById('audioPreview').innerHTML = '';
            document.getElementById('audioPreview').appendChild(audio);
        };
        reader.readAsDataURL(file);
    }
});