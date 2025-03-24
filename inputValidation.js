// Import calculation functions from calculate.js
import { monthlyPayment, interestOnlyPayment } from './calculate.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('mortgage-form');
  const amountInput = document.getElementById('amount');
  const termsInput = document.getElementById('terms');
  const rateInput = document.getElementById('rate');
  const repaymentBtn = document.getElementById('repayment-btn');
  const interestBtn = document.getElementById('intrest-btn'); // Note: typo in HTML (intrest vs interest)
  const clearLink = document.querySelector('.js-clear-link');
  const resultContainer = document.querySelector('.js-result-container');

  // Error messages
  const amountError = amountInput.closest('.meessage-error-container').querySelector('.error-message');
  const termsError = termsInput.closest('.meessage-error-container').querySelector('.error-message');
  const rateError = rateInput.closest('.meessage-error-container').querySelector('.error-message');
  const typeError = document.querySelector('.mortgage-type .error-message');

  // Clear all fields
  clearLink.addEventListener('click', function(e) {
    e.preventDefault();
    resetForm();
  });

  function resetForm() {
    amountInput.value = '';
    termsInput.value = '';
    rateInput.value = '';
    repaymentBtn.checked = false;
    interestBtn.checked = false;
    
    // Clear errors
    amountError.style.display = 'none';
    termsError.style.display = 'none';
    rateError.style.display = 'none';
    typeError.style.display = 'none';
    
    // Reset input styles
    amountInput.style.borderColor = '';
    termsInput.style.borderColor = '';
    rateInput.style.borderColor = '';
    
    // Reset result container
    resultContainer.innerHTML = `
      <img src="./assets/images/illustration-empty.svg" alt="">
      <h2>Results shown here</h2>
      <p>Complete the form and click "calculate repayments" to see what 
      your monthly repayments would be.</p>
    `;
  }

  // Validate numeric inputs
  function validateNumericInput(input, errorElement) {
    const value = input.value.trim();
    
    if (!value) {
      showError(input, errorElement, 'This field is required');
      return false;
    }
    
    if (isNaN(value) || parseFloat(value) <= 0) {
      showError(input, errorElement, 'Please enter a valid number');
      return false;
    }
    
    hideError(input, errorElement);
    return true;
  }

  // Validate mortgage type selection
  function validateMortgageType() {
    if (!repaymentBtn.checked && !interestBtn.checked) {
      typeError.style.display = 'block';
      return false;
    }
    typeError.style.display = 'none';
    return true;
  }

  // Show error
  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.style.borderColor = 'hsl(0, 100%, 67%)';
  }

  // Hide error
  function hideError(input, errorElement) {
    errorElement.style.display = 'none';
    input.style.borderColor = '';
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate amount
    if (!validateNumericInput(amountInput, amountError)) isValid = false;
    if (!validateNumericInput(termsInput, termsError)) isValid = false;
    if (!validateNumericInput(rateInput, rateError)) isValid = false;
    if (!validateMortgageType()) isValid = false;
    
    // Only calculate if all validations pass
    if (isValid) {
      const amount = parseFloat(amountInput.value);
      const rate = parseFloat(rateInput.value);
      const terms = parseFloat(termsInput.value);
      
      // Call the appropriate imported function
      if (repaymentBtn.checked) {
        monthlyPayment(amount, rate, terms);
      } else {
        interestOnlyPayment(amount, rate, terms);
      }
    }
  });

  // Real-time validation for numeric inputs
  [amountInput, termsInput, rateInput].forEach(input => {
    input.addEventListener('input', function() {
      const errorElement = input.closest('.meessage-error-container').querySelector('.error-message');
      validateNumericInput(input, errorElement);
    });
  });

  // Real-time validation for mortgage type
  [repaymentBtn, interestBtn].forEach(radio => {
    radio.addEventListener('change', function() {
      validateMortgageType();
    });
  });
});