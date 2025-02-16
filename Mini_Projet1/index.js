
//Ceci concerne la partie 1 ou je ramener les question d'un fichier json


/*
let json_data =[];
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        json_data = data.quiz
        let quizz = document.getElementById("quizz");
        quizz.innerHTML ="";
        data.quiz.forEach(
            (item,index) => {
                let qstdiv = document.createElement("div");
                qstdiv.classList.add("qst");
                qstdiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
                let options = document.createElement("div");
                options.classList.add("options");
                item.options.forEach(option => {
                    let opt = document.createElement("label");
                    opt.innerHTML = `<input type="radio" name="qst${index}" value="${option}" > ${option}`;
                    options.appendChild(opt);
                });
                qstdiv.appendChild(options);
                quizz.appendChild(qstdiv);
            }
        );
    })
    .catch(error => console.error("Erreur lors du chargement du JSON :", error));



function calcul_score(){
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let resultat = document.getElementById("resultat");
            resultat.innerHTML = "";
            let score = 0;
            data.quiz.forEach((item,index) => {
                let selectedOp = document.querySelector(`input[name="qst${index}"]:checked`);
                if (selectedOp){
                    let userAns = selectedOp.value;
                    if (userAns == item.answer){
                        score++;
                    }
                }
                else{
                    return ;
                }
            });
            resultat.innerHTML = `<p class="result">Score : ${score} / ${data.quiz.length}</p>`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    clearInterval(timeIntvl);
    
}
*/

let timeIntvl;
let timeLeft = 60;

function Timer(){
    timeIntvl = setInterval(function(){
        if (timeLeft <= 0){
            clearInterval(timeIntvl);
            alert("Temps ecoule !");
            calcul_score();
        }
        else{
            document.getElementById("time").innerText = timeLeft;
            timeLeft--;
        }
    },1000);
}

let quizData = [];

function generer(){
    document.getElementById("form").classList.add("hidden");
    document.getElementById("qcm").classList.remove("hidden");
    Timer();
    let amount = document.getElementById("trivia_amount").value;
    let category = document.querySelector("select[name='trivia_category']").value;
    let difficulty = document.querySelector("select[name='trivia_difficulty']").value;
    let type = document.querySelector("select[name='trivia_type']").value;

    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
    if (category !== "any") apiUrl += `&category=${category}`;
    if (difficulty !== "any") apiUrl += `&difficulty=${difficulty}`;
    if (type !== "any") apiUrl += `&type=${type}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            quizData = data.results;
            let quizz = document.getElementById("quizz");
            quizz.innerHTML ="";
            quizData.forEach(
                (item,index) => {
                    let qstdiv = document.createElement("div");
                    qstdiv.classList.add("qst");
                    qstdiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
                    let options = document.createElement("div");
                    options.classList.add("options");
                    let allOpt = [...item.incorrect_answers, item.correct_answer];
                    allOpt.sort(() => Math.random() - 0.5);
                    console.log(allOpt); 
                    allOpt.forEach(option => {
                        let opt = document.createElement("label");
                        opt.innerHTML = `<input type="radio" name="qst${index}" value="${option}" > ${option}`;
                        options.appendChild(opt);
                    });
                    qstdiv.appendChild(options);
                    quizz.appendChild(qstdiv);
                    }
                );
            }
            )
        .catch(error => console.error("Erreur lors du chargement des questions :", error));
        console.log(apiUrl);
    
}

function calcul_score(){

    clearInterval(timeIntvl);

    let resultat = document.getElementById("resultat");
    resultat.innerHTML = "";
    let score = 0;
    quizData.forEach((item,index) => {
        let selectedOp = document.querySelector(`input[name="qst${index}"]:checked`);
        if (selectedOp){
            let userAns = selectedOp.value;
            if (userAns == item.correct_answer){
                score++;
            }
        }
        else{
            return ;
        }
    });
    resultat.innerHTML = `<p class="result">Score : ${score} / ${quizData.length}</p>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    
}

