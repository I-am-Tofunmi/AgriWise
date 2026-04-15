import io
import numpy as np
from PIL import Image

def load_model(path):
    """Attempts to load the specified model, falling back if unavailable."""
    import tensorflow as tf
    try:
        model = tf.keras.models.load_model(path)
        print(f"✅ Loaded custom plant disease model from: {path}")
        return model
    except Exception as e:
        print(f"⚠️ Could not load custom model ({e}). Falling back to default MobileNetV2...")
        try:
            model = tf.keras.applications.MobileNetV2(weights="imagenet", include_top=True)
            print("✅ Loaded default MobileNetV2 pretrained on ImageNet.")
            return model
        except Exception as e2:
            print(f"⚠️ Could not load MobileNetV2 ({e2}). Using mock model instead.")
            return None


def preprocess_image_bytes(image_bytes, target_size=(224,224)):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize(target_size)
    arr = np.array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr


def predict_from_bytes(model, image_bytes, labels=None, top_k=3):
    """Runs prediction or returns mock result if no model is available."""
    if model is None:
        print("⚠️ Using mock model response.")
        return [{"label": "Tomato___Early_blight", "confidence": 0.92}]

    import tensorflow as tf
    x = preprocess_image_bytes(image_bytes)
    preds = model.predict(x)

    if preds.ndim == 2:
        preds = preds[0]

    # Softmax normalization
    try:
        from scipy.special import softmax
        probs = softmax(preds)
    except Exception:
        exps = np.exp(preds - np.max(preds))
        probs = exps / exps.sum()

    idx = probs.argsort()[::-1][:top_k]
    results = []
    for i in idx:
        label = labels[i] if labels and i < len(labels) else str(i)
        results.append({"label": label, "confidence": float(probs[i])})
    return results
