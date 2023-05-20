# Comping Machine

Comping Machine it's a music sequencer which main purpose is to provide customizable and super-easy-to-make backing tracks for musicians, producers or music enthusiasts.

It combines a drum machine with a chord generator sequencer and currently, its soundbank includes: 808 Drumkit and an Acoustic Drumkit for the drums, three different synthesizers and 2 piano sounds for the pad. But it's constantly expanding.

Sessions can be stored, updated or deleted. Because the app does not store audio files but instead the configuration of the machine itself, the user disposes of a large storage capacity which reinforces the idea behind the project: a straight forward way to make background music that allows users to improvise, practice or develop musical ideas right away.

## Getting started

In order to run the app, inside the **fullstack** folder you'll need to:

- Install the requierd dependencies:

```bash
npm install
```

- Start the app, by default it'll run on port 3000:

```bash
npm run dev
```

This is <u>already enough</u> to open the app in your browser and make music with it, you can build your track and experiment with the different sounds.

If you wish to save your sessions, feel free to contact me with a DM and share your email, (preferibly a google acount), so that you can register into the app using google authentication (NextAuth) and use the storage functionalites for 7 days. Before the actual deployment of the app this is the protocol to follow.

## Tech Stack

- Next.js
  
- MongoDB and Prisma
  
- Other dependencies:
  
  - NextAuth
    
  - Web Audio API through tone.js and howler.js
    
  - Tailwind
    

## Author

Paola Patiño - [Github](https://github.com/paola-pc) - [LinkedIn](https://www.linkedin.com/in/paola-patino/)
