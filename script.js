"use strict";

// Declare Variables
const inputTitle = document.querySelector(".title-input");
const negativeCount = document.querySelector(".negative-count");
const positiveCount = document.querySelector(".positive-count");
const saveBtn = document.querySelector(".save-btn");
const previousRecord = document.querySelector(".records");
const inputPrompt = document.querySelector(".input-prompt");
const displayTitle = document.querySelector(".title-wrap");
const editBtn = document.querySelector(".btn-edit");
const resetBtn = document.querySelector(".btn-reset");
const counter = document.querySelector(".count-value");
const countTitle = document.querySelector(".count-title");

let count = 0;

// Parent class
class justCountIt {
  constructor() {
    this._title = inputTitle.value;
    counter.textContent = count;
  }

  // prompt user to input count title: returns a boolean
  promptUser() {
    if (inputTitle.value === "") {
      inputPrompt.classList.remove("hidden");
      return false;
    }
    // set user input as count title
    if (inputTitle.value !== "") {
      inputPrompt.classList.add("hidden");
      this._title = inputTitle.value;
      countTitle.textContent = this._title;
      return true;
    }
  }

  //   func to display user input
  showTitle() {
    inputTitle.classList.add("hidden");
    displayTitle.classList.remove("hidden");
    counter.textContent = count;
  }
}

// Child class
// When user increase count
class startPositiveCount extends justCountIt {
  constructor() {
    super();

    // event handling
    positiveCount.addEventListener("click", this.increaseCount.bind(this));
  }

  //  increase count value and display user input
  increaseCount() {
    if (this.promptUser()) {
      count++;
      this.showTitle();
    }
  }
}

// Child class
// When user decrease count
class startNegativeCount extends justCountIt {
  constructor() {
    super();

    // event handling
    negativeCount.addEventListener("click", this.decreaseCount.bind(this));
  }

  //   decrease count value and display user input
  decreaseCount() {
    if (this.promptUser()) {
      if (count === 0) return;
      count--;
      this.showTitle();
    }
  }
}

// APP ARCHITECTURE
class App {
  constructor() {
    // create instance of needed classes
    const decrease = new startNegativeCount();
    const increase = new startPositiveCount();

    // listen for "Enter" key press
    inputTitle.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        if (inputTitle.value === "") {
          inputPrompt.classList.remove("hidden");
          return;
        }
        inputPrompt.classList.add("hidden");

        this._toggleDisplay();
        counter.textContent = count;
        countTitle.textContent = inputTitle.value;
      }
    });

    // event handling
    saveBtn.addEventListener("click", this._save.bind(this));
    editBtn.addEventListener("click", this._edit.bind(this));
    resetBtn.addEventListener("click", this._reset);
  }

  // METHODS
  _toggleDisplay() {
    displayTitle.classList.toggle("hidden");
    inputTitle.classList.toggle("hidden");
  }

  _save() {
    if (count === 0) return;
    previousRecord.textContent = `${countTitle.textContent}: ${count}`;
    this._reset();
  }

  _edit() {
    this._toggleDisplay();
  }

  _reset() {
    count = 0;
    counter.textContent = count;
  }
}

// Run the App
const app = new App();
