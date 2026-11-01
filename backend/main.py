"""Cat vs Dog classifier API using MobileNetV2 pretrained on ImageNet."""
import io

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input

# ImageNet class index ranges
DOG_RANGE = (151, 269)   # 151-268: dog breeds
CAT_RANGE = (281, 286)   # 281-285: domestic cats (tabby, tiger cat, Persian, Siamese, Egyptian cat)
MIN_PRESENCE = 0.05      # reject images where cat+dog probability mass is too low
MAX_BYTES = 5 * 1024 * 1024

app = FastAPI(title="Cat vs Dog Classifier API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = MobileNetV2(weights="imagenet")  # downloaded once, then cached
DETECT_THRESHOLD = 0.05


def _predict_animal_scores(image: Image.Image) -> tuple[float, float]:
    x = preprocess_input(np.expand_dims(np.asarray(image, dtype="float32"), axis=0))
    probs = model.predict(x, verbose=0)[0]
    dog = float(probs[DOG_RANGE[0]:DOG_RANGE[1]].sum())
    cat = float(probs[CAT_RANGE[0]:CAT_RANGE[1]].sum())
    return dog, cat


@app.get("/")
def health():
    return {"status": "ok", "model": "MobileNetV2 (ImageNet)"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="Only JPG, JPEG or PNG images are allowed.")

    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="Image is larger than 5MB.")

    try:
        img = Image.open(io.BytesIO(data)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(status_code=400, detail="The file is not a valid image.")

    full_img = img.resize((224, 224))
    full_dog, full_cat = _predict_animal_scores(full_img)

    left_width = max(1, img.width // 2)
    left_crop = img.crop((0, 0, left_width, img.height)).resize((224, 224))
    left_dog, left_cat = _predict_animal_scores(left_crop)

    right_x = img.width - left_width
    right_crop = img.crop((right_x, 0, img.width, img.height)).resize((224, 224))
    right_dog, right_cat = _predict_animal_scores(right_crop)

    dog = max(full_dog, left_dog, right_dog)
    cat = max(full_cat, left_cat, right_cat)

    dog_found = dog >= DETECT_THRESHOLD
    cat_found = cat >= DETECT_THRESHOLD

    if dog_found and cat_found:
        label = "BOTH"
    elif dog_found:
        label = "DOG"
    elif cat_found:
        label = "CAT"
    else:
        raise HTTPException(status_code=422, detail="No cat or dog detected in this image.")

    return {"label": label}
