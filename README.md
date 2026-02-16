# My_Profile

Osobní IT Profil 2.0 – Dynamický web s automatickým načítáním obsahu z JSON souboru.

## 🎯 Projekt

Moderní interaktivní webová stránka, která dynamicky načítá obsah z `profile.json` pomocí **Fetch API** a JavaScriptu.

## 📁 Struktura

```
/
├── index.html           # HTML se strukturou sekcí
├── style.css            # CSS styly (responsive design)
├── script.js            # Interaktivita (menu, scroll, animace)
├── app.js               # Dynamické načítání z JSON
├── profile.json         # Data profilu
└── README.md            # Dokumentace
```

## ✨ Klíčové Funkce

### Dynamické Obsah
- ✅ Jméno (dynamicky načteno)
- ✅ Dovednosti (seznam z JSON)
- ✅ Zájmy (grid vygenerovaný JS)
- ✅ Projekty (cards s linky)

### Technologie
- **Fetch API** – načítání `profile.json`
- **Promise + Error Handling** – `.then()`, `.catch()`
- **DOM Manipulation** – vytváření elements
- **Arrow Functions** – moderní JavaScript

## 📊 profile.json

```json
{
  "name": "Jakub Sokolovski",
  "skills": ["HTML", "CSS", "JavaScript", "Python", "Git", "Linux"],
  "interests": ["Web Development", "Jazyky", "Hudba", "Technologie"],
  "projects": [
    {
      "title": "Osobní web",
      "description": "Dynamický profil na GitHub Pages",
      "link": "https://..."
    }
  ]
}
```

## 🔧 Jak Funguje

1. HTML se načte s prázdnými placeholdery (`id="dynamic-skills"` atd.)
2. `app.js` se spustí po `DOMContentLoaded`
3. `loadProfile()` zavolá `fetch('profile.json')`
4. Data se zpracují a vykreslí do DOM
5. CSS styly se aplikují automaticky

### app.js Funkce

```javascript
loadProfile()              // Hlavní funkce - spuštění načítání
renderName(name)           // Vloží jméno
renderSkills(skills)       // Vykreslí seznam
renderInterests(interests) // Vykreslí zájmy
renderProjects(projects)   // Vykreslí projekty
```

## 🎨 Styling

- **Responsive Grid** – `repeat(auto-fit, minmax(...))`
- **Color Palette** – Modrá (#0066cc) + Tyrkysová (#00d9ff)
- **Animace** – Hover efekty, smooth transitions
- **Icons** – FontAwesome integrované

## 📝 Git Commits

Projekt vede Conventional Commits:

```
feat(data): add profile.json with skills, interests and projects
feat(js): create app.js with fetch and render functions
feat(ui): add dynamic content placeholders and load app.js
style(css): add styling for dynamic skills, projects and interests
docs: add comprehensive README with JSON structure
```

Minimálně 6 commitů s přehlednou historií.

## 🚀 Nasazení

- **Hosting**: GitHub Pages
- **Branch**: `main` (automatické deplojování)
- **Live**: https://sokol-it-spspb.github.io/My_Profile

## 💡 Naučené Koncepty

```javascript
// Fetch + Error Handling
const response = await fetch('profile.json')
const data = await response.json()

// DOM Elements Creation
const div = document.createElement('div')
const ul = document.createElement('ul')
ul.appendChild(li)
container.appendChild(ul)

// Array Methods
skills.forEach(skill => { /* ... */ })
const html = array.map(item => renderItem(item))

// CSS Classes z JS
element.classList.add('class-name')
```

## ✅ Splněné Požadavky

- [x] profile.json s komplexní strukturou
- [x] Fetch API pro načítání
- [x] Error handling (.catch)
- [x] DOM Manipulation (createElement, appendChild, textContent)
- [x] Dynamické vykreslení skills
- [x] Dynamické vykreslení interests
- [x] Dynamické vykreslení projects (bonus)
- [x] Conventional Commits (6+ commitů)
- [x] Git historie na GitHub

---

**Vytvořeno**: 2026 | **Autor**: Jakub Sokolovski | **Jazyk**: Czech
