let income = 0;
let expenses = [];

document.getElementById('add-income').addEventListener('click', function() {
    income = Number(document.getElementById('income').value);
    updateIncomeInSummary();
    updateRemainderInSummary();
});

document.getElementById('add-expense').addEventListener('click', function() {
  const expenseAmount = Number(document.getElementById('expense-amount').value);

  let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  if (totalExpenses + expenseAmount > income) {
      alert("This expenditure will exceed your income. Please review your expenses.");
      return;
  }

  const expenseCategory = document.getElementById('expense-category').value;
  expenses.push({category: expenseCategory, amount: expenseAmount});
  updateExpensesInSummary();
  updateRemainderInSummary();
});


function updateIncomeInSummary() {
    const table = document.getElementById('summary-table');
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = "Income";
    cell2.innerHTML = "$" + income;
}

function updateExpensesInSummary() {
    const table = document.getElementById('summary-table');
    const row = table.insertRow(-1); // Inserts a row at the end of the table
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = expenses[expenses.length - 1].category;
    cell2.innerHTML = "$" + expenses[expenses.length - 1].amount;

    const remainderRow = document.getElementById('remainder-row');
    if (remainderRow) {
        // Move the "Remainder" row to the end of the table
        table.appendChild(remainderRow);
    }
}

function updateRemainderInSummary() {
    // Calculate total expenses and remaining budget
    let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    let remainingBudget = income - totalExpenses;

    // Update remainder row if it exists, otherwise create a new one
    const table = document.getElementById('summary-table');
    let row = document.getElementById('remainder-row');
    if (row) {
        row.cells[1].innerHTML = "$" + remainingBudget;
    } else {
        row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = "Remainder";
        cell2.innerHTML = "$" + remainingBudget;
        row.id = "remainder-row";
    }
}

function addExpense() {
  var category = document.getElementById('expense-category').value;
  var amount = document.getElementById('expense-amount').value;

  if (amount > remainder) {
    alert("This expenditure will exceed your income. Please review your expenses.");
    return;
  }
  
  var row = document.createElement('tr');
  var categoryCell = document.createElement('td');
  var amountCell = document.createElement('td');
  categoryCell.textContent = category;
  amountCell.textContent = "$" + amount;
  row.appendChild(categoryCell);
  row.appendChild(amountCell);
  document.getElementById('summary-table').appendChild(row);

  remainder -= amount;
  updateRemainder();
}
