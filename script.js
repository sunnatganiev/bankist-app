'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements 
  displayMovements(acc.movements);
  // Display balance 
  calcDisplayBalance(acc);
  // Display summary 
  calcDisplaySummary(acc);
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ])

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   console.log('humanAges:', humanAges)
//   const adults = humanAges.filter(age => age >= 18)
//   console.log('adults:', adults)

//   const average = adults.reduce((sum, age, _, arr) => sum + age / arr.length, 0)
//   return average
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))

// --------------- THE MAGIC OF CHAINING METHODS -----------------
const usdToSum = 10700;

// PIPELINE 
const depositeBalance = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * usdToSum)
  .map((mov, i, arr) => {
    // console.log(arr)
    return mov * usdToSum;
  })
  .reduce((sum, mov) => sum + mov, 0);

// console.log('depositeBalance:', depositeBalance)

// const calcDisplaySummary = function (movements) {
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * acc.interestRate / 100)
    .filter((int, _, arr) => {
      // console.log(arr)
      return int >= 1;
    })
    .reduce((sum, mov) => sum + mov, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}€`;
};



/*
Coding challenge #3

Rewrite the 'calcAverageHumanAge' function
from the previous challenge, but this time
as an arrow function, and using chaining!
*/

// ------------ THE FIND METHOD ---------- 

const firthWithdrawal = movements.find(mov => mov < 0);
// console.log(firthWithdrawal)
// console.log(accounts)

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log('account:', account)

// -------------- IMPLEMENTING LOGIN ---------------- 

// Event handler 
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('LOGIN')

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log(currentAccount)
    // Display UI and message 
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
    // // Display movements 
    // displayMovements(currentAccount.movements)
    // // Display balance 
    // calcDisplayBalance(currentAccount)
    // // Display summary 
    // calcDisplaySummary(currentAccount)

    updateUI(currentAccount);

    // CLear input fields 
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
  }
});

// ---------------- IMPLEMENTING TRANSFERS ---------

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log('recieverAccount:', recieverAccount)

  if (amount > 0 &&
    recieverAccount &&
    amount <= currentAccount.balance &&
    recieverAccount?.username !== currentAccount.username) {
    // console.log('Transfer valid')
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    // UpdateUI
    updateUI(currentAccount);
  }

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

});

// --------------- THE FINDENDEX METHOD -----------------

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('DELETE')

  if (inputCloseUsername.value === currentAccount.username && inputClosePin.value * 1 === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    // Delete account
    accounts.splice(index, 1);

    // Hide UI 
    containerApp.style.opacity = 0;
  }
});

// --------------- some and every methods ----------------

// console.log(movements)

// // EQUALITY 
// console.log(movements.includes(-130))

// // SOME CONDITION 
// console.log(movements.some(mov => mov === -130))
// const anyDepositys = movements.some(mov => mov > 1000)
// console.log('anyDepositys:', anyDepositys)

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value * 1;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // UpdateUI 
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// EVERY 
// console.log(account4.movements.every(mov => mov > 0))

// Separate callback 
const deposit = mov => mov > 0;
// console.log(movements.some(deposit))
// console.log(movements.every(deposit))
// console.log(movements.filter(deposit))

// ------------------ FLAT AND FLATMAP -------------------

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
// console.log(arr.flat())

// const arrDeep = [[1, 2, 3, [4, 5, [6, 7]]], [8, 9, 10, [11, 12]], 13, 14]
// console.log('arrDeep:', arrDeep.flat(2))

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements.flat().reduce((sum, mov) => sum + mov, 0))

// flat 
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((sum, mov) => sum + mov, 0);

// console.log('overalBalance:', overalBalance)

// flatMap

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, mov) => sum + mov, 0);

// console.log('overalBalance2:', overalBalance2)

// ----------------- SORTING ARRAYS ------------------

// Strings (impacts original array)
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
// console.log('owners:', owners.sort())
// console.log(owners)

// // Numbers 
// console.log(movements)
// console.log(movements.sort())

// return < 0, A, B  (keep order)
// return > 0, B, A (switch order)
// movements.sort((a, b) => {
//   // Ascending 
//   // if (a > b) return 1;
//   // if (b > a) return -1

//   // Descending
//   if (a > b) return -1
//   if (b > a) return 1
// })

// movements.sort((a, b) => a - b)
// console.log(movements)

// sort() functionality in displayMovements

// ------------------- MORE WAYS OF CREATING AND FILLING ARRAYS --

// const arr = [1, 2, 3, 4, 5, 6, 7]
// console.log(new Array(1, 2, 3, 4, 5, 6, 7))

// // Empty arrays + fill method 
// const x = new Array(7)
// console.log(x)
// console.log(x.map(() => 5))

// // x.fill(1)
// // x.fill(1, 3)
// x.fill(1, 3, 5)
// console.log(x)

// arr.fill(23, 2, 6)
// console.log(arr)

// // Array.from 
// const y = Array.from({ length: 7 }, () => 1)
// console.log(y)

// const z = Array.from({ length: 7 }, (_, i) => i + 1)
// console.log(z)



// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'), mov => Number(mov.textContent.replace('€', '')))
//   console.log(movementsUI)
// })

// --------------- ARRAY METHODS SUMMARY 
// VIDEO EXPLANATION 

// --------------- ARRAY METHODS PRACTICE --------------

// 1.
// const bankDepositSum = accounts.map(acc => acc.movements).flat()
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, mov) => sum + mov, 0);
console.log('bankDepositSum:', bankDepositSum);

// 2. 
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, mov, i) => mov >= 1000 ? count + 1 : count, 0);
console.log('numDeposits1000:', numDeposits1000);

let a = 10;
// console.log(a++)
console.log(++a);

// 3. 
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sums, cur) => {
//     cur > 0 ? sums.deposits += cur : sums.withdrawal += cur
//     return sums
//   }, { deposits: 0, withdrawal: 0 })

const { deposits, withdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    // cur > 0 ? sums.deposits += cur : sums.withdrawal += cur
    sums[cur > 0 ? 'deposits' : 'withdrawal'] += cur;
    return sums;
  }, { deposits: 0, withdrawal: 0 });

console.log(deposits, withdrawal);

// 4. 
// this is a nice title => This Is a Nice Title 
// const convertTitleCase = function (title) {

//   const exception = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with']

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => exception
//       .includes(word) ? word : word[0]
//         .toUpperCase() + word.slice(1))
//     .join(' ')
//   return titleCase
// }

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exception = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exception
      .includes(word) ? word : capitalize(word))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];