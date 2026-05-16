const skillForm = document.getElementById("skillForm");
const skillNameInput = document.getElementById("skillName");
const targetHoursInput = document.getElementById("targetHours");
const skillsContainer = document.getElementById("skillsContainer");
const skillCount = document.getElementById("skillCount");

let skills = [];

/* RENDER SKILLS */
function renderSkills() {

  skillsContainer.innerHTML = "";

  if (skills.length === 0) {
    skillsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No skills added yet ✨</h3>
        <p>Start your first learning journey!</p>
      </div>
    `;
    updateCount();
    return;
  }

  skills.forEach((skill, index) => {

    const percent = (skill.completed / skill.target) * 100;

    let historyHTML = "";

    if (skill.history.length === 0) {
      historyHTML = `
        <li class="history-item">
          <span>No history yet</span>
        </li>
      `;
    } else {
      skill.history.forEach(log => {
        historyHTML += `
          <li class="history-item">
            <span>+${log.hours} hrs</span>
            <small>${log.datetime}</small>
          </li>
        `;
      });
    }

    const card = document.createElement("div");
    card.classList.add("skill-card");

    card.innerHTML = `
      <h3>${skill.name}</h3>

      <p>${skill.completed} / ${skill.target} hours</p>

      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>

      <div class="skill-actions">

        <input type="number" id="hours-${index}" placeholder="Add hours"/>

        <button onclick="addHours(${index})">Add Progress</button>

        <button class="delete-btn" onclick="deleteSkill(${index})">
          Delete
        </button>

      </div>

      <div class="history">
        <h4>Hours History</h4>
        <ul class="history-list">
          ${historyHTML}
        </ul>
      </div>
    `;

    skillsContainer.appendChild(card);
  });

  updateCount();
}

/* UPDATE COUNT */
function updateCount() {
  skillCount.textContent =
    `${skills.length} Skill${skills.length !== 1 ? "s" : ""}`;
}

/* ADD SKILL */
skillForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = skillNameInput.value.trim();
  const target = parseInt(targetHoursInput.value);

  if (!name || target <= 0) {
    alert("Invalid input");
    return;
  }

  skills.push({
    name,
    target,
    completed: 0,
    history: []
  });

  skillNameInput.value = "";
  targetHoursInput.value = "";

  renderSkills();
});

/* ADD HOURS + HISTORY */
function addHours(index) {

  const input = document.getElementById(`hours-${index}`);
  const hours = parseInt(input.value);

  if (isNaN(hours) || hours <= 0) {
    alert("Enter valid hours");
    return;
  }

  const skill = skills[index];

  skill.completed += hours;

  if (skill.completed > skill.target) {
    skill.completed = skill.target;
  }

  const now = new Date();

  const datetime =
    now.toLocaleDateString() +
    " " +
    now.toLocaleTimeString();

  skill.history.push({
    hours,
    datetime
  });

  input.value = "";

  renderSkills();
}

/* DELETE SKILL */
function deleteSkill(index) {
  skills.splice(index, 1);
  renderSkills();
}

/* INIT */
renderSkills();