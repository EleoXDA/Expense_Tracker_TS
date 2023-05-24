"use strict";
// Define the income variable
let income = 0;
// Define the expenses array
let expenses = [];
// Add an event listener to the add-income button
document.getElementById('add-income').addEventListener('click', function () {
    income = Number(document.getElementById('income').value);
    updateIncomeInSummary();
    updateRemainderInSummary();
});
// Add an event listener to the add-expense button
document.getElementById('add-expense').addEventListener('click', function () {
    const expenseAmount = Number(document.getElementById('expense-amount').value);
    let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    if (totalExpenses + expenseAmount > income) {
        alert("This expenditure will exceed your income. Please review your expenses.");
        return;
    }
    const expenseCategory = document.getElementById('expense-category').value;
    expenses.push({ category: expenseCategory, amount: expenseAmount });
    updateExpensesInSummary();
    updateRemainderInSummary();
});
// Function to update the income in the summary
function updateIncomeInSummary() {
    const table = document.getElementById('summary-table');
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = "Income";
    cell2.innerHTML = "$" + income;
}
// Function to update the expenses in the summary
function updateExpensesInSummary() {
    const table = document.getElementById('summary-table');
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = expenses[expenses.length - 1].category;
    cell2.innerHTML = "$" + expenses[expenses.length - 1].amount;
    const remainderRow = document.getElementById('remainder-row');
    if (remainderRow) {
        table.appendChild(remainderRow);
    }
}
// Function to update the remainder in the summary
function updateRemainderInSummary() {
    let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    let remainingBudget = income - totalExpenses;
    const table = document.getElementById('summary-table');
    let row = document.getElementById('remainder-row');
    if (row) {
        row.cells[1].innerHTML = "$" + remainingBudget;
    }
    else {
        const table = document.getElementById('summary-table');
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = "Remainder";
        cell2.innerHTML = "$" + remainingBudget;
        row.id = "remainder-row";
    }
}
// Function to add an expense
function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = Number(document.getElementById('expense-amount').value);
    let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const remainder = income - totalExpenses;
    if (amount > remainder) {
        alert("This expenditure will exceed your income. Please review your expenses.");
        return;
    }
    const row = document.createElement('tr');
    const categoryCell = document.createElement('td');
    const amountCell = document.createElement('td');
    categoryCell.textContent = category;
    amountCell.textContent = "$" + amount;
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    document.getElementById('summary-table').appendChild(row);
    updateRemainderInSummary();
}
