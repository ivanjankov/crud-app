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
		typeToggler: 'type_toggler',
		modal: 'mymodal',
		closeModal: 'close',
		modalImg: 'modal_img',
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
				<div class="d-flex flex-column justify-content-between">
					<div class="d-flex justify-content-between">
						<p class="m-0">	${recordValues.desc}</p>
						<span class="cost ms-3">${
							recordValues.type == 'exp' ? ' - ' : ''
						}$${convertToNum(recordValues.amount)}</span>
					</div>    
					<p class="date text-end py-2 m-0">${getDate()}</p>  
				</div>      
				<button	class="btn btn_delete d-flex justify-content-center align-items-center">
					<i class="fas fa-times text-danger"></i>
				</button>
			`;

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
		addEventListener('keydown', (e) => {
			if (e.keyCode == 13) {
				console.log(e);
				createNewRecord();
			}
		});
		addBtn.addEventListener('click', createNewRecord);
	}

	function updateApp() {
		resetFileds();
		deleteRecord();
		calcTotal();
		modalFuncionality();
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
			total.push(currentCost[1]);
		});
		let newArr = total.map((el) => convertArrElToNum(el));
		total = newArr.reduce((a, b) => a + b, 0);
		return total;
	}

	function calcTotal() {
		let income = calcSepareteTypes(DOMStrings.singleIncome);
		let expenses = calcSepareteTypes(DOMStrings.singleExpense);
		let totalSpan = document.getElementById(DOMStrings.total);
		total = income - expenses;
		totalSpan.innerText = `${total < 0 ? '- $' : '$'}${Math.abs(
			income - expenses
		).toLocaleString()}.00`;
		changeColor(total, totalSpan);
		return income - expenses;
	}

	function convertToNum(num) {
		return parseInt(num).toLocaleString();
	}

	function convertArrElToNum(num) {
		return Number(num.split(',').join(''));
	}

	function getDate() {
		let date = new Date();

		let todaysDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		return todaysDate;
	}

	function changeColor(total, element) {
		if (total < 0) {
			element.style.color = 'red';
		} else {
			element.style.color = 'green';
		}
	}

	function changeFocusOutlineClr() {
		let inputs = document.querySelectorAll('input');
		let typeToggler = document.getElementById(DOMStrings.typeToggler);
		typeToggler.addEventListener('change', () => {
			if (typeToggler.value == 'inc') {
				inputs.forEach((el) => {
					el.style.borderColor = 'green';
				});
			} else {
				inputs.forEach((el) => {
					el.style.borderColor = 'red';
				});
			}
		});
	}

	changeFocusOutlineClr();
	getDate();
	insertNewRecord();
	updateApp();

	// MODAL

	function modalFuncionality() {
		let modal = document.getElementById(DOMStrings.modal);
		let closeModal = document.getElementsByClassName(DOMStrings.closeModal)[0];
		let totalAmount = calcTotal();

		setTimeout(() => {
			fillModalContent(totalAmount);
			if (totalAmount < -1000) {
				modal.style.display = 'block';
				closeModal.addEventListener('click', () => {
					modal.style.display = 'none';
				});
			} else if (totalAmount > 40000) {
				fillModalContent(totalAmount);
				modal.style.display = 'block';
				closeModal.addEventListener('click', () => {
					modal.style.display = 'none';
				});
			}
		}, 2000);
	}

	function fillModalContent(total) {
		let modalImg = document.getElementById(DOMStrings.modalImg);
		if (total > 40000) {
			modalImg.setAttribute('src', 'img/modal/agency.jpeg');
		} else if (total < 1000) {
			modalImg.setAttribute('src', 'img/modal/kredisimo.png');
		}
	}
});
