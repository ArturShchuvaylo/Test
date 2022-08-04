
const DATA = [
    {
        question: "Вопрос1",
        answers: [
            {
                id: '1',
                value: 'Ответ 1',
                corect: true,
            },
            {
                id: '2',
                value: 'Ответ 2',
                corect: false,
            },
            {
                id: '3',
                value: 'Ответ 3',
                corect: false,
            },
        ]
    },
    {
        question: "Вопрос2",
        answers: [
            {
                id: '4',
                value: 'Ответ 4',
                corect: false,
            },
            {
                id: '5',
                value: 'Ответ 5',
                corect: true,
            },

        ]
    }
]

let localData = {};
const quiz = document.querySelector('.quiz');
const questions = document.querySelector('.guiz__question');
const indicator = document.querySelector('.guiz__indicator');
const results = document.querySelector('.guiz__results');
const btnNext = document.querySelector('.btn__next');
const btnRestart = document.querySelector('.btn__restart');


const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswer = () => DATA[index].answers
        .map(item =>
            `
            <li>
                        <label for="">
                            <input  class ="answer-input" type="radio" name = ${index} value= ${item.id}>
                            ${item.value}
                        </label> 
            </li>
            `

        )

        .join('');
    questions.innerHTML = `
    <div class="item">
    <div class="item__question"> ${DATA[index].question}</div>
            <ul class="item__answer">
            ${renderAnswer()}
            </ul>
    </div>
    `
};

const renderResults = () => {
    let content = '';

    const getClassName = (answer, index) => {
        let classname = "";
        console.log(answer);
        console.log(localData);

        if (!answer.corect && answer.id === localData[index]) {

            classname = 'invalid';
        } else if (answer.corect) {
            //  console.log('ghjikj ');
            classname = 'valid';

        }
        return classname;
    }

    const getAnswers = (quastionIndex) => DATA[quastionIndex].answers
        .map((answers) => `<li class=${getClassName(answers, quastionIndex)}>${answers.value}</li>`)
        .join('');

    DATA.forEach((question, index) => {
        content += `
            <div class="results__item">
                <div class="results__question"> ${question.question}</div>
                    <ul class="results__answer"> ${getAnswers(index)} </ul>
            </div>
            `;
    });
    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`
};

quiz.addEventListener('change', event => {
    if (event.target.classList.contains('answer-input')) {
        localData[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
})

quiz.addEventListener('click', event => {
    if (event.target.classList.contains('btn__next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex) {
            questions.classList.add('hidden')
            indicator.classList.add('hidden')
            results.classList.add('visible')
            btnNext.classList.add('hidden')
            btnRestart.classList.add('visible')

            renderResults();
        } else {
            renderQuestions((nextQuestionIndex));
        }
        btnNext.disabled = true;

    }

    if (event.target.classList.contains('btn__restart')) {
        localData = {};
        results.innerHTML = "";
        questions.classList.remove('hidden')
        indicator.classList.remove('hidden')
        results.classList.remove('visible')
        btnNext.classList.remove('hidden')
        btnRestart.classList.remove('visible')

        renderQuestions(0);

    }
})

renderQuestions(0);