import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './App.css';

document.body.style = 'background: black;';

// Main component which contains state
class RandomStarWarsQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes:
      [
        {quote: "Help me, Obi-Wan Kenobi. You’re my only hope.", 
         author: "Leia Organa",
         film: "A New Hope"},
        {quote: "I find your lack of faith disturbing.", 
         author: "Darth Vader",
         film: "A New Hope"},
        {quote: "It’s the ship that made the Kessel run in less than twelve parsecs. I’ve outrun Imperial starships. Not the local bulk cruisers, mind you. I’m talking about the big Corellian ships, now. She’s fast enough for you, old man.", 
         author: "Han Solo",
         film: "A New Hope"},
        {quote: "The Force will be with you. Always.", 
         author: "Obi-Wan Kenobi",
         film: "A New Hope"},
         {quote: "Why, you stuck-up, half-witted, scruffy-looking nerf herder!", 
         author: "Leia Organa",
         film: "The Empire strikes back"},
         {quote: "Never tell me the odds!", 
         author: "Han Solo",
         film: "The Empire strikes back"},
         {quote: "Do. Or do not. There is no try.", 
         author: "Yoda",
         film: "The Empire strikes back"},
         {quote: "No. I am your father.", 
         author: "Darth Vader",
         film: "The Empire strikes back"},
      ],
      // Current quote to show is held here
      quoteToRender: {},
      // Twitter href link
      link: ''
    };

    // Binding
    this.getQuote = this.getQuote.bind(this);
  }
  
  // Function which returns twitter href including current quote data as passed by calling function
  // This has no access to state and simply returns the href to the calling function
  makeHrefLink(quote) {
    // regex to replace whitespace
    const regex = /\s/g;
    return 'https://twitter.com/intent/tweet?text='
            + '"' + quote["quote"].replace(regex, "%20")
            + '" ' + quote['author'].replace(regex, "%20")
            + '. ' + quote['film'].replace(regex, "%20") + '.'
  }

  // Function to randomly choose which quote to show, ths also removes the used quote from state and 
  // resets the quote list when it is empty.
  getQuote() {
    switch(this.state.quotes.length) {
      // Check if we are on the final quote in the state list
      case 1:
        this.setState({
          // The final quote is set as the the quote to render
          quoteToRender: this.state.quotes[0],
          // Twitter link generated
          link: this.makeHrefLink(this.state.quotes[0]),
          quotes:      
          [
            {quote: "Help me, Obi-Wan Kenobi. You’re my only hope.", 
             author: "Leia Organa",
             film: "A New Hope"},
            {quote: "I find your lack of faith disturbing.", 
             author: "Darth Vader",
             film: "A New Hope"},
            {quote: "It’s the ship that made the Kessel run in less than twelve parsecs. I’ve outrun Imperial starships. Not the local bulk cruisers, mind you. I’m talking about the big Corellian ships, now. She’s fast enough for you, old man.", 
             author: "Han Solo",
             film: "A New Hope"},
            {quote: "The Force will be with you. Always.", 
             author: "Obi-Wan Kenobi",
             film: "A New Hope"},
             {quote: "Why, you stuck-up, half-witted, scruffy-looking nerf herder!", 
             author: "Leia Organa",
             film: "The Empire strikes back"},
             {quote: "Never tell me the odds!", 
             author: "Han Solo",
             film: "The Empire strikes back"},
             {quote: "Do. Or do not. There is no try.", 
             author: "Yoda",
             film: "The Empire strikes back"},
             {quote: "No. I am your father.", 
             author: "Darth Vader",
             film: "The Empire strikes back"},
          ],
        });
        break;
      default:
        // Temp copy of state quotes
        let stateQuotes = [...this.state.quotes];
        // Quote randomly chosen
        const randIndex = Math.floor(Math.random() * this.state.quotes.length);
        // Current quote spliced from temp quotes
        const nextQuote = stateQuotes.splice(randIndex, 1)[0];      
        // Updates to state
        this.setState({
          quotes: stateQuotes,
          quoteToRender: nextQuote,
          link: this.makeHrefLink(nextQuote)
        });
      }
    }

  // Call for to generate random quote on component load
  componentDidMount() {
    this.getQuote();
  }
  
  render() {    
    return (
        // React-Bootstrap jumbotron component
        <Jumbotron>
          {/* Random quote, author and film title interpolated into HTML */}
          <h1 id='text'>"{this.state.quoteToRender['quote']}"</h1>
          <h4 id='author'>- {this.state.quoteToRender['author']}, {this.state.quoteToRender['film']}</h4>
          <br />
          {/* React-Bootstrap button component, the 'onClick' event handler calls the 'getQuote' method to generate next 
              quote and twitter link */}
          <Button variant="dark" id="new-quote" onClick={this.getQuote}>Next quote!</Button>
          <br />
          <Button variant="dark" 
            target="_blank"
            id="tweet-quote"
            className="twitterBtn twitter-share-button bi bi-twitter"
            href={this.state.link}
            data-size="large"
            >
          </Button>
        </Jumbotron>
      );
    }
  }


const App = () => (
  <Container className="p-3"  id="quote-box">
      <RandomStarWarsQuote />
  </Container>
);

export default App;



 