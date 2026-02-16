// ============================================
// Dynamic Content Loading from profile.json
// ============================================

/**
 * Fetch and load profile data, then render it dynamically
 */
async function loadProfile() {
    try {
        // Fetch data from profile.json
        const response = await fetch('profile.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const profile = await response.json();
        
        // Render profile data
        renderName(profile.name);
        renderSkills(profile.skills);
        renderInterests(profile.interests);
        renderProjects(profile.projects);
        
    } catch (error) {
        console.error('Error loading profile:', error);
        displayErrorMessage('Nepodařilo se načíst profil. Zkuste to později.');
    }
}

/**
 * Render name into heading
 * @param {string} name - Person's name
 */
function renderName(name) {
    const nameElement = document.querySelector('#profile-name');
    if (nameElement) {
        nameElement.textContent = name;
    }
}

/**
 * Render skills list dynamically
 * @param {Array} skills - Array of skill strings
 */
function renderSkills(skills) {
    const skillsContainer = document.querySelector('#dynamic-skills');
    
    if (!skillsContainer) return;
    
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    if (!skills || skills.length === 0) {
        skillsContainer.innerHTML = '<p>Žádné dovednosti k dispozici.</p>';
        return;
    }
    
    // Create list
    const skillsList = document.createElement('ul');
    skillsList.className = 'dynamic-skills-list';
    
    skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.textContent = skill;
        listItem.className = 'skill-item';
        skillsList.appendChild(listItem);
    });
    
    skillsContainer.appendChild(skillsList);
}

/**
 * Render interests section dynamically
 * @param {Array} interests - Array of interest strings
 */
function renderInterests(interests) {
    const interestsContainer = document.querySelector('#dynamic-interests');
    
    if (!interestsContainer) return;
    
    // Clear existing content
    interestsContainer.innerHTML = '';
    
    if (!interests || interests.length === 0) {
        interestsContainer.innerHTML = '<p>Žádné zájmy k dispozici.</p>';
        return;
    }
    
    const interestsGrid = document.createElement('div');
    interestsGrid.className = 'interests-grid';
    
    interests.forEach(interest => {
        const card = document.createElement('div');
        card.className = 'interest-card';
        
        const heading = document.createElement('h3');
        heading.textContent = interest;
        
        card.appendChild(heading);
        interestsGrid.appendChild(card);
    });
    
    interestsContainer.appendChild(interestsGrid);
}

/**
 * Render projects section dynamically
 * @param {Array} projects - Array of project objects with title, description, link
 */
function renderProjects(projects) {
    const projectsContainer = document.querySelector('#dynamic-projects');
    
    if (!projectsContainer) return;
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p>Žádné projekty k dispozici.</p>';
        return;
    }
    
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const title = document.createElement('h3');
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.textContent = project.description;
        
        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = 'Zobrazit projekt';
        link.className = 'project-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        projectCard.appendChild(title);
        projectCard.appendChild(description);
        projectCard.appendChild(link);
        projectsGrid.appendChild(projectCard);
    });
    
    projectsContainer.appendChild(projectsGrid);
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
        padding: 1rem;
        border-radius: 4px;
        margin: 1rem 0;
    `;
    document.body.insertBefore(errorDiv, document.body.firstChild);
}

// Load profile when DOM is ready
document.addEventListener('DOMContentLoaded', loadProfile);
