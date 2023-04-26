Hello!

Thanks for choosing my app. I feel glattered you did.
Feel free to reach if you have questions! 
A couple of notes:
  - I plan to change the audio files, to make sure they all have the same percieved level (volume) and a similar equalization. So there's a 
    chance that I will be adding them to the repo if I have time and energy during this weekend.
  - I apologize deeply for the naming madness of the props of my components.
  - Next.js uses express, so, as you'll fastly realize, the syntax to manage req and res is express.
  - I'm not really using serverless rendering, the 'controllers' to fetch data form the DB are located in the src/pages/api folder.
  - I use a lite global state manager app called zustand. Super useful for plain data. If I had had more time, I'm sure I could have
    used it to 'move' references from one component to the other in a better say. 
      - And as we are talking about it, I wanted to use redux but it was kind of working so, I didn't. But again, I'm sure it can make things
        easier.
  - Got a couple of custum hooks in the folder Hooks.
  - If you got an error related to the Buffer, it is node complaining because Buffer does not exist in the node enviroment, it exists only in 
    the browser. It shouldn't break the app, but you'll get error sometimes when reloading or changing of chords too fast. 
    To get rid of it you can wrap all the code that uses Howler.js and Tone.js in the body of an if statement like this:
      if (typeof AudioBuffer !== 'undefined') { the code that should run in the browser enviroment}
