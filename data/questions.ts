export type Question = {
  episode: number;
  question: string;
  options: string[];

  // 0 = A
  // 1 = B
  // 2 = C
  // 3 = D
  correctAnswer: number;

  birthdayTwist?: boolean;
};

export const questions = [
  {
    episode: 1,
    question: "What is Appu’s favorite food?",
    options: ["Pizza", "Biryani", "Burger", "Pasta"],
    correctAnswer: 1,
  },
  {
    episode: 2,
    question: "What is Appu’s dream vacation?",
    options: ["Paris", "Maldives", "Tokyo", "Dubai"],
    correctAnswer: 1,
  },
  {
    episode: 3,
    question: "What is Appu’s favorite color?",
    options: ["Blue", "Black", "Red", "Yellow"],
    correctAnswer: 0,
  },
  {
    episode: 4,
    question: "What does Appu love most?",
    options: ["Music", "Food", "Travel", "Sleep"],
    correctAnswer: 0,
  },
  {
    episode: 5,
    question: "Appu prefers?",
    options: ["Tea", "Coffee", "Juice", "Water"],
    correctAnswer: 1,
  },
  {
    episode: 6,
    question: "Favorite sport?",
    options: ["Cricket", "Football", "Tennis", "Badminton"],
    correctAnswer: 0,
  },
  {
    episode: 7,
    question: "Ideal weekend?",
    options: ["Home", "Party", "Trip", "Sleep"],
    correctAnswer: 2,
  },
  {
    episode: 8,
    question: "Favorite season?",
    options: ["Summer", "Winter", "Monsoon", "Spring"],
    correctAnswer: 1,
  },
  {
    episode: 9,
    question: "Best comfort food?",
    options: ["Ice cream", "Pizza", "Rice", "Burger"],
    correctAnswer: 1,
  },
  {
    episode: 10,
    question: "Favorite movie genre?",
    options: ["Action", "Romance", "Comedy", "Horror"],
    correctAnswer: 2,
  },
  {
    episode: 11,
    question: "Morning routine includes?",
    options: ["Gym", "Coffee", "Sleep", "Walk"],
    correctAnswer: 1,
  },
  {
    episode: 12,
    question: "Favorite travel mode?",
    options: ["Car", "Train", "Flight", "Bike"],
    correctAnswer: 2,
  },
  {
    episode: 13,
    question: "Dream city?",
    options: ["NYC", "London", "Paris", "Tokyo"],
    correctAnswer: 2,
  },
  {
    episode: 14,
    question: "Final question: Ready for surprise?",
    options: ["Yes", "No", "Maybe", "Surprise me"],
    correctAnswer: 0,
  },
];