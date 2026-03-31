const curatedMovies = [
  {
    title: "Spider-Man: Homecoming",
    poster: "https://image.tmdb.org/t/p/original/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    trailer: "https://www.youtube.com/embed/rk-dF1lIbIg",
    rating: 7.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action & Hype", "Mind-blowing Movies"],
    description:
      "Peter Parker balances high school life with becoming a local hero under Tony Stark's mentorship."
  },
  {
    title: "Spider-Man: Far From Home",
    poster: "https://image.tmdb.org/t/p/original/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    trailer: "https://www.youtube.com/embed/Nt9L1jCKGnE",
    rating: 7.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action & Hype", "Mind-blowing Movies"],
    description:
      "Peter's Europe trip turns into a mission when mysterious element attacks threaten cities."
  },
  {
    title: "Ant-Man",
    poster: "https://image.tmdb.org/t/p/original/rS97hUJ1otKTTripGwQ0ujbuIri.jpg",
    trailer: "https://www.youtube.com/embed/pWdKf3MneyI",
    rating: 7.3,
    category: "Marvel",
    moods: ["Action"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "A skilled thief becomes a tiny but powerful superhero in a high-stakes heist mission."
  },
  {
    title: "Ant-Man and the Wasp",
    poster: "https://image.tmdb.org/t/p/original/eivQmS3wqzqnQWILHLc4FsEfcXP.jpg",
    trailer: "https://www.youtube.com/embed/UUkn-enk2RU",
    rating: 7.0,
    category: "Marvel",
    moods: ["Action"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Scott teams with Hope van Dyne to uncover secrets from the quantum realm and rescue Janet."
  },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    poster: "https://image.tmdb.org/t/p/original/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    trailer: "https://www.youtube.com/embed/8YjFbMbfXaQ",
    rating: 7.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "A young warrior confronts his past and the power of the legendary Ten Rings."
  },
  {
    title: "The Avengers",
    poster: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
    rating: 8.0,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Earth's mightiest heroes unite to stop Loki and an alien invasion in New York."
  },
  {
    title: "Avengers: Age of Ultron",
    poster: "https://image.tmdb.org/t/p/original/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    trailer: "https://www.youtube.com/embed/tmeOjFno6Do",
    rating: 7.3,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "The Avengers face Ultron, an artificial intelligence bent on humanity's extinction."
  },
  {
    title: "Avengers: Infinity War",
    poster: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    trailer: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    rating: 8.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Top 10 Ranking", "Action & Hype"],
    description:
      "The Avengers and allies fight to stop Thanos from collecting all Infinity Stones."
  },
  {
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    rating: 8.4,
    category: "Marvel",
    moods: ["Action", "Emotional", "Mind-blowing"],
    tags: ["MCU Universe", "Top 10 Ranking", "Action & Hype"],
    description:
      "After devastating loss, the Avengers make one final attempt to restore the universe."
  },
  {
    title: "Iron Man",
    poster: "https://image.tmdb.org/t/p/original/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    trailer: "https://www.youtube.com/embed/8hYlB38asDY",
    rating: 7.9,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Top 10 Ranking"],
    description:
      "Tony Stark builds a high-tech armored suit and launches the Marvel cinematic era."
  },
  {
    title: "Doctor Strange",
    poster: "https://image.tmdb.org/t/p/original/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    trailer: "https://www.youtube.com/embed/HSzx-zryEgM",
    rating: 7.5,
    category: "Marvel",
    moods: ["Mind-blowing", "Action"],
    tags: ["MCU Universe", "Mind-blowing Movies"],
    description:
      "A brilliant surgeon discovers mystic arts and protects Earth from dark dimensions."
  },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    poster: "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    trailer: "https://www.youtube.com/embed/aWzlQ2N6qqg",
    rating: 6.9,
    category: "Marvel",
    moods: ["Mind-blowing", "Action"],
    tags: ["MCU Universe", "Mind-blowing Movies"],
    description:
      "Doctor Strange and allies traverse dangerous multiverses to confront a powerful threat."
  },
  {
    title: "Guardians of the Galaxy",
    poster: "https://image.tmdb.org/t/p/original/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    trailer: "https://www.youtube.com/embed/d96cjJhvlMA",
    rating: 8.0,
    category: "Marvel",
    moods: ["Action", "Emotional"],
    tags: ["MCU Universe", "Top 10 Ranking"],
    description:
      "A ragtag space team bands together to save the galaxy from cosmic destruction."
  },
  {
    title: "Guardians of the Galaxy Vol. 2",
    poster: "https://image.tmdb.org/t/p/original/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    trailer: "https://www.youtube.com/embed/dW1BIid8Osg",
    rating: 7.6,
    category: "Marvel",
    moods: ["Action", "Emotional"],
    tags: ["MCU Universe", "Top 10 Ranking"],
    description:
      "The Guardians uncover hidden truths about Peter Quill's origins while facing new dangers."
  },
  {
    title: "Thor: Ragnarok",
    poster: "https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
    trailer: "https://www.youtube.com/embed/ue80QwXMRHg",
    rating: 7.9,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Thor must escape Sakaar and stop Hela before Asgard is destroyed."
  },
  {
    title: "Thor: Love and Thunder",
    poster: "https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    trailer: "https://www.youtube.com/embed/Go8nTmfrQd8",
    rating: 6.2,
    category: "Marvel",
    moods: ["Action"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Thor reunites with old allies and faces a cosmic killer while discovering a new purpose."
  },
  {
    title: "Captain America: Civil War",
    poster: "https://image.tmdb.org/t/p/original/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    trailer: "https://www.youtube.com/embed/dKrVegVI0Us",
    rating: 7.8,
    category: "Marvel",
    moods: ["Action", "Emotional"],
    tags: ["MCU Universe", "Top 10 Ranking"],
    description:
      "Political pressure splits the Avengers, igniting a major clash between heroes."
  },
  {
    title: "Black Panther",
    poster: "https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    trailer: "https://www.youtube.com/embed/xjDjIWPwcPU",
    rating: 7.3,
    category: "Marvel",
    moods: ["Action", "Emotional"],
    tags: ["MCU Universe", "Top 10 Ranking"],
    description:
      "T'Challa returns to Wakanda to lead his nation and defend its future."
  },
  {
    title: "Black Widow",
    poster: "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    trailer: "https://www.youtube.com/embed/Fp9pNPdNwjI",
    rating: 6.7,
    category: "Marvel",
    moods: ["Action"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Natasha Romanoff confronts her past and unfinished secrets from her spy life."
  },
  {
    title: "Captain Marvel",
    poster: "https://image.tmdb.org/t/p/original/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
    trailer: "https://www.youtube.com/embed/Z1BCujX3pw8",
    rating: 6.8,
    category: "Marvel",
    moods: ["Action"],
    tags: ["MCU Universe", "Action & Hype"],
    description:
      "Carol Danvers becomes one of the universe's most powerful heroes in a galactic war."
  },
  {
    title: "Jawan",
    poster: "https://image.tmdb.org/t/p/original/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
    trailer: "https://www.youtube.com/embed/k8YiqM0Y-78",
    rating: 7.0,
    category: "Bollywood",
    moods: ["Action", "Emotional"],
    tags: ["Bollywood Hits", "Action & Hype", "Top 10 Ranking"],
    description:
      "A vigilante with a personal mission takes on corruption through daring operations."
  },
  {
    title: "Pathaan",
    poster: "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    trailer: "https://www.youtube.com/embed/vqu4z34wENw",
    rating: 6.0,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Bollywood Hits", "Action & Hype"],
    description:
      "An elite RAW agent returns to prevent a major threat to national security."
  },
  {
    title: "Animal",
    poster: "https://image.tmdb.org/t/p/original/rm8m8nYfD4I2QfFhE9hA6R4qB3h.jpg",
    trailer: "https://www.youtube.com/embed/uJMCNJP2ipI",
    rating: 6.2,
    category: "Bollywood",
    moods: ["Action", "Emotional"],
    tags: ["Bollywood Hits", "Action & Hype"],
    description:
      "A turbulent father-son bond spirals into violent conflict and high-stakes revenge."
  },
  {
    title: "Dunki",
    poster: "https://image.tmdb.org/t/p/original/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
    trailer: "https://www.youtube.com/embed/ACKQDAlAfFE",
    rating: 6.8,
    category: "Bollywood",
    moods: ["Emotional"],
    tags: ["Bollywood Hits", "Top 10 Ranking"],
    description:
      "A heartfelt story of friendship and migration dreams across borders."
  },
  {
    title: "Brahmāstra: Part One – Shiva",
    poster: "https://image.tmdb.org/t/p/original/x61qdvHIsr9U53FwoLVDQqAGur0.jpg",
    trailer: "https://www.youtube.com/embed/BUjXzrgntcY",
    rating: 5.6,
    category: "Bollywood",
    moods: ["Mind-blowing", "Action"],
    tags: ["Bollywood Hits", "Mind-blowing Movies"],
    description:
      "A young man discovers cosmic powers and his place in an ancient astraverse."
  },
  {
    title: "12th Fail",
    poster: "https://image.tmdb.org/t/p/original/6nTQp7jJbN2QWf9eKJeNEqXWiwx.jpg",
    trailer: "https://www.youtube.com/embed/WeMjo70nA0Y",
    rating: 8.8,
    category: "Bollywood",
    moods: ["Emotional"],
    tags: ["Bollywood Hits", "Top 10 Ranking"],
    description:
      "An inspiring true-story journey of resilience, education, and public service dreams."
  },
  {
    title: "Sardar Udham",
    poster: "https://image.tmdb.org/t/p/original/8OnqfWvM7F4eYzY1f3T5iAG2wE8.jpg",
    trailer: "https://www.youtube.com/embed/bLWuJxY7Y5I",
    rating: 8.4,
    category: "Bollywood",
    moods: ["Emotional", "Mind-blowing"],
    tags: ["Bollywood Hits", "Mind-blowing Movies"],
    description:
      "A deeply moving historical drama about sacrifice, justice, and remembrance."
  },
  {
    title: "Shershaah",
    poster: "https://image.tmdb.org/t/p/original/bv8f1VdAqQzK8h0pV3Y8W4x2f8i.jpg",
    trailer: "https://www.youtube.com/embed/Q0FTXnefVBA",
    rating: 8.3,
    category: "Bollywood",
    moods: ["Action", "Emotional"],
    tags: ["Bollywood Hits", "Top 10 Ranking"],
    description:
      "A stirring war biopic honoring the life and courage of Captain Vikram Batra."
  },
  {
    title: "Article 15",
    poster: "https://image.tmdb.org/t/p/original/2M2JxEv3rFf2W6P7v4Q1rM6Y7d8.jpg",
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
    rating: 8.1,
    category: "Bollywood",
    moods: ["Mind-blowing", "Emotional"],
    tags: ["Bollywood Hits", "Mind-blowing Movies"],
    description:
      "A principled officer investigates a disturbing case that reveals social injustice."
  },
  {
    title: "Andhadhun",
    poster: "https://image.tmdb.org/t/p/original/qfB6QNaCtmGDy9ujvBOUs7UaPx.jpg",
    trailer: "https://www.youtube.com/embed/2iVYI99VGaw",
    rating: 8.2,
    category: "Bollywood",
    moods: ["Mind-blowing"],
    tags: ["Bollywood Hits", "Mind-blowing Movies"],
    description:
      "A clever thriller where a pianist gets entangled in mystery and dangerous twists."
  },
  {
    title: "War",
    poster: "https://image.tmdb.org/t/p/original/4U4J9LQfD9YB4Y8s5I3gkJ2Y6vO.jpg",
    trailer: "https://www.youtube.com/embed/tQ0mzXRk-oM",
    rating: 6.5,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Bollywood Hits", "Action & Hype"],
    description:
      "An elite soldier tracks a rogue mentor in a globe-trotting action showdown."
  },
  {
    title: "Tiger 3",
    poster: "https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
    trailer: "https://www.youtube.com/embed/vEjTUDjjU6A",
    rating: 5.9,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Bollywood Hits", "Action & Hype"],
    description:
      "A spy fights to clear his name while protecting his family and country."
  },
  {
    title: "RRR",
    poster: "https://image.tmdb.org/t/p/original/lO5e4wZzP3qW1f6x8Q3G1R2Z4dY.jpg",
    trailer: "https://www.youtube.com/embed/GY4BgdUSpbE",
    rating: 7.8,
    category: "Bollywood",
    moods: ["Action", "Emotional", "Mind-blowing"],
    tags: ["Bollywood Hits", "Top 10 Ranking", "Action & Hype"],
    description:
      "Two revolutionaries forge a legendary friendship in an epic freedom-era saga."
  },
  {
    title: "KGF: Chapter 2",
    poster: "https://image.tmdb.org/t/p/original/khNv8hMri0f9LwN8O7aKJ1a7s2F.jpg",
    trailer: "https://www.youtube.com/embed/JKa05nyUmuQ",
    rating: 8.3,
    category: "Bollywood",
    moods: ["Action", "Mind-blowing"],
    tags: ["Bollywood Hits", "Top 10 Ranking", "Action & Hype"],
    description:
      "Rocky's empire grows while enemies and political forces rise against him."
  },
  {
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    rating: 8.8,
    category: "Hollywood",
    moods: ["Mind-blowing", "Action"],
    tags: ["Hollywood Classics", "Mind-blowing Movies", "Top 10 Ranking"],
    description:
      "A skilled extractor enters dreams to plant an idea in a target's subconscious."
  },
  {
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    rating: 8.7,
    category: "Hollywood",
    moods: ["Mind-blowing", "Emotional"],
    tags: ["Hollywood Classics", "Mind-blowing Movies", "Top 10 Ranking"],
    description:
      "Explorers travel through a wormhole in space to ensure humanity's survival."
  },
  {
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    rating: 9.0,
    category: "Hollywood",
    moods: ["Action", "Mind-blowing"],
    tags: ["Hollywood Classics", "Top 10 Ranking", "Action & Hype"],
    description:
      "Batman faces the Joker in a gripping battle that tests Gotham's moral limits."
  },
  {
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/original/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    trailer: "https://www.youtube.com/embed/qtRKdVHc-cE",
    rating: 8.8,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Hollywood Classics", "Mind-blowing Movies"],
    description:
      "A disillusioned man forms an underground club that evolves into something unexpected."
  },
  {
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    rating: 8.7,
    category: "Hollywood",
    moods: ["Mind-blowing", "Action"],
    tags: ["Hollywood Classics", "Mind-blowing Movies", "Top 10 Ranking"],
    description:
      "A hacker discovers reality is a simulation and joins a rebellion for freedom."
  },
  {
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
    rating: 9.3,
    category: "Hollywood",
    moods: ["Emotional"],
    tags: ["Hollywood Classics", "Top 10 Ranking"],
    description:
      "A timeless story of hope, friendship, and resilience inside prison walls."
  },
  {
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    trailer: "https://www.youtube.com/embed/bLvqoHBptjg",
    rating: 8.8,
    category: "Hollywood",
    moods: ["Emotional"],
    tags: ["Hollywood Classics", "Top 10 Ranking"],
    description:
      "A kind-hearted man unintentionally witnesses and influences pivotal moments in history."
  },
  {
    title: "The Pursuit of Happyness",
    poster: "https://image.tmdb.org/t/p/original/f6l9rghXnJf7Q9M8M8s0JvK7E7h.jpg",
    trailer: "https://www.youtube.com/embed/89Kq8SDyvfg",
    rating: 8.0,
    category: "Hollywood",
    moods: ["Emotional"],
    tags: ["Hollywood Classics"],
    description:
      "A struggling father fights adversity while striving to build a better future."
  },
  {
    title: "Good Will Hunting",
    poster: "https://image.tmdb.org/t/p/original/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg",
    trailer: "https://www.youtube.com/embed/PaZVjZEFkRs",
    rating: 8.3,
    category: "Hollywood",
    moods: ["Emotional"],
    tags: ["Hollywood Classics"],
    description:
      "A gifted young janitor discovers his potential through guidance and self-discovery."
  },
  {
    title: "The Green Mile",
    poster: "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    trailer: "https://www.youtube.com/embed/Ki4haFrqSrw",
    rating: 8.6,
    category: "Hollywood",
    moods: ["Emotional", "Mind-blowing"],
    tags: ["Hollywood Classics", "Top 10 Ranking"],
    description:
      "A prison guard witnesses extraordinary events on death row that challenge belief."
  },
  {
    title: "Mad Max: Fury Road",
    poster: "https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
    rating: 8.1,
    category: "Hollywood",
    moods: ["Action"],
    tags: ["Hollywood Classics", "Action & Hype"],
    description:
      "In a post-apocalyptic desert, rebels race for survival in relentless action."
  },
  {
    title: "John Wick",
    poster: "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    trailer: "https://www.youtube.com/embed/2AUmvWm5ZDQ",
    rating: 7.4,
    category: "Hollywood",
    moods: ["Action"],
    tags: ["Hollywood Classics", "Action & Hype"],
    description:
      "A retired hitman returns to the underworld in a stylish quest for justice."
  },
  {
    title: "Gladiator",
    poster: "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    trailer: "https://www.youtube.com/embed/owK1qxDselE",
    rating: 8.5,
    category: "Hollywood",
    moods: ["Action", "Emotional"],
    tags: ["Hollywood Classics", "Top 10 Ranking"],
    description:
      "A Roman general seeks honor and vengeance after betrayal by a corrupt emperor."
  },
  {
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    rating: 8.9,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Hollywood Classics", "Mind-blowing Movies"],
    description:
      "Interconnected stories of crime and consequence unfold with unforgettable style."
  },
  {
    title: "The Wolf of Wall Street",
    poster: "https://image.tmdb.org/t/p/original/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
    trailer: "https://www.youtube.com/embed/iszwuX1AK6A",
    rating: 8.2,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Hollywood Classics"],
    description:
      "A stockbroker rises rapidly through excess, ambition, and high-risk finance."
  },
  {
    title: "Se7en",
    poster: "https://image.tmdb.org/t/p/original/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    trailer: "https://www.youtube.com/embed/znmZoVkCjpI",
    rating: 8.6,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Hollywood Classics", "Mind-blowing Movies"],
    description:
      "Two detectives hunt a serial killer inspired by the seven deadly sins."
  },
  {
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
    rating: 8.5,
    category: "Hollywood",
    moods: ["Mind-blowing", "Emotional"],
    tags: ["Hollywood Classics", "Mind-blowing Movies", "Top 10 Ranking"],
    description:
      "A gripping social thriller where class divides lead to unexpected consequences."
  },
  {
    title: "Joker",
    poster: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
    rating: 8.4,
    category: "Hollywood",
    moods: ["Emotional", "Mind-blowing"],
    tags: ["Hollywood Classics", "Top 10 Ranking"],
    description:
      "A troubled comedian's descent reshapes Gotham in this powerful character study."
  }
];

const STORAGE_KEYS = {
  users: "primeStream.users",
  currentUser: "primeStream.currentUser",
  prefs: "primeStream.preferences",
  fallbackRecent: "primeStream.recentlyViewed.guest",
  fallbackContinue: "primeStream.continueWatching.guest"
};

const state = {
  view: "home",
  authMode: "login",
  heroMovie: null,
  pendingAction: null,
  hoverTimers: {},
  searchTimer: null
};

const el = {
  navTabs: document.getElementById("navTabs"),
  searchInput: document.getElementById("searchInput"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  profileBtn: document.getElementById("profileBtn"),
  profileMenu: document.getElementById("profileMenu"),
  profileName: document.getElementById("profileName"),
  mobileNavBtn: document.getElementById("mobileNavBtn"),
  heroBackdrop: document.getElementById("heroBackdrop"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroOverview: document.getElementById("heroOverview"),
  heroTrailerWrap: document.getElementById("heroTrailerWrap"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  moodButtons: Array.from(document.querySelectorAll("[data-mood]")),
  quickPlayBtn: document.getElementById("quickPlayBtn"),
  top10List: document.getElementById("top10List"),
  homeRows: document.getElementById("homeRows"),
  marvelGrid: document.getElementById("marvelGrid"),
  bollywoodGrid: document.getElementById("bollywoodGrid"),
  hollywoodGrid: document.getElementById("hollywoodGrid"),
  myListGrid: document.getElementById("myListGrid"),
  smartPicksGrid: document.getElementById("smartPicksGrid"),
  topLikedGrid: document.getElementById("topLikedGrid"),
  moodResultsGrid: document.getElementById("moodResultsGrid"),
  trailerModal: document.getElementById("trailerModal"),
  trailerFrame: document.getElementById("trailerFrame"),
  movieModal: document.getElementById("movieModal"),
  movieModalBody: document.getElementById("movieModalBody"),
  authModal: document.getElementById("authModal"),
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  nameFieldWrap: document.getElementById("nameFieldWrap"),
  confirmFieldWrap: document.getElementById("confirmFieldWrap"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authConfirm: document.getElementById("authConfirm"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  authSwitchBtn: document.getElementById("authSwitchBtn"),
  toastStack: document.getElementById("toastStack"),
  scrollTopBtn: document.getElementById("scrollTopBtn"),
  navbar: document.getElementById("navbar"),
  yearText: document.getElementById("yearText")
};

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  return getJSON(STORAGE_KEYS.users, []);
}

function setUsers(users) {
  setJSON(STORAGE_KEYS.users, users);
}

function getCurrentUser() {
  return getJSON(STORAGE_KEYS.currentUser, null);
}

function setCurrentUser(user) {
  if (user) {
    setJSON(STORAGE_KEYS.currentUser, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

function scopedKey(name) {
  const uid = getCurrentUser()?.id;
  return uid ? `primeStream.${name}.${uid}` : null;
}

function getScoped(name, fallback) {
  const key = scopedKey(name);
  if (key) {
    return getJSON(key, fallback);
  }
  const fallbackKey = name === "recent" ? STORAGE_KEYS.fallbackRecent : STORAGE_KEYS.fallbackContinue;
  return getJSON(fallbackKey, fallback);
}

function setScoped(name, value) {
  const key = scopedKey(name);
  if (key) {
    setJSON(key, value);
    return;
  }
  const fallbackKey = name === "recent" ? STORAGE_KEYS.fallbackRecent : STORAGE_KEYS.fallbackContinue;
  setJSON(fallbackKey, value);
}

function getWatchlist() {
  return getScoped("watchlist", []);
}

function setWatchlist(ids) {
  setScoped("watchlist", ids);
}

function getLikes() {
  return getScoped("likes", {});
}

function setLikes(map) {
  setScoped("likes", map);
}

function getRatings() {
  return getScoped("ratings", {});
}

function setRatings(map) {
  setScoped("ratings", map);
}

function getRecentlyViewed() {
  return getScoped("recent", []);
}

function setRecentlyViewed(ids) {
  setScoped("recent", ids.slice(0, 30));
}

function getContinueWatching() {
  return getScoped("continue", {});
}

function setContinueWatching(map) {
  setScoped("continue", map);
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  el.toastStack.appendChild(node);
  setTimeout(() => node.remove(), 2400);
}

function openModal(modal) {
  modal.classList.add("open");
}

function closeModal(modal) {
  modal.classList.remove("open");
  if (modal === el.trailerModal) {
    el.trailerFrame.src = "";
  }
}

function ensureAuth(action) {
  if (getCurrentUser()) {
    return true;
  }
  state.pendingAction = action;
  toast("Login required");
  openModal(el.authModal);
  return false;
}

function performPendingAction() {
  if (!state.pendingAction) {
    return;
  }
  const action = state.pendingAction;
  state.pendingAction = null;
  action();
}

function dedupeMovies(movies) {
  const seen = new Set();
  return movies.filter((movie) => {
    if (seen.has(movie.title)) {
      return false;
    }
    seen.add(movie.title);
    return true;
  });
}

const movies = dedupeMovies(curatedMovies);

function movieByTitle(title) {
  return movies.find((movie) => movie.title === title);
}

function stars(ratingOut10) {
  const out5 = Math.round(ratingOut10 / 2);
  return `${"★".repeat(out5)}${"☆".repeat(5 - out5)}`;
}

function formatRating(value) {
  return `⭐ ${value.toFixed(1)}/10`;
}

function updateProfileHeader() {
  const user = getCurrentUser();
  el.profileName.textContent = user?.name || "Guest";
}

function profileMenuHTML() {
  const user = getCurrentUser();
  if (!user) {
    return `
      <button data-profile-action="login">Login</button>
      <button data-profile-action="signup">Signup</button>
    `;
  }
  return `
    <div class="profile-head">
      <strong>${user.name || user.email}</strong>
      <small>${user.email}</small>
    </div>
    <button data-profile-action="profile">Profile</button>
    <button data-profile-action="logout">Logout</button>
  `;
}

function renderProfileMenu() {
  el.profileMenu.innerHTML = profileMenuHTML();
  updateProfileHeader();
}

function activateView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((node) => {
    node.classList.toggle("active", node.id === `view-${view}`);
  });
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
}

function incrementContinue(movieTitle, amount = 7) {
  const map = getContinueWatching();
  map[movieTitle] = Math.min(100, (map[movieTitle] || 0) + amount);
  setContinueWatching(map);
}

function pushRecent(movieTitle) {
  const list = getRecentlyViewed().filter((title) => title !== movieTitle);
  list.unshift(movieTitle);
  setRecentlyViewed(list);
}

function cardTemplate(movie, options = {}) {
  const inList = getWatchlist().includes(movie.title);
  const progress = getContinueWatching()[movie.title] || 0;
  return `
    <article class="movie-card" data-title="${movie.title}">
      <img loading="lazy" src="${movie.poster}" alt="${movie.title}" />
      <div class="movie-info">
        <h4>${movie.title}</h4>
        <p>${stars(movie.rating)} · ${movie.rating.toFixed(1)}</p>
      </div>
      ${
        options.showProgress
          ? `<div class="progress-wrap"><div class="progress-bar" style="width:${progress}%"></div></div>`
          : ""
      }
      <div class="movie-hover">
        <div class="hover-actions">
          <button class="mini-btn" data-action="play" data-title="${movie.title}">▶ Play Trailer</button>
          <button class="mini-btn" data-action="watchlist" data-title="${movie.title}">
            ${inList ? "− Watchlist" : "✚ Watchlist"}
          </button>
          <button class="mini-btn" data-action="rate" data-title="${movie.title}">⭐ Rate</button>
          <button class="mini-btn" data-action="like" data-title="${movie.title}">👍 Like</button>
          <button class="mini-btn" data-action="dislike" data-title="${movie.title}">👎 Dislike</button>
        </div>
        <div class="hover-preview" data-preview="${movie.title}"></div>
      </div>
    </article>
  `;
}

function rowTemplate(title, list, options = {}) {
  return `
    <section class="row-block">
      <div class="row-header"><h3>${title}</h3></div>
      <div class="row-track">
        ${list.length ? list.map((movie) => cardTemplate(movie, options)).join("") : `<p class="empty-text">No movies</p>`}
      </div>
    </section>
  `;
}

function byCategory(category) {
  return movies.filter((movie) => movie.category === category);
}

function byTag(tag) {
  return movies.filter((movie) => movie.tags.includes(tag));
}

function moodMatches(mood) {
  return movies.filter((movie) => movie.moods.includes(mood));
}

function top10() {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
}

function getSmartPicks() {
  const likes = getLikes();
  const likedTitles = Object.keys(likes).filter((title) => likes[title] === "like");
  const likedMovies = likedTitles.map(movieByTitle).filter(Boolean);
  if (!likedMovies.length) {
    return top10().slice(0, 8);
  }
  const preferredCategories = new Set(likedMovies.map((movie) => movie.category));
  const preferredMoods = new Set(likedMovies.flatMap((movie) => movie.moods));
  return movies
    .filter(
      (movie) =>
        !likedTitles.includes(movie.title) &&
        (preferredCategories.has(movie.category) || movie.moods.some((mood) => preferredMoods.has(mood)))
    )
    .slice(0, 8);
}

function getTopLiked() {
  const likes = getLikes();
  return Object.keys(likes)
    .filter((title) => likes[title] === "like")
    .map(movieByTitle)
    .filter(Boolean);
}

function renderTop10List() {
  el.top10List.innerHTML = top10()
    .map(
      (movie, index) => `
      <li>
        <span class="rank-no">${index + 1}</span>
        <span class="rank-title">${movie.title}</span>
      </li>
    `
    )
    .join("");
}

function renderHomeRows() {
  const continueMap = getContinueWatching();
  const continueItems = Object.keys(continueMap)
    .map(movieByTitle)
    .filter(Boolean);
  const recentItems = getRecentlyViewed().map(movieByTitle).filter(Boolean);
  const html = [
    rowTemplate("MCU Universe", byTag("MCU Universe").slice(0, 15)),
    rowTemplate("Bollywood Hits", byTag("Bollywood Hits").slice(0, 15)),
    rowTemplate("Hollywood Classics", byTag("Hollywood Classics").slice(0, 15)),
    rowTemplate("Action & Hype", byTag("Action & Hype").slice(0, 15)),
    rowTemplate("Mind-blowing Movies", byTag("Mind-blowing Movies").slice(0, 15)),
    rowTemplate("Continue Watching", continueItems, { showProgress: true }),
    rowTemplate("Recently Viewed", recentItems)
  ].join("");
  el.homeRows.innerHTML = html;
}

function renderCategoryViews() {
  el.marvelGrid.innerHTML = byCategory("Marvel").map((movie) => cardTemplate(movie)).join("");
  el.bollywoodGrid.innerHTML = byCategory("Bollywood").map((movie) => cardTemplate(movie)).join("");
  el.hollywoodGrid.innerHTML = byCategory("Hollywood").map((movie) => cardTemplate(movie)).join("");
}

function renderMyList() {
  const watchlist = getWatchlist().map(movieByTitle).filter(Boolean);
  el.myListGrid.innerHTML = watchlist.length
    ? watchlist.map((movie) => cardTemplate(movie)).join("")
    : `<p class="empty-text">Your watchlist is empty</p>`;
}

function renderSmartPanels() {
  const picks = getSmartPicks();
  const topLiked = getTopLiked();
  el.smartPicksGrid.innerHTML = picks.length
    ? picks.map((movie) => cardTemplate(movie)).join("")
    : `<p class="empty-text">Like a movie to unlock smart picks</p>`;
  el.topLikedGrid.innerHTML = topLiked.length
    ? topLiked.map((movie) => cardTemplate(movie)).join("")
    : `<p class="empty-text">No liked movies yet</p>`;
}

function renderMood(mood) {
  const matched = moodMatches(mood);
  el.moodResultsGrid.innerHTML = matched.length
    ? matched.map((movie) => cardTemplate(movie)).join("")
    : `<p class="empty-text">No mood matches found</p>`;
}

function renderAll() {
  renderTop10List();
  renderHomeRows();
  renderCategoryViews();
  renderMyList();
  renderSmartPanels();
  if (!el.moodResultsGrid.innerHTML.trim()) {
    renderMood("Action");
  }
}

function setupHero() {
  const spider =
    movieByTitle("Spider-Man: Far From Home") || movieByTitle("Spider-Man: Homecoming") || movies[0];
  state.heroMovie = spider;
  el.heroBackdrop.style.backgroundImage = `url(${spider.poster})`;
  el.heroTitle.textContent = spider.title;
  el.heroMeta.textContent = formatRating(spider.rating);
  el.heroOverview.textContent = spider.description;
  el.heroTrailerWrap.innerHTML = `
    <iframe
      title="Hero trailer"
      src="${spider.trailer}?autoplay=1&mute=1&controls=0&loop=1"
      allow="autoplay; encrypted-media; picture-in-picture"
    ></iframe>
  `;
  el.heroTrailerWrap.classList.add("show");
}

async function openTrailer(movieTitle) {
  const movie = movieByTitle(movieTitle);
  if (!movie) {
    return;
  }
  el.trailerFrame.src = `${movie.trailer}?autoplay=1`;
  openModal(el.trailerModal);
  incrementContinue(movie.title, 8);
}

function openMovieModal(movieTitle) {
  const movie = movieByTitle(movieTitle);
  if (!movie) {
    return;
  }
  pushRecent(movie.title);
  incrementContinue(movie.title, 4);
  const inList = getWatchlist().includes(movie.title);
  const selected = Number(getRatings()[movie.title] || 0);
  el.movieModalBody.innerHTML = `
    <div class="details-hero" style="background-image:url(${movie.poster})"></div>
    <div class="details-content">
      <img class="details-poster" src="${movie.poster}" alt="${movie.title}" />
      <div>
        <h2>${movie.title}</h2>
        <p class="details-meta">${formatRating(movie.rating)} • ${movie.category}</p>
        <p class="details-overview">${movie.description}</p>
        <div class="details-actions">
          <button class="primary-btn" data-action="play" data-title="${movie.title}">▶ Play</button>
          <button class="ghost-btn" data-action="watchlist" data-title="${movie.title}">
            ${inList ? "− Remove from Watchlist" : "✚ Add to Watchlist"}
          </button>
        </div>
        <div class="rating-inline">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) =>
                `<button class="rate-btn ${selected >= star ? "active" : ""}" data-rate-title="${movie.title}" data-rate="${star}">★</button>`
            )
            .join("")}
        </div>
        <div class="details-trailer">
          <iframe
            title="${movie.title} trailer"
            src="${movie.trailer}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  `;
  openModal(el.movieModal);
  renderAll();
}

function toggleWatchlist(movieTitle) {
  if (
    !ensureAuth(() => {
      toggleWatchlist(movieTitle);
    })
  ) {
    return;
  }
  const watchlist = getWatchlist();
  const inList = watchlist.includes(movieTitle);
  const next = inList ? watchlist.filter((title) => title !== movieTitle) : [...watchlist, movieTitle];
  setWatchlist(next);
  toast(inList ? "Removed from Watchlist" : "Added to Watchlist");
  renderAll();
}

function setLike(movieTitle, value) {
  if (
    !ensureAuth(() => {
      setLike(movieTitle, value);
    })
  ) {
    return;
  }
  const likes = getLikes();
  likes[movieTitle] = value;
  setLikes(likes);
  toast(value === "like" ? "Liked movie" : "Disliked movie");
  renderSmartPanels();
}

function setRating(movieTitle, rating) {
  if (
    !ensureAuth(() => {
      setRating(movieTitle, rating);
    })
  ) {
    return;
  }
  const ratings = getRatings();
  ratings[movieTitle] = rating;
  setRatings(ratings);
  toast("Rating saved");
  openMovieModal(movieTitle);
}

function switchAuthMode(mode) {
  state.authMode = mode;
  const signup = mode === "signup";
  el.authTitle.textContent = signup ? "Signup" : "Login";
  el.nameFieldWrap.classList.toggle("hidden", !signup);
  el.confirmFieldWrap.classList.toggle("hidden", !signup);
  el.authSubmitBtn.textContent = signup ? "Signup" : "Login";
  el.authSwitchBtn.textContent = signup ? "Already have an account? Login" : "Create account";
}

function handleAuth(event) {
  event.preventDefault();
  const users = getUsers();
  const email = el.authEmail.value.trim().toLowerCase();
  const password = el.authPassword.value;
  const name = el.authName.value.trim();
  const confirm = el.authConfirm.value;

  if (!email || !password) {
    toast("Please fill required fields");
    return;
  }

  if (state.authMode === "signup") {
    if (!name) {
      toast("Username required");
      return;
    }
    if (password.length < 6) {
      toast("Password should be at least 6 chars");
      return;
    }
    if (password !== confirm) {
      toast("Passwords do not match");
      return;
    }
    if (users.some((user) => user.email === email)) {
      toast("Email already registered");
      return;
    }
    const user = { id: crypto.randomUUID(), name, email, password };
    users.push(user);
    setUsers(users);
    setCurrentUser(user);
    toast("Signup successful");
  } else {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      toast("Invalid credentials");
      return;
    }
    setCurrentUser(user);
    toast("Login successful");
  }

  el.authForm.reset();
  closeModal(el.authModal);
  renderProfileMenu();
  renderAll();
  performPendingAction();
}

function searchMovies(term) {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return movies.filter((movie) => movie.title.toLowerCase().includes(normalized)).slice(0, 8);
}

function handleSearchInput() {
  const query = el.searchInput.value;
  const results = searchMovies(query);
  if (!query.trim()) {
    el.searchSuggestions.classList.remove("open");
    el.searchSuggestions.innerHTML = "";
    return;
  }
  if (!results.length) {
    el.searchSuggestions.innerHTML = `<p class="suggestion-empty">No results</p>`;
    el.searchSuggestions.classList.add("open");
    return;
  }
  el.searchSuggestions.innerHTML = results
    .map(
      (movie) => `
      <button class="suggestion-item" data-suggest-title="${movie.title}">
        <img src="${movie.poster}" alt="${movie.title}" />
        <div>
          <strong>${movie.title}</strong>
          <small>${formatRating(movie.rating)}</small>
        </div>
      </button>
    `
    )
    .join("");
  el.searchSuggestions.classList.add("open");
}

function queueSearch() {
  clearTimeout(state.searchTimer);
  state.searchTimer = setTimeout(handleSearchInput, 220);
}

function startHoverPreview(card) {
  const title = card.dataset.title;
  if (!title) {
    return;
  }
  clearTimeout(state.hoverTimers[title]);
  state.hoverTimers[title] = setTimeout(() => {
    const target = card.querySelector(`[data-preview="${title}"]`);
    const movie = movieByTitle(title);
    if (!target || !movie) {
      return;
    }
    target.innerHTML = `
      <iframe
        title="${movie.title} preview"
        src="${movie.trailer}?autoplay=1&mute=1&controls=0"
        allow="autoplay; encrypted-media"
      ></iframe>
    `;
    target.classList.add("show");
  }, 1000);
}

function stopHoverPreview(card) {
  const title = card.dataset.title;
  clearTimeout(state.hoverTimers[title]);
  const target = card.querySelector(`[data-preview="${title}"]`);
  if (target) {
    target.classList.remove("show");
    target.innerHTML = "";
  }
}

function onGlobalClick(event) {
  const tab = event.target.closest(".nav-tab");
  if (tab) {
    activateView(tab.dataset.view);
    el.navTabs.classList.remove("open");
  }

  const closeBtn = event.target.closest("[data-close-modal]");
  if (closeBtn) {
    closeModal(document.getElementById(closeBtn.dataset.closeModal));
  }
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }

  const profileAction = event.target.closest("[data-profile-action]");
  if (profileAction) {
    const action = profileAction.dataset.profileAction;
    if (action === "login" || action === "signup") {
      switchAuthMode(action === "signup" ? "signup" : "login");
      openModal(el.authModal);
    } else if (action === "logout") {
      setCurrentUser(null);
      toast("Logged out");
      renderProfileMenu();
      renderAll();
    } else if (action === "profile") {
      toast("Profile settings coming soon");
    }
    el.profileMenu.classList.remove("open");
  }

  const actionBtn = event.target.closest("[data-action]");
  if (actionBtn) {
    const title = actionBtn.dataset.title;
    const action = actionBtn.dataset.action;
    if (action === "play") {
      if (
        !ensureAuth(() => {
          openTrailer(title);
        })
      ) {
        return;
      }
      openTrailer(title);
    } else if (action === "watchlist") {
      toggleWatchlist(title);
    } else if (action === "like") {
      setLike(title, "like");
    } else if (action === "dislike") {
      setLike(title, "dislike");
    } else if (action === "rate") {
      openMovieModal(title);
    }
  }

  const rateBtn = event.target.closest("[data-rate-title]");
  if (rateBtn) {
    setRating(rateBtn.dataset.rateTitle, Number(rateBtn.dataset.rate));
  }

  const suggest = event.target.closest("[data-suggest-title]");
  if (suggest) {
    openMovieModal(suggest.dataset.suggestTitle);
    el.searchInput.value = "";
    el.searchSuggestions.classList.remove("open");
  }

  const card = event.target.closest(".movie-card");
  if (card && !event.target.closest(".hover-actions")) {
    openMovieModal(card.dataset.title);
  }

  const moodBtn = event.target.closest("[data-mood]");
  if (moodBtn) {
    el.moodButtons.forEach((button) => button.classList.remove("active"));
    moodBtn.classList.add("active");
    renderMood(moodBtn.dataset.mood);
  }

  if (!event.target.closest(".profile-wrap")) {
    el.profileMenu.classList.remove("open");
  }
  if (!event.target.closest(".search-wrap")) {
    el.searchSuggestions.classList.remove("open");
  }
}

function bindEvents() {
  document.addEventListener("click", onGlobalClick);
  document.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".movie-card");
    if (card) {
      startHoverPreview(card);
    }
  });
  document.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".movie-card");
    if (card && !card.contains(event.relatedTarget)) {
      stopHoverPreview(card);
    }
  });

  el.mobileNavBtn.addEventListener("click", () => {
    el.navTabs.classList.toggle("open");
  });

  el.profileBtn.addEventListener("click", () => {
    el.profileMenu.classList.toggle("open");
  });

  el.searchInput.addEventListener("input", queueSearch);
  el.quickPlayBtn.addEventListener("click", () => {
    const random = movies[Math.floor(Math.random() * movies.length)];
    if (
      !ensureAuth(() => {
        openTrailer(random.title);
      })
    ) {
      return;
    }
    openTrailer(random.title);
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    if (!state.heroMovie) {
      return;
    }
    if (
      !ensureAuth(() => {
        openTrailer(state.heroMovie.title);
      })
    ) {
      return;
    }
    openTrailer(state.heroMovie.title);
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    if (!state.heroMovie) {
      return;
    }
    toggleWatchlist(state.heroMovie.title);
  });

  el.authForm.addEventListener("submit", handleAuth);
  el.authSwitchBtn.addEventListener("click", () => {
    switchAuthMode(state.authMode === "login" ? "signup" : "login");
  });

  el.themeToggle.addEventListener("click", () => {
    const dark = document.body.dataset.theme !== "dark";
    document.body.dataset.theme = dark ? "dark" : "light";
    el.themeToggle.textContent = dark ? "🌙" : "☀️";
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    el.navbar.classList.toggle("scrolled", y > 10);
    el.scrollTopBtn.classList.toggle("show", y > 420);
    if (y > (state.lastScrollY || 0) && y > 170) {
      el.navbar.classList.add("hidden-up");
    } else {
      el.navbar.classList.remove("hidden-up");
    }
    state.lastScrollY = y;
  });

  el.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      event.preventDefault();
      el.searchInput.focus();
    } else if (event.key === "Escape") {
      closeModal(el.movieModal);
      closeModal(el.trailerModal);
      closeModal(el.authModal);
      el.searchSuggestions.classList.remove("open");
      el.profileMenu.classList.remove("open");
    }
  });
}

function renderSkeletons() {
  const skeletonRow = `
    <div class="skeleton-row">
      ${Array.from({ length: 8 })
        .map(() => `<div class="skeleton-card"></div>`)
        .join("")}
    </div>
  `;
  el.homeRows.innerHTML = skeletonRow + skeletonRow;
  el.marvelGrid.innerHTML = Array.from({ length: 8 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
  el.bollywoodGrid.innerHTML = el.marvelGrid.innerHTML;
  el.hollywoodGrid.innerHTML = el.marvelGrid.innerHTML;
  el.myListGrid.innerHTML = el.marvelGrid.innerHTML;
  el.smartPicksGrid.innerHTML = el.marvelGrid.innerHTML;
  el.topLikedGrid.innerHTML = el.marvelGrid.innerHTML;
  el.moodResultsGrid.innerHTML = el.marvelGrid.innerHTML;
}

function init() {
  el.yearText.textContent = String(new Date().getFullYear());
  renderProfileMenu();
  bindEvents();
  renderSkeletons();
  setTimeout(() => {
    setupHero();
    renderAll();
    el.moodButtons[0]?.classList.add("active");
  }, 450);
}

init();
