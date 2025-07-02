<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Business Card Options</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 2rem;
      background: #f8f9fa;
    }
    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .card-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .card-preview {
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card-preview img {
      width: 100%;
      height: auto;
      max-height: 200px;
      object-fit: contain;
      margin-bottom: 1rem;
    }
    .select-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .select-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <h1>Select a Business Card Layout</h1>
  <div class="card-options">
    <div class="card-preview">
      <img src="assets/preview_basic.png" alt="Basic Layout" />
      <h2>Basic Layout</h2>
      <p>Logo left, info right</p>
      <button class="select-button" onclick="selectLayout('basic')">Choose This</button>
    </div>
    <div class="card-preview">
      <img src="assets/preview_centered.png" alt="Centered Layout" />
      <h2>Centered Layout</h2>
      <p>Logo top, info centered</p>
      <button class="select-button" onclick="selectLayout('centered')">Choose This</button>
    </div>
    <div class="card-preview">
      <img src="assets/preview_qr_right.png" alt="QR Layout" />
      <h2>QR Code Layout</h2>
      <p>QR on right with logo and contact info</p>
      <button class="select-button" onclick="selectLayout('qr_right')">Choose This</button>
    </div>
  </div>

  <script>
    function selectLayout(layout) {
      alert(`You selected the "${layout}" layout. Your download will be generated.`);
      // You would POST this to your Python backend here
      // fetch('/generate', { method: 'POST', body: JSON.stringify({ layout }) })
    }
  </script>
</body>
</html>
