const skillForm = document.getElementById("skillForm");
const skillNameInput = document.getElementById("skillName");
const targetHoursInput = document.getElementById("targetHours");
const skillsContainer = document.getElementById("skillsContainer");
const skillCount = document.getElementById("skillCount");

let skills = [];

function renderSkills() {

  skillsContainer.innerHTML = "";

  if (skills.length === 0) {
    skillsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No skills added yet ✨</h3>
        <p>Start your first learning journey!</p>
      </div>
    `;
  }

  skills.forEach((skill, index) => {

    const progressPercent =
      (skill.completedHours / skill.targetHours) * 100;

    const skillCard = document.createElement("div");
    skillCard.classList.add("skill-card");

    skillCard.innerHTML = `
      <h3>${skill.name}</h3>

      <p>
        ${skill.completedHours} / ${skill.targetHours} hours
      </p>

      <div class="progress-bar">
        <div
          class="progress-fill"
          style="width: ${progressPercent}%"
        ></div>
      </div>

      <div class="skill-actions">

        <input
          type="number"
          placeholder="Add hours"
          id="hours-${index}"
        />

        <button onclick="addHours(${index})">
          Add Progress
        </button>

        <button onclick="deleteSkill(${index})" class="delete-btn">
          Delete
        </button>

      </div>
    `;

    skillsContainer.appendChild(skillCard);
  });

  updateSkillCount();
}

function updateSkillCount() {
  skillCount.textContent =
    `${skills.length} Skill${skills.length !== 1 ? "s" : ""}`;
}

skillForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = skillNameInput.value.trim();
  const target = parseInt(targetHoursInput.value);

  if (name === "" || target <= 0) {
    alert("Please enter valid data.");
    return;
  }

  const newSkill = {
    name: name,
    targetHours: target,
    completedHours: 0
  };

  skills.push(newSkill);

  skillNameInput.value = "";
  targetHoursInput.value = "";

  renderSkills();
});

function addHours(index) {

  const input = document.getElementById(`hours-${index}`);
  const hours = parseInt(input.value);

  if (isNaN(hours) || hours <= 0) {
    alert("Enter valid hours.");
    return;
  }

  skills[index].completedHours += hours;

  if (
    skills[index].completedHours >
    skills[index].targetHours
  ) {
    skills[index].completedHours =
      skills[index].targetHours;
  }

  renderSkills();
}

function deleteSkill(index) {
  skills.splice(index, 1);
  renderSkills();
}

renderSkills();