from flask import Flask, request, send_file, render_template, send_from_directory
from PIL import Image
from pydub import AudioSegment

app = Flask(__name__)
app.debug = False  # Menonaktifkan debugger Flask

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resize', methods=['POST'])
def resize_image():
    if request.method == 'POST':
        file = request.files['image']
        img = Image.open(file)
        new_width = 500
        new_height = 500
        resized_img = img.resize((new_width, new_height))
        resized_img.save('resized_image.jpg')
        return send_file('resized_image.jpg', as_attachment=True)
    return '''
        <form action="/resize" method="post" enctype="multipart/form-data">
            <input type="file" name="image">
            <button type="submit">Resize</button>
        </form>
    '''

@app.route('/compress', methods=['POST'])
def compress_audio():
    if request.method == 'POST':
        file = request.files['audio']
        audio = AudioSegment.from_file(file)
        compressed_audio = audio.export('compressed_audio.mp3', format='mp3', bitrate='64k')
        return send_file('compressed_audio.mp3', as_attachment=True)
    return '''
        <form action="/compress" method="post" enctype="multipart/form-data">
            <input type="file" name="audio">
            <button type="submit">Compress</button>
        </form>
    '''

if __name__ == '__main__':
    app.run(debug=True)
