let radio;
let button;
let result = '';
let resultColor = '';
let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  // 載入 CSV 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffe5ec");
  textSize(30);

  //建立選擇題
  radio = createRadio();
  radio.style('width', '600px');
  radio.style('font-size', '40px'); // 調整選項字體大小
  radio.position(windowWidth / 2 - 100, windowHeight / 2);
  
  button = createButton('提交');
  button.style('font-size', '30px');
  button.position(windowWidth / 2 - 50, windowHeight / 2 + 100);
  button.mousePressed(checkAnswer);

  loadQuestion();
}

function draw() {
  background("#ffe5ec");
  textAlign(CENTER);
  fill(0);
  textSize(40); // 放大題目字體
  if (currentQuestionIndex < questions.getRowCount()) {
    text(questions.getString(currentQuestionIndex, 'question'), windowWidth / 2, windowHeight / 2 - 60);
  }
  textSize(30); // 恢復字體大小
  fill(resultColor);
  text(result, windowWidth / 2, windowHeight / 2 + 250);

  // 在左上角顯示 "413730424詹子萱"
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text("413730424詹子萱", 10, 30);
}

function loadQuestion() {
  radio.elt.innerHTML = ''; // 清空選項
  for (let i = 1; i <= 4; i++) {
    const option = questions.getString(currentQuestionIndex, 'option' + i);
    if (option) {
      radio.option(option);
    }
  }
}

function checkAnswer() {
  const answer = radio.value();
  if (answer === questions.getString(currentQuestionIndex, 'answer')) {
    result = '答對嚕嚕!';
    resultColor = '#ffbe0b';
    correctCount++;
  } else {
    result = `答錯嚕! 正確答案是：${questions.getString(currentQuestionIndex, 'answer')}`;
    resultColor = '#bc4749';
    incorrectCount++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.getRowCount()) {
    loadQuestion();
  } else {
    result = `完成! 答對: ${correctCount} 題, 答錯: ${incorrectCount} 題`;
    resultColor = '#1b263b';
    radio.hide();
    button.hide();
  }
}
