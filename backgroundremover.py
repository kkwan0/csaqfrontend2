from rembg import remove
from PIL import Image
input_path = 'platform.jpg'
output_path = 'platform.png'
input = Image.open(input_path)
output = remove(input)
output.save(output_path)