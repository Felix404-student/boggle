/**
 * Boggle Game Javascript file to interact with DOM elements
 */

class BoggleGame {

  // Start a new game at this DOM element ID
  constructor(boardId, secs = 180) {
    this.secs = secs; // game length
    this.showTimer();

    this.score = 0;
    this.words = new Set();
    this.board = $("#" + boardId);

    // Every 1 second, "tick"
    this.timer = setInterval(this.tick.bind(this), 1000);

    $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    $("td", this.board).on("click", this.handleClick.bind(this));
    $("#reset", this.board).on("submit", this.handleReset.bind(this));
  }

  // Show word in list of words
  showWord(word) {
    $(".words", this.board).append($("<li>", { text: word }));
  }

  // Show score in html
  showScore() {
    $(".score", this.board).text(this.score);
  }

  // Show a status message
  showMessage(msg, cls) {
    $(".msg", this.board)
      .text(msg)
      .removeClass()
      .addClass(`msg ${cls}`);
      $(".msg", this.board).show();

      setTimeout(() => {
        $(".msg", this.board).fadeOut();
      }, "2500");
  }

  // Handle submission of word: if unique and valid, score & show
  async handleSubmit(evt) {
    evt.preventDefault();
    const $word = $(".word", this.board);

    let word = $word.val();
    if (!word) return;

    if (this.words.has(word)) {
      this.showMessage(`Already found ${word}`, "err");
      return;
    }

    // Check server for validity
    const resp = await axios.get("/guess", { params: { word: word }});
    if (resp.data.result === "not-word") {
      this.showMessage(`${word} is not a valid English word`, "err");
    } else if (resp.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`, "err");
    } else {
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`, "ok");
    }

    $word.val("").focus();
  }

  // Update timer in DOM
  showTimer() {
    let minutes = Math.floor(this.secs / 60);
    let seconds = this.secs % 60;

    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }

    $(".timer", this.board).text(minutes + ':' + seconds);
  }

  // Tick: handle a second passing in game
  async tick() {
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
      clearInterval(this.timer);
      await this.scoreGame();
    }
  }

  // Enable the user to type letters by clicking on them on the board
  async handleClick(evt) {
    let text = $(".word", this.board).val()
    text += evt.target.innerText.toLowerCase();

    $(".word", this.board).val(text).focus();
  }

  // Reset button reloads the page
  async handleReset(evt) {
    location.reload();
  }

  // End of game: score and update message.\
  async scoreGame() {
    $(".add-word", this.board).hide();
    const resp = await axios.post("/post-score", { score: this.score });
    if (resp.data.brokeRecord) {
      this.showMessage(`New record: ${this.score}`, "ok");
    } else {
      this.showMessage(`Final score: ${this.score}`, "ok");
    }
    $("#reset", this.board).show();
  }
}
