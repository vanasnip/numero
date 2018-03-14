
var prompt = require('prompt');

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



function makeQuestionString(qArr){
    let qString = '';
    const len = qArr.length;
    for(let q = 0; q < len; q++){
        qString = qString + qArr[q];
        if(q !== (len - 1)){
            qString= qString + " + ";
        }
    }
    return qString+' = ';
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



function mathesize(cart, numQuestions){
    let count = 0; 
    let initQ = 0;

    const {level, phase, qr, ar, stream, nickname} = cart;
    let ask = askQuestion(qr, ar, 2);

    process.stdin.on('readable', () => {

        if ( initQ === 0){
            process.stdout.write(`${ask.question} `); //initial question
            initQ++;
        }
        const answer = process.stdin.read();
        if (answer !== null) {
            let cleanAns = parseInt(answer.toString().slice(0, -1));
            if(cleanAns === ask.answer){
                count++;
                process.stdout.write(`${cleanAns} is correct!\n\n`);
                ask = askQuestion(qr, ar, numQuestions); // define new question
                process.stdout.write(`${ask.question} `);
                console.log('count ',count);
                if ( count === numQuestions) {
                    process.exit();
                }
                
            } else {
                process.stdout.write(`${cleanAns} is wrong! try again\n`);
                process.stdout.write(`${ask.question} `);
            }
            
        }
    });
    
    process.stdin.on('exit', () => {
        process.stdout.write('end\n');
    });
}

mathesize(lvl_01_phase_01, 2);





