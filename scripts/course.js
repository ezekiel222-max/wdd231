const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 2, subject: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, subject: "WDD", completed: false },
  { code: "CSE110", name: "Intro to Programming", credits: 2, subject: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, subject: "CSE", completed: false }
];

const coursesContainer = document.getElementById("courses");
const totalCreditsSpan = document.getElementById("totalCredits");

function displayCourses(list) {
  coursesContainer.innerHTML = "";
  let totalCredits = 0;

  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
      <h3>${course.code}: ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
      <p>Status: <strong>${course.completed ? "Completed ✅" : "In Progress ⏳"}</strong></p>
    `;
    if (course.completed) {
      div.style.background = "#d4edda";
      div.style.border = "1px solid #155724";
    } else {
      div.style.background = "#f8d7da";
      div.style.border = "1px solid #721c24";
    }
    coursesContainer.appendChild(div);

    totalCredits += course.credits;
  });

  totalCreditsSpan.textContent = totalCredits;
}

// Event Listeners
document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));

// Default
displayCourses(courses);
