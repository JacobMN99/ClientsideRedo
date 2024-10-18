const API_URL = 'https://studentwebapi.buchwaldshave34.dk/api';

async function loadStudents() {
    try {
        const students = await getStudents();
        const studentList = document.getElementById('students');
        studentList.innerHTML = '';

        students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = `${student.studentName} ${student.studentLastName} ID: ${student.studentID}`;
            studentList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load students:', error);
    }
}

async function getStudents() {
    const response = await fetch(`${API_URL}/Student/GetStudents`);
    return await response.json();
}

document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const student = {
        studentName: document.getElementById('studentName').value,
        studentLastName: document.getElementById('studentLastName').value,
        team: { teamID: document.getElementById('teamID').value }
    };

    try {
        if (studentId) {
            await updateStudent(studentId, student);
            alert('Student opdateret!');
        } else {
            await createStudent(student);
            alert('Student oprettet!');
        }
        loadStudents(); 
    } catch (error) {
        console.error('Failed to save student:', error);
    }
});

async function createStudent(student) {
    const response = await fetch(`${API_URL}/Student/CreateStudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    if (!response.ok) {
        throw new Error('Failed to create student');
    }
}

async function updateStudent(id, updatedFields) {
    const response = await fetch(`${API_URL}/Student/UpdateStudent/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
    });
    if (!response.ok) {
        throw new Error('Failed to update student');
    }
}


async function loadCourses() {
    try {
        const courses = await getAllCourses();
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        
        courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.courseName} ID: ${course.courseID}`;
            courseList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load courses:', error);
    }
}

async function loadTeams() {
    try {
        const teams = await getTeams();
        const teamList = document.getElementById('teams-list');
        teamList.innerHTML = '';

        teams.forEach(team => {
            const li = document.createElement('li');
            li.textContent = `${team.teamName} ID: ${team.teamID}`;
            teamList.appendChild(li);
        })
    }
    catch(error)
    {

    }
}

async function loadStudentCourses() {
    const studentId = document.getElementById('studentIdForCourses').value;
    try {
        const courses = await getCoursesByStudent(studentId);
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        
        courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.course.courseName} ID: ${course.courseID}`;
            courseList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load student courses:', error);
    }
}

async function addCourse() {
    const studentId = document.getElementById('studentIdForCourses').value;
    const courseId = document.getElementById('courseId').value;
    try {
        await addCourseToStudent(studentId, [courseId]);
        alert('Kursus tilføjet til student!');
        loadStudentCourses(); 
    } catch (error) {
        console.error('Failed to add course:', error);
    }
}

async function deleteCourse() {
    const studentId = document.getElementById('studentIdForCourses').value;
    const courseId = document.getElementById('courseId').value;
    
    if (!studentId || !courseId) {
        alert('Angiv venligst både student ID og kursus ID.');
        return;
    }
    try {
        await deleteStudentCourses(studentId, [courseId]);
        alert('Kursus slettet fra student!');
        loadStudentCourses(); 
    } catch (error) {
        console.error('Failed to delete course:', error);
    }
}

async function getAllCourses() {
    const response = await fetch(`${API_URL}/Course/GetCourses`);
    return await response.json();
}
I
async function getCoursesByStudent(studentId) {
    const response = await fetch(`${API_URL}/StudentCourse/GetCoursesWithStudentID/${studentId}`);
    return await response.json();
}

async function addCourseToStudent(studentId, courseIds) {
    for (const courseId of courseIds) {
        const response = await fetch(`${API_URL}/StudentCourse/CreateStudentCourse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, courseId })
        });
        if (!response.ok) {
            throw new Error('Failed to add course');
        }
    }
}
async function deleteStudentCourses(studentId, courseIds) {
    for (const id of courseIds) {
        const response = await fetch(`${API_URL}/StudentCourse/DeleteStudentCourse/${studentId}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to delete course with id ${id}`);
        }
    }
}
async function deleteStudent() {
    const studentId = document.getElementById('studentId').value;
    try {
        await fetch(`${API_URL}/Student/DeleteStudent/${studentId}`, {
            method: 'DELETE'
        });;
        loadStudents(); 
    } catch (error) {
        console.error('Failed to delete student:', error);
    }
}

async function handleSaveStudent() {
    const studentId = document.getElementById('studentId').value;
    const student = {
        studentName: document.getElementById('studentName').value,
        studentLastName: document.getElementById('studentLastName').value,
        team: { teamID: document.getElementById('teamID').value } 
    };

    try {
        if (studentId) {

            await updateStudent(studentId, student);
           alert('Student opdateret!');
        } else {

            await createStudent(student);
            alert('Student oprettet!');
        }
        loadStudents(); 
    } catch (error) {
        console.error('Failed to save student:', error);
    }
}

async function getTeams() {
    const response = await fetch(`${API_URL}/Team/GetTeams`);
    return await response.json();
}

window.onload = function() {
    loadTeams(); 
    loadStudents(); 
    loadCourses();
    loadTeams
};
