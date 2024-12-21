let selectedMethod = 'aes'; // Default encryption method
let action = 'encrypt'; // Default action is encryption

// Function to handle method selection
document.querySelectorAll('.method-button').forEach(button => {
  button.addEventListener('click', function () {
    // Update the selected method based on the button clicked
    selectedMethod = this.getAttribute('data-method');
    
    // Remove the 'selected' class from all buttons
    document.querySelectorAll('.method-button').forEach(btn => btn.classList.remove('selected'));
    
    // Add the 'selected' class to the clicked button
    this.classList.add('selected');
  });
});

// Handle action (Encrypt/Decrypt) selection
document.getElementById('encryptOption').addEventListener('click', function () {
  action = 'encrypt'; // Set action to encrypt
  document.getElementById('actionBtn').textContent = 'Encrypt Text'; // Update button text
  document.getElementById('encryptOption').classList.add('selected'); // Highlight the encrypt button
  document.getElementById('decryptOption').classList.remove('selected'); // Remove highlight from decrypt button
});

document.getElementById('decryptOption').addEventListener('click', function () {
  action = 'decrypt'; // Set action to decrypt
  document.getElementById('actionBtn').textContent = 'Decrypt Text'; // Update button text
  document.getElementById('decryptOption').classList.add('selected'); // Highlight the decrypt button
  document.getElementById('encryptOption').classList.remove('selected'); // Remove highlight from encrypt button
});

// Handle the main Encrypt/Decrypt Button click
document.getElementById('actionBtn').addEventListener('click', function () {
  const text = document.getElementById('textInput').value; // Get the input text
  const key = document.getElementById('encryptionKey').value; // Get the encryption key

  // Validation for empty inputs
  if (!text.trim() || (selectedMethod !== 'base64' && !key.trim())) {
    alert('Both text and key are required, except for Base64!');
    return;
  }

  let result = ''; // Placeholder for the result
  try {
    // Perform encryption/decryption based on the selected method
    switch (selectedMethod) {
      case 'aes':
      case 'rsa':
      case 'des':
      case 'blowfish':
      case 'twofish':
      case 'rc4':
      case 'chacha20':
        result = simpleEncryptDecrypt(text, key, action, selectedMethod);
        break;
      case 'base64':
        result = action === 'encrypt' ? btoa(text) : atob(text);
        break;
      case 'xor':
        result = xorEncryptDecrypt(text, key);
        break;
      case 'vigenere':
        result = action === 'encrypt' ? vigenereEncrypt(text, key) : vigenereDecrypt(text, key);
        break;
      default:
        result = 'Unsupported method';
    }
  } catch (error) {
    // Handle errors during encryption/decryption
    result = 'Error processing the text. Please check your inputs.';
  }

  // Display the result in the output textarea
  document.getElementById('output').value = result;
});

// Mock implementation of encryption/decryption for various methods
function simpleEncryptDecrypt(text, key, action, method) {
  const combinedText = action === 'encrypt' ? text + key : text.replace(key, '');
  const prefix = `${action === 'encrypt' ? 'Encrypted' : 'Decrypted'} (${method}): `;
  return prefix + (action === 'encrypt' ? btoa(combinedText) : atob(combinedText));
}

// XOR Encryption/Decryption function
function xorEncryptDecrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

// Vigenère Cipher Encryption
function vigenereEncrypt(text, key) {
  let result = '';
  for (let i = 0, j = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(j % key.length);
    result += String.fromCharCode((charCode + keyCode) % 256);
    j++;
  }
  return result;
}

// Vigenère Cipher Decryption
function vigenereDecrypt(text, key) {
  let result = '';
  for (let i = 0, j = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(j % key.length);
    result += String.fromCharCode((charCode - keyCode + 256) % 256);
    j++;
  }
  return result;
}

// Toggle Dark Mode
document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});
