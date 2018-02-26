
/*
Sudo code for mathletic
    levels - 1000 questions each || answer 15 in a row with a set time
        addition and subtraction
            phase 1:  
                question range : 0 to 9
                sheltered add mode
                answer range  0 > 18
            phase 2: 
                question range : -9 to 0
                sheltered sub mode
                answer range -18 < 0
            phase 3: 
                question range : -9 to 9
                mixed sheltered add sub mode
                answer range -18 < 18
            phase 4: 
                question range : -18 < 18
                mixed semi-sheltered add sub mode
                answer range -18 to 18
            phase 5:
                question range : -99 to 99

        **note -- adding multple numbers pyramid 2 + 4 + 6 + 8 + 19 = 39
                                                   6  >> 12 >> 20 >>> 39    
*/
let count = 0;
const numOfQuestions = 2;

function promptUser(question, answer){
    let schema = {
        properties:{
            userAns:{
                message: question + '?'
            }
        }
    }
    let response = prompt(question);
    if (parseInt(response) === answer){
        
        count++;
        console.log('%c :::::::::::::::::::: '+ question +' = '+response+' ::::::::::::::::::::', 'background: #008000; color: #ffffff');

    } else {

        console.log('%c XXXXXXXXXXXXXXXXXXX '+ question +' != '+response+' XXXXXXXXXXXXXXXXXXXXX', 'background: #FF0000; color: #ffffff');
        console.log(response, 'is incorrect, try again');
        promptUser(question, answer);
    }

    return count < numOfQuestions;
}

function makeQuestionString(qArr){
    let qString = '';
    const len = qArr.length;
    for(let q = 0; q < len; q++){
        qString = qString + qArr[q];
        if(q !== (len - 1)){
            qString= qString + " + ";
        }
    }
    return qString;
}
function CartridgeMaker(level, phase, qr, ar, stream, nickname){
    return {
        level: level,
        phase: phase, 
        qr: qr,
        ar: ar, 
        stream: stream,
        nickname: nickname
    }
}

var lvl_01_phase_01 = new CartridgeMaker(1, 1, [0,9],[0,18], 2,'sheltered add mode');

function testLimits(ansArr, limits){
    let lower = limits[0];
    let upper = limits[1];
    let sum = ansArr.reduce(function(a, b){
        return a + b;
    }, 0);

    return {
        qString: makeQuestionString(ansArr),
        status : lower < sum && sum < upper, 
        answer: sum
    }
}

function numberMaker (minMax){
    return Math.floor(Math.random() * (minMax[1] - minMax[0] + 1) ) + minMax[0];
}

function askQuestion(qLimits, aLimits, noOfQues){
    let questionArr = [];
    for (let i = 0; i < noOfQues; i++){
        questionArr.push(numberMaker(qLimits));
    }
    let result = testLimits(questionArr, aLimits);
    
    if (result.status){
        return {
            question: result.qString,
            qArr:   questionArr,
            answer: result.answer
        }
    } else {
        askQuestion(qLimits, aLimits, noOfQues);
    }
}

function mathesize(cart){
    
    let ask;
    const {level, phase, qr, ar, stream, nickname} = cart;

       

    ask = askQuestion(qr, ar, 2);
    let myVar  = promptUser(ask.question, ask.answer);
       
        if (myVar){
            mathesize(cart);
        }
    
}


function run(){
    clear();
    let start = new Date().getTime();
    mathesize(lvl_01_phase_01);
    let end = new Date().getTime();
    
    let finale = moment.duration(end - start).seconds();

    console.log('it took you '+ finale+ ' sec');

    count = 0;
}








