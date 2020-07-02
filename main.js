'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
/*this function takes in the startStack name and endStack name, and moves the top piece 
from the corresponding starting stack to the corresponding ending stack*/
const movePiece = (startStack, endStack) => {
  // Your code here
  let moveStack = stacks[startStack]
  let twoStack = stacks[endStack]
  let piece = moveStack.pop(); 
  console.log(piece)

}

/*This function takes in the start stack name, and end stack name,
 and returns true only if the move is a legal and valid move.
 Otherwise it returns false*/
const isLegal = (startStack, endStack) => {
  // Your code here
  let moveStack = stacks[startStack] // stacks a
  let twoStack = stacks[endStack] //stack b
  let moveStackPiece = moveStack[moveStack.length - 1] 
  let twoStackPiece = twoStack[twoStack.length -1] 
  console.log(twoStackPiece,"twostackpiece")
  if(moveStackPiece < twoStackPiece || twoStackPiece == undefined){
    return true
  }
  else{
    return false
  }
}

/*The function returns true, if the board is in a "winning state", otherwise return false
winnings state means: you are restacked on either stacks b or c, biggest to smallest*/
const checkForWin = () => {
  // Your code here
  if(stacks.b.length === 4){
    return true;
  }
  else{
    return false;
  }
}

/*This function should take in 2 inputs, the start stack and end stack and process that turn for the player*/
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)){
    movePiece(startStack, endStack);
  }
}

const getPrompt = () => {
  // first thing is print out the board
  printStacks();

  //it asks the user for the starting stack,
  rl.question('start stack: ', (startStack) => {
    // once the user enters,  it ask for the ending stack
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

if (typeof describe === 'function') {
  console.log(" ---------->>>>>>>>>> IN testing MODE");
  describe("#Testing if move works correctly", function(){
      it (" moving to an empty slot is valid", function(){
          //setup your pre conditions, or starting point
          stacks = {
              a: [4,3,2,1],
              b: [],
              c: []
          };
          movePiece('a','b');

          //verify the results
          let expectedSizeB = 1;
          let actualSizeB = stacks['b'].length;
          assert.equal(actualSizeB, expectedSizeB);
          let expectedSizeA = 3;
          let actualSizeA = stacks['a'].length;
          assert.equal(actualSizeA, expectedSizeA);
      });
  });

  describe("# what are you testing", function() {
      it ("legal move, this should work", function() {
          //setup your world
          stacks = {
            a: [4,3,2,1],
            b: [],
            c: []
          };
          //call the code you are testing
          assert.equal(isLegal('a','c'), true);
          //verify your results (using assest.equals, ...)
      });
      it ("illegal move, should not work", function() {
        //setup your world
        stacks = {
          a: [4,3,2],
          b: [1],
          c: []
        };
        //call the code you are testing
        assert.equal(isLegal('a','b'), false);
        //verify your results (using assest.equals, ...)
      });
  });
    describe("# what are you testing", function() {
      it ("check for win", function() {
          //setup your world
          stacks = {
            a: [],
            b: [4,3,2,1],
            c: []
          };
          assert.equal(checkForWin(), true);
          //call the code you are testing
          //verify your results (using assest.equals, ...)
          stacks = {
            a: [1],
            b: [4,3,2],
            c: []
          };
          assert.equal(checkForWin(), false);
      });
    });

}else {
    console.log(" ----------->>>>>>> Playing the game");
    getPrompt();
} 
