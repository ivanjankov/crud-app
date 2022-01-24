document.addEventListener('DOMContentLoaded', () => {
	let DOMStrings = {
		inputDescription: '.enterance_description',
		inputAmount: '.amount',
		inputType: '.input_type',
		addBtn: '.add_btn',
		profit: 'profit',
		expenses: 'expenses',
		singleIncome: '.single_income',
		singleExpense: '.single_expense',
		total: 'total',
	};

	function getRecord() {
		let desc, amount, type;
		desc = document.querySelector(DOMStrings.inputDescription).value;
		amount = document.querySelector(DOMStrings.inputAmount).value;
		type = document.querySelector(DOMStrings.inputType).value;

		return {
			desc: desc,
			amount: amount,
			type: type,
		};
	}

	function createNewRecord() {
		let recordValues = getRecord();
		if (recordValues.desc == '' || recordValues.amount == 0) {
			alert('Fill all the fields');
		} else {
			let record = document.createElement('div');
			record.classList.add(
				'individual_transaction',
				'd-flex',
				'justify-content-around',
				'align-items-center',
				'my-2'
			);

			record.innerHTML = `
            <p class="m-0">
				${recordValues.desc} <span class="cost ms-3">${
				recordValues.type == 'exp' ? ' - ' : ''
			}$${recordValues.amount}</span>
			</p>
		    <button	class="btn btn_delete d-flex justify-content-center align-items-center">
			    <i class="fas fa-times text-danger"></i>
			</button>`;

			if (recordValues.type == 'inc') {
				record.classList.add('single_income');
				document.getElementById(DOMStrings.profit).appendChild(record);
			} else {
				record.classList.add('single_expense');
				document.getElementById(DOMStrings.expenses).appendChild(record);
			}

			updateApp();
		}
	}

	function insertNewRecord() {
		let addBtn = document.querySelector(DOMStrings.addBtn);
		addBtn.addEventListener('click', createNewRecord);
	}

	function updateApp() {
		insertNewRecord();
		resetFileds();
		deleteRecord();
		calcTotal();
	}

	function resetFileds() {
		desc = document.querySelector(DOMStrings.inputDescription);
		amount = document.querySelector(DOMStrings.inputAmount);

		desc.value = '';
		amount.value = 0;
	}

	function deleteRecord() {
		let records = document.querySelectorAll('.btn_delete');
		records.forEach((btn) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				calcTotal();
			});
		});
	}

	function calcSepareteTypes(type) {
		let total = [];
		let totalIncome = Array.from(document.querySelectorAll(`${type} .cost`));
		totalIncome.forEach((element) => {
			let currentCost = element.innerHTML.split('$');
			total.push(+currentCost[1]);
		});
		total = total.reduce((a, b) => a + b, 0);
		return total;
	}

	function calcTotal() {
		let income = calcSepareteTypes(DOMStrings.singleIncome);
		let expenses = calcSepareteTypes(DOMStrings.singleExpense);
		let totalSpan = document.getElementById(DOMStrings.total);
		totalSpan.innerText = `${income - expenses < 0 ? '- $' : '$'}${Math.abs(
			income - expenses
		)}`;
		return income - expenses;
	}

	updateApp();

	console.log(getRecord());
});
