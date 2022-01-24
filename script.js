document.addEventListener('DOMContentLoaded', () => {
	let DOMStrings = {
		inputDescription: '.enterance_description',
		inputAmount: '.amount',
		inputType: '.input_type',
		addBtn: '.add_btn',
		profit: 'profit',
		expenses: 'expenses',
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
				${recordValues.desc} <span class="cost ms-3">$${recordValues.amount}</span>
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
	}

	function insertNewRecord() {
		let addBtn = document.querySelector(DOMStrings.addBtn);
		addBtn.addEventListener('click', createNewRecord);
	}

	function updateApp() {
		insertNewRecord();
	}

	updateApp();
	console.log(getRecord());
});
