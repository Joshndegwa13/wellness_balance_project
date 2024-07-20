// Event listener for form submission
document.getElementById('fitness-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the page from refreshing when sumitting the form 

    // Get the values of the selected goal and level
    const goal = document.getElementById('goal').value;
    const level = document.getElementById('level').value;
cd 
    // Fetch the workout plans from the JSON server raw data 
    fetch('https://db-pi-ten.vercel.app/workoutPlans')
        .then(response => response.json()) // Parse the JSON data from the response
        .then(data => {
            // Finding the workout plan that matches the selected goal and level
            const workoutPlan = data.find(plan => plan.goal === goal && plan.level === level);

            // Conditional statement for Displaying the workout plan or a message if no plan is found
            if (workoutPlan) {
                displayWorkoutPlan(workoutPlan);
            } else {
                displayNoWorkoutPlan();
            }
        })
        .catch(error => {
            console.error('Error fetching workout plans:', error);
            displayError();
        });
});

// Function to display the workout plan  includes template literals 
function displayWorkoutPlan(plan) {
    const workoutPlanSection = document.getElementById('workout-plan');
    workoutPlanSection.innerHTML = `
        <h3 class="text-2xl font-semibold mb-4">Your Workout Plan</h3>  
        <ul class="space-y-4">
            ${plan.exercises.map(exercise => `
                <li class="flex justify-between items-center">
                    <span>${exercise.name}</span>
                    <span>${exercise.sets} sets x ${exercise.reps}</span>
                </li>
            `).join('')}
        </ul>
    `;
}

// Function to display a message when no workout plan is found
function displayNoWorkoutPlan() {
    const workoutPlanSection = document.getElementById('workout-plan');
    workoutPlanSection.innerHTML = `
        <h3 class="text-2xl font-semibold mb-4">No Workout Plan Found</h3>
        <p>Please check your inputs and try again.</p>
    `;
}

// Function to display an error message when data from the json server has not been fetched 
function displayError() {
    const workoutPlanSection = document.getElementById('workout-plan');
    workoutPlanSection.innerHTML = `
        <h3 class="text-2xl font-semibold mb-4">Error</h3>
        <p>There was an error fetching the workout plan. Please try again later.</p>
    `;
}
