'use strict';

const assert = require('assert');
const { truncateSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
// This function passess in SS and ES to play the game by moving each pieces 
const movePiece = (startStack, endStack) => {
  // Your code here


console.log("START*", stacks[startStack])
console.log("END*", stacks[endStack])

// set avarible to move the end pieces .pop() method 
const piece = stacks[startStack].pop()
// popped the end pieces off and  pushed to the endstack 
stacks[endStack].push(piece) 
console.log("piece", piece)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
// if end stack is empty than can move or end stack is grater than start stack 
// if stacks endstack has no length and no value OR index of startstack length of the index - 1 is less than stack endstack length - 1 return true 
// if not return false 
if ((!stacks[endStack].length) || stacks[startStack][stacks[startStack].length - 1] < stacks[endStack][stacks[endStack].length - 1]) {
  return true;
} else {
  return false;
}
}

// What is a win in Towers of Hanoi? When should this function run?
// to win the game you move stack  a to b or c with the index of [4,3,2,1]
// pass in the function to tell the end users it's a win if the index of tower b and c is [4,3,2,1] YOU WON! 
const checkForWin = () => {
  // Your code here
  
if (stacks['b'].length == 4 || stacks['c'].length == 4) {
  console.log('YOU WON!');

  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
  return true;
} else {
  return false;
}


}
// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  // if the condition isLegal function and movePiece are met return true or if not return 'try again'
   if (isLegal(startStack, endStack)) {
     movePiece(startStack, endStack)
     checkForWin()
   } else {
     console.log('Try Again')
   }
   

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [], c: [1] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [], b: [4, 3, 2], c: [1] };
      assert.equal(checkForWin(), false);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, ], c: [2] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
