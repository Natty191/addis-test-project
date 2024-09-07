const mongoose = require("mongoose");
const song = require("../models/song");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // await song.deleteMany();
    // await song.create([
    //   {
    //     title: "Blinding Lights",
    //     artist: "The Weeknd",
    //     album: "After Hours",
    //     genre: "Synthwave",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?synthwave",
    //   },
    //   {
    //     title: "Shape of You",
    //     artist: "Ed Sheeran",
    //     album: "÷ (Divide)",
    //     genre: "Pop",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?pop",
    //   },
    //   {
    //     title: "Levitating",
    //     artist: "Dua Lipa",
    //     album: "Future Nostalgia",
    //     genre: "Pop",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?pop",
    //   },
    //   {
    //     title: "Rolling in the Deep",
    //     artist: "Adele",
    //     album: "21",
    //     genre: "Pop",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?soul",
    //   },
    //   {
    //     title: "Uptown Funk",
    //     artist: "Mark Ronson ft. Bruno Mars",
    //     album: "Uptown Special",
    //     genre: "Funk",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?funk",
    //   },
    //   {
    //     title: "Smells Like Teen Spirit",
    //     artist: "Nirvana",
    //     album: "Nevermind",
    //     genre: "Grunge",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?grunge",
    //   },
    //   {
    //     title: "Billie Jean",
    //     artist: "Michael Jackson",
    //     album: "Thriller",
    //     genre: "Pop",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?pop",
    //   },
    //   {
    //     title: "Hotel California",
    //     artist: "Eagles",
    //     album: "Hotel California",
    //     genre: "Rock",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?rock",
    //   },
    //   {
    //     title: "Hallelujah",
    //     artist: "Leonard Cohen",
    //     album: "Various Positions",
    //     genre: "Folk",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?folk",
    //   },
    //   {
    //     title: "Imagine",
    //     artist: "John Lennon",
    //     album: "Imagine",
    //     genre: "Rock",
    //     coverUrl: "https://source.unsplash.com/random/800x600/?rock",
    //   },
    // ]);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
