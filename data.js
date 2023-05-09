const data = {
  firstName: "Maria",
  lastName: "Smith",
  bio: "I am a software developer who loves to learn new technologies and build amazing applications.",
  birthDate: new Date("12-16-2004"),
  coverImage: "https://via.placeholder.com/1500x500",
  gender: "FemAle",
  posts: [
    {
      id: 1,
      title: "My first post edited",
      content: "this is my first post ever",
    },
    {
      id: 2,
      title: "React vs Vue",
      content:
        "Mauris non lacinia augue. Praesent euismod, dolor quis vulputate consequat, sapien lectus fringilla turpis, ac blandit justo quam eu enim.",
    },
    {
      id: 3,
      title: "My experience at the tech conference",
      content:
        "Praesent imperdiet urna ac velit condimentum, vel blandit eros malesuada. Proin vitae quam ipsum. Fusce blandit augue ac vehicula elementum.",
    },
  ],
};

export function fetchUserData() {
  return new Promise((resolve, reject) => {
    // Simulate a delay in fetching the user data with setTimeout
    setTimeout(() => {
      const userData = data;
      resolve(userData);
    }, 2000);
  });
}
