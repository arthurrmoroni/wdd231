const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseList = document.querySelector('#course-list');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filters button');

function renderCourses(list) {
    courseList.innerHTML = list.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <span class="course-code">${course.subject} ${course.number}</span>
      <span class="course-title">${course.title}</span>
      <span class="course-credits">${course.credits} cr</span>
    </div>
  `).join('');

    creditTotal.textContent = list.reduce((total, course) => total + course.credits, 0);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        const subject = button.dataset.subject;
        const filtered = subject === 'all' ? courses : courses.filter(c => c.subject === subject);
        renderCourses(filtered);
    });
});

renderCourses(courses);