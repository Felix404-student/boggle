# Boggle
Boggle app using Javascript, HTML, Python, Flask server

<h1>Usage</h1>

<p>Download files, then navigate to the folder in Terminal</p>

<p>Run the following commands:</p>
  
<ul class="simple">
    <li>python3 -m venv venv</li>
    <li>source venv/bin/activate</li>
    <li>pip3 install flask</li>
    <li>flask run</li>
</ul>

<p>Open a web browser and navgiate to http://localhost:5000/</p>

<p>You can enter words by typing or clicking the letters on the board</p>

<h1>Flask Boggle</h1>

<p>In this exercise, you plan &amp; help code a Boggle game in Javascript and Python.</p>
<div class="section" id="the-game">
<h2>The Game</h2>
<p>The goal of the game is to get the highest point total. To gain points, players
create words from a random assortment of letters in a 5x5 grid. We will be
providing the functionality to generate the grid.</p>
<p>Words can be created from adjacent letters – that is, letters which are
horizontal or vertical neighbors of each other as well as diagonals.  The
letters must connect to each other in the proper sequence to spell the word
correctly. This means that the next letter in the word can be above, below,
left, or right of the previous letter in the word (excluding any letters
previously used to construct the word). We will also be providing functionality
to determine if a word can be constructed from a boggle board.</p>
<div class="admonition warning">
<p>Writing Tests</p>
<p class="last">A main focus of this exercise is on testing Flask. Make sure you <strong>write tests for all views  you add to app.py</strong>.</p>
</div>
</div>
<div class="section" id="step-one-planning-and-reading-code">
<h2>Step One: Planning and Reading Code</h2>
<p><strong>Before looking at our code</strong></p>
<ul class="simple">
<li>Take a look at the first four functions in the <cite>boggle.py</cite> file.  Don’t worry about the <cite>find</cite> and <cite>find_from</cite> functions. You will be using them, but you don’t need to understand in depth what they do!</li>
<li>Take a look at the <cite>app.py</cite> file and you will notice there is no Flask related code. Add some! As usual, this is where your routing logic should go.</li>
<li>For your CSS and JavaScript, make sure you have a <cite>static</cite> folder, and make sure to create a separate file for your tests.</li>
</ul>
</div>
<div class="section" id="step-two-displaying-the-board">
<h2>Step Two: Displaying the Board</h2>
<ul class="simple">
<li>The first thing you need to do is display the board in a Jinja template.<ul>
<li>You will be generating a board on the backend using a function from the <cite>boggle.py</cite> file and sending that to your Jinja template.</li>
<li>Using Jinja, display the board on the page.</li>
</ul>
</li>
<li>Since you will also be using this board in other routes, make sure to place it in the session.</li>
<li>Once you have displayed the board, add a form that allows a user to submit a guess.</li>
</ul>
</div>
<div class="section" id="step-three-checking-for-a-valid-word">
<h2>Step Three: Checking for a Valid Word</h2>
<ul class="simple">
<li>Now that you have a form built: when the user submits the form, send the guess to your server.<ul>
<li>The page should not refresh when the user submits the form: this means you’ll have to make an HTTP request <strong>without</strong> refreshing the page—you can use AJAX to do that!</li>
<li>Make sure you include axios so that you can easily make AJAX requests.</li>
<li>Using jQuery, take the form value and using axios, make an AJAX request to send it to the server.</li>
<li>On the server, take the form value and check if it is a valid word in the dictionary using the <cite>words</cite> variable in your <cite>app.py</cite>.</li>
<li>Next, make sure that the word is valid on the board using the <cite>check_valid_word</cite> function from the <cite>boggle.py</cite> file.</li>
<li>Since you made an AJAX request to your server, you will need to respond with JSON using the <cite>jsonify</cite> function from Flask.</li>
<li>Send a JSON response which contains either a dictionary of <cite>{“result”: “ok”}</cite>, <cite>{“result”: “not-on-board”}</cite>, or <cite>{“result”: “not-a-word”}</cite>, so the front-end can provide slightly different messages depending if the word is valid or not.</li>
</ul>
</li>
<li>On the front-end, display the response from the backend to notify the user if the word is valid and exists on the board, if the word is invalid, or if the word does not exist at all.</li>
</ul>
</div>
<div class="section" id="step-four-posting-a-score">
<h2>Step Four: Posting a Score</h2>
<ul class="simple">
<li>Now that you are checking to see if a word is valid, let’s start keeping score! The score for a word is equal to its length. If a valid word is guessed, add its score to the total and make sure to display the current score as it changes.</li>
<li>You can store the score on the front-end for now: it does not need to persist.</li>
</ul>
</div>
<div class="section" id="step-five-adding-a-timer">
<h2>Step Five: Adding a timer</h2>
<p>Instead of letting the user guess for an infinite amount of time, ensure that a game can only be played for 60 seconds. Once 60 seconds has passed, disable any future guesses.</p>
</div>
<div class="section" id="step-six-more-statistics">
<h2>Step Six: More statistics!</h2>
<p>Now that you have a functional game, let’s keep track of how many times the user has played as well as their highest score so far. When the game ends, send an AJAX request to the server with the score you have stored on the front-end and increment the number of times you have played on the backend.</p>
<p>Since you will be sending this data as JSON when you make an axios request, you will see this data come in your Flask app inside of <cite>request.json</cite> <em>not</em> <cite>request.form</cite>. Use pdb or IPython to set a breakpoint and see what <cite>request.json</cite> looks like, it is <em>not</em> the same data structure as <cite>request.form</cite>.</p>
</div>
<div class="section" id="step-seven-refactoring">
<h2>Step Seven: Refactoring</h2>
<p>Take a look at your code and see if there are opportunities to refactor!</p>
<ul class="simple">
<li>If you have not already, can you design your front-end in an Object Oriented way?</li>
<li>Do your view functions have docstrings that describe what they are doing?</li>
<li>Are you handling duplicate words? Make sure if you submit the same word, it does not count twice.</li>
</ul>
</div>
</div>
