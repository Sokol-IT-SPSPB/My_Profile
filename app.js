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
        
        // Validate profile data
        if (!validateProfile(profile)) {
            throw new Error('Neplatná struktura profilu. Zkontrolujte profile.json');
        }
        
        // Render profile data
        renderName(profile.name);
        renderSkills(profile.skills);
        renderInterests(profile.interests);
        renderProjects(profile.projects);
        
        console.log('✅ Profil úspěšně načten:', profile.name);
        
    } catch (error) {
        console.error('❌ Chyba při načítání profilu:', error);
        displayErrorMessage('Nepodařilo se načíst profil. Zkuste to později.');
    }
}

/**
 * Validate profile data structure
 * @param {Object} profile - Profile object to validate
 * @returns {boolean} True if valid profile structure
 */
function validateProfile(profile) {
    // Check required fields
    if (!profile || typeof profile !== 'object') return false;
    if (typeof profile.name !== 'string' || profile.name.trim() === '') return false;
    if (!Array.isArray(profile.skills) || profile.skills.length === 0) return false;
    
    // Check optional fields
    if (profile.interests && !Array.isArray(profile.interests)) return false;
    if (profile.projects && !Array.isArray(profile.projects)) return false;
    
    return true;
}

/**
 * Render name into heading
 * @param {string} name - Person's name
 */
function renderName(name) {
    const nameElement = document.querySelector('#profile-name');
    if (!nameElement) {
        console.warn('⚠️ Element #profile-name nebyl nalezen');
        return;
    }
    
    if (typeof name === 'string' && name.trim() !== '') {
        nameElement.textContent = name;
    } else {
        console.warn('⚠️ Neplatné jméno:', name);
        nameElement.textContent = 'Profil';
    }
}

/**
 * Render skills list dynamically
 * @param {Array} skills - Array of skill strings
 */
function renderSkills(skills) {
    const skillsContainer = document.querySelector('#dynamic-skills');
    
    if (!skillsContainer) {
        console.warn('⚠️ Element #dynamic-skills nebyl nalezen');
        return;
    }
    
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    if (!Array.isArray(skills) || skills.length === 0) {
        skillsContainer.innerHTML = '<p>Žádné dovednosti k dispozici.</p>';
        return;
    }
    
    try {
        // Create list
        const skillsList = document.createElement('ul');
        skillsList.className = 'dynamic-skills-list';
        
        skills
            .filter(skill => typeof skill === 'string' && skill.trim() !== '')
            .forEach(skill => {
                const listItem = document.createElement('li');
                listItem.textContent = skill.trim();
                listItem.className = 'skill-item';
                skillsList.appendChild(listItem);
            });
        
        if (skillsList.children.length === 0) {
            skillsContainer.innerHTML = '<p>Žádné platné dovednosti.</p>';
            return;
        }
        
        skillsContainer.appendChild(skillsList);
        console.log(`✅ Vykresleno ${skillsList.children.length} dovedností`);
        
    } catch (error) {
        console.error('❌ Chyba při vykreslování dovedností:', error);
        skillsContainer.innerHTML = '<p>Chyba při načítání dovedností</p>';
    }
}

/**
 * Render interests section dynamically
 * @param {Array} interests - Array of interest strings
 */
function renderInterests(interests) {
    const interestsContainer = document.querySelector('#dynamic-interests');
    
    if (!interestsContainer) {
        console.warn('⚠️ Element #dynamic-interests nebyl nalezen');
        return;
    }
    
    // Clear existing content
    interestsContainer.innerHTML = '';
    
    if (!Array.isArray(interests) || interests.length === 0) {
        interestsContainer.innerHTML = '<p>Žádné zájmy k dispozici.</p>';
        return;
    }
    
    try {
        const interestsGrid = document.createElement('div');
        interestsGrid.className = 'interests-grid';
        
        interests
            .filter(interest => typeof interest === 'string' && interest.trim() !== '')
            .forEach(interest => {
                const card = document.createElement('div');
                card.className = 'interest-card';
                
                const heading = document.createElement('h3');
                heading.textContent = interest.trim();
                
                card.appendChild(heading);
                interestsGrid.appendChild(card);
            });
        
        if (interestsGrid.children.length === 0) {
            interestsContainer.innerHTML = '<p>Žádné platné zájmy.</p>';
            return;
        }
        
        interestsContainer.appendChild(interestsGrid);
        console.log(`✅ Vykresleno ${interestsGrid.children.length} zájmů`);
        
    } catch (error) {
        console.error('❌ Chyba při vykreslování zájmů:', error);
        interestsContainer.innerHTML = '<p>Chyba při načítání zájmů</p>';
    }
}

/**
 * Render projects section dynamically
 * @param {Array} projects - Array of project objects with title, description, link
 */
function renderProjects(projects) {
    const projectsContainer = document.querySelector('#dynamic-projects');
    
    if (!projectsContainer) {
        console.warn('⚠️ Element #dynamic-projects nebyl nalezen');
        return;
    }
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    if (!Array.isArray(projects) || projects.length === 0) {
        projectsContainer.innerHTML = '<p>Žádné projekty k dispozici.</p>';
        return;
    }
    
    try {
        const projectsGrid = document.createElement('div');
        projectsGrid.className = 'projects-grid';
        
        projects
            .filter(project => isValidProject(project))
            .forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                const title = document.createElement('h3');
                title.textContent = project.title.trim();
                
                const description = document.createElement('p');
                description.textContent = project.description.trim();
                
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
        
        if (projectsGrid.children.length === 0) {
            projectsContainer.innerHTML = '<p>Žádné platné projekty.</p>';
            return;
        }
        
        projectsContainer.appendChild(projectsGrid);
        console.log(`✅ Vykresleno ${projectsGrid.children.length} projektů`);
        
    } catch (error) {
        console.error('❌ Chyba při vykreslování projektů:', error);
        projectsContainer.innerHTML = '<p>Chyba při načítání projektů</p>';
    }
}

/**
 * Validate project object structure
 * @param {Object} project - Project object to validate
 * @returns {boolean} True if valid project
 */
function isValidProject(project) {
    return project
        && typeof project === 'object'
        && typeof project.title === 'string'
        && project.title.trim() !== ''
        && typeof project.description === 'string'
        && project.description.trim() !== ''
        && typeof project.link === 'string'
        && project.link.trim() !== '';
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
    try {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
            font-weight: 500;
        `;
        
        const targetElement = document.querySelector('main') || document.body;
        targetElement.insertBefore(errorDiv, targetElement.firstChild);
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
        
    } catch (error) {
        console.error('❌ Chyba při zobrazení error zprávy:', error);
    }
}

// Load profile when DOM is ready
document.addEventListener('DOMContentLoaded', loadProfile);
