import React from "react";
import './quote.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as brands from "@fortawesome/free-brands-svg-icons";

const quotes = [
  {quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.', author: '- Robert Frost'}, 
  {quote: 'Everything has beauty, but not everyone can see.', author: '- Confucius'},
  {quote: 'You can never cross the ocean until you have the courage to lose sight of the shore.', author: '- Christopher Columbus'},
  {quote: 'Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.', author: '- Booker T. Washington'},
  {quote: 'Your time is limited, so don’t waste it living someone else’s life.', author: '- Steve Jobs'},
  {quote: 'Every child is an artist. The problem is how to remain an artist once he grows up.', author: '- Pablo Picasso'},
  {quote: 'If you want your children to turn out well, spend twice as much time with them, and half as much money.', author: '- Abigail Van Buren'},
  {quote: 'It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.', author: '- Mae Jemison'},
  {quote: 'You miss 100% of the shots you don’t take.', author: '- Wayne Gretzky'},
  {quote: 'I didn’t fail the test. I just found 100 ways to do it wrong.', author: '- Benjamin Franklin'},
  {quote: 'When I let go of what I am, I become what I might be.', author: '- Lao Tzu'},
  {quote: 'Life shrinks or expands in proportion to one’s courage.', author: '- Anais Nin'},
  {quote: 'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.', author: '- Plato'},
  {quote: 'It is never too late to be what you might have been.', author: '- George Eliot'},
  {quote: 'If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.', author: '- Oprah Winfrey'},
  {quote: 'How wonderful it is that nobody need wait a single moment before starting to improve the world.', author: '- Anne Frank'},
  {quote: 'The most difficult thing is the decision to act, the rest is merely tenacity.', author: '- Amelia Earhart'},
  {quote: 'In order to succeed, your desire for success should be greater than your fear of failure.', author: '- Bill Cosby'},
  {quote: 'I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.', author: '- Maya Angelou'},
  {quote: 'Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.', author: '- Booker T. Washington'},
  {quote: 'Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover.', author: '- Mark Twain'},
];

const colors = [
  '#a74343',
  '#b95e5e',
  '#751d1d',
  '#ff0000',
  '#ff5e00',
  '#b35f2e',
  '#8b3300',
  '#6fc400',
  '#00a500',
  '#00ffc8',
  '#368d7a',
  '#00c6d4',
  '#0051ff',
  '#193674',
  '#463574',
  '#c35ad8',
  '#b100d4',
  '#d400b1',
  '#b3a41e'
];

export default class QuoteMachine extends React.Component { 
  #previousRanQuote;
  #previousRanColor;
 
  constructor(props) {
    super(props);
    this.state = {     
      current: {quote: '', author: ''},
      color: '#a74343',
      opacity: 1
    }
    this.handleClick = this.handleClick.bind(this);
    this.loadCurrent = this.loadCurrent.bind(this);
    this.getRandom = this.getRandom.bind(this);
  }
  
  UNSAFE_componentWillMount() {
    //this first time de component is mounted we load a random quote
    this.loadCurrent(0);
    }

  handleClick() {
  this.loadCurrent();
  }

  loadCurrent(delay = 1000) {
    const [quote, color] = this.getRandom();

    this.setState(() => {
      return {opacity: 0};
    });

    setTimeout(() => {
      this.setState({current: quote, color: color, opacity: 1});
    }, delay);
    /* When the component is render in Load current I set te visibility to 0, and then I shall
  run this function after a delay I change the state to opcity 1 again and with the new note and colors
  trigger a rerender and show the new note with a nicely transitioning effect */
  }
  
  getRandom(){
    const total = quotes.length;    
    const totalColors = colors.length;
    const random = Math.floor(Math.random() * total);
    const randomColor = Math.floor(Math.random() * totalColors);       
    const currentQuote = quotes[random];
    const currentColor = colors[randomColor];

    if(random === this.#previousRanQuote || randomColor === this.#previousRanColor) {
      /*Prevent from getting the same previous either color or the quote*/
    this.#previousRanQuote = random;
    this.#previousRanColor = randomColor;
    this.getRandom(); 
    }    

    return [currentQuote, currentColor];    
  }
  


  render() {  
    document.body.style.backgroundColor= this.state.color;
    const styleParagraph = {color: this.state.color, opacity: this.state.opacity};
    console.log(styleParagraph);
    const intentForTweet = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.state.current.quote}.${this.state.current.author}`;
    const intentTumbler = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${this.state.current.author}&content=${this.state.current.quote}.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`


    return (
      <div className="wrapper">
      <section id="quote-box" className="quote-container">
        <p id="text" className='paragraph' style={styleParagraph}><i className="fa-solid fa-quote-left"></i>{this.state.current.quote}</p>        
        <p id="author" className='paragraph author' style={styleParagraph}>{this.state.current.author}</p>
        <div className="buttons-wrapper">
          <div>
            <a id="tweet-quote"
             href={intentForTweet}
             style={{backgroundColor: this.state.color}}
             target="_top"
             title="Tweet this quote">
              <FontAwesomeIcon icon={brands.faTwitter} />
            </a>
            <a
              href={intentTumbler} 
              style={{backgroundColor: this.state.color}}
              target="_blank"
              rel="noopener noreferrer"
              >            
                <FontAwesomeIcon icon={brands.faTumblr} />
            </a>
          </div>
            <button id="new-quote" className='next-button' style={{backgroundColor: this.state.color}} onClick={this.handleClick}>Next Quote</button>
        </div>

      </section>
      <p className="footer">By 
        <a
          href="https://github.com/LuisDavidRodriguez"
          target="_blank"
          rel='noopener noreferrer'
          >
            Luis David R.
        </a>
           Using <strong>React</strong> -Original design by
        <a
        href="https://codepen.io/hezag/"
        target="_blank"
        rel='noopener noreferrer'
        >
          hezang
        </a>
      </p>       
     </div>
    );
  }
}


