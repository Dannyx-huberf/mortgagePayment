const Htmlresult = document.querySelector('.js-result-container');

export function monthlyPayment(amount, rate, terms) {
  const decimal = rate / 100 / 12; // Monthly interest rate
  const base = 1 + decimal; // Base for exponentiation
  const exponent = terms * 12; // Total number of payments

  // Correct calculation of the monthly payment
  const computedCalc = (decimal * Math.pow(base, exponent)) / (Math.pow(base, exponent) - 1);
  const result = amount * computedCalc;

  const totalAmount = result * exponent; // Total amount repaid over the term

  // Update the result container
  Htmlresult.innerHTML = `
    
      <div class="result-heading">
      <h3 class="calculated-result-title">Your results</h3>
      <p class="calculated-result-details">
      Your results are shown below based on the information you provided. 
        To adjust the results, edit the form and click “calculate repayments” again.
      </p>
      </div>
       <div class="output-container">
    <p>Your monthly repayments</p>
    <span class="monthly-payment">£${result.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
    <hr>
    <p>Total you'll repay over the term</p>
    <span class="total-payment">£${totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
  </div>
    
  `;
}

export function interestOnlyPayment(amount, rate, terms) {
  const decimal = rate / 100 / 12; // Monthly interest rate
  const monthlyInterestPayment = amount * decimal; // Monthly interest payment
  const totalAmount = monthlyInterestPayment * (terms * 12); // Total interest paid over the term

  // Update the result container
  Htmlresult.innerHTML = `
      <div class="result-heading">
      <h3 class="calculated-result-title">Your results</h3>
      <p class="calculated-result-details">
      Your results are shown below based on the information you provided. 
        To adjust the results, edit the form and click “calculate repayments” again.
      </p>
      </div>
       <div class="output-container">
      <p>Your monthly repayments</p>
      <span class="monthly-payment">£${monthlyInterestPayment.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
    <hr>
    <p>Total you'll repay over the term</p>
    <span class="total-payment">£${totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
  </div>
  
  `;
}
