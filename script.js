document.addEventListener("DOMContentLoaded", () => {

    /* --- Custom Cursor --- */
    const cursor = document.querySelector(".cursor-glow");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener("mouseup", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    /* --- Loading Screen Logic --- */
    const loadingScreen = document.getElementById("loading-screen");
    const progressBar = document.getElementById("loading-progress");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + "%";
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                    startTypingAnimation();
                    animateSkillBars();
                }, 1000);
            }, 500);
        }
    }, 200);

    /* --- Typing Animation --- */
    const texts = ["Data Scientist", "Computer Engineer", "Backend Developer", "Playmaker"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById("typewriter");

    function startTypingAnimation() {
        if(!typewriterElement) return;

        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(startTypingAnimation, typeSpeed);
    }

    /* --- Skill Bars Animation trigger on scroll --- */
    function animateSkillBars() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0'; // reset
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    /* --- Vanilla Tilt Init --- */
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    /* --- Chart.js Radar Chart (Player Stats) --- */
    const ctx = document.getElementById('skillsRadarChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    "Python",
                    "Java",
                    "Django",
                    "Frontend Dev",
                    "Algorithms/DSA",
                    "GUI Dev"
                ],
                datasets: [{
                    label: 'Player Rating',
                    data: [80, 90, 100, 70, 60, 80],
                    backgroundColor: 'rgba(57, 255, 20, 0.45)',
                    borderColor: '#39ff14',
                    pointBackgroundColor: '#00f3ff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00f3ff',
                    borderWidth: 3,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                layout: {
                    padding: 0
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: '#e2e8f0',
                            font: { family: 'Orbitron', size: 12 }
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false,
                            stepSize: 20,
                            backdropColor: "transparent",
                            color: "rgba(255, 255, 255, 0.4)"
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    /* --- Modals Logic --- */
    const projectData = {
        "1": {
            title: "Planet Weight Calculator",
            tags: "Java Swing",
            imgClass: "bg-planet",
            desc: "An engaging desktop application built to simulate physics concepts across the solar system.",
            features: [
                "Object-oriented design implemented in Java",
                "Swing UI for interactive inputs",
                "Gravity physics algorithms",
                "Cross-platform execution"
            ],
            impact: "A solid demonstration of core CS concepts, math application, and UI design in native environments."
        },
        "2": {
            title: "Monastery 360",
            tags: "Django • Web Architecture",
            imgClass: "bg-monastery",
            desc: "An immersive cultural platform showcasing the beauty and discipline of monasteries.",
            features: [
                "Full-stack web application built on Django",
                "Advanced custom user authentication and profiles",
                "Interactive database schema for managing cultural artifacts",
                "Optimized SQL queries for fast content delivery"
            ],
            impact: "A highly praised interactive system that connected numerous users to cultural history through modern tech."
        },
        "3": {
            title: "To-Do List",
            tags: "Django",
            imgClass: "bg-todo",
            desc: "A smart, efficient task management system built to boost productivity and organization.",
            features: [
                "CRUD operations handling tasks and schedules",
                "Session-based user states",
                "Responsive front-end integrated with backend logic",
                "Real-time status updates"
            ],
            impact: "Demonstrated strong grasp of MVC architecture and backend routing mechanics."
        },
        "4": {
            title: "Plant Care System 🌱",
            tags: "IoT • Sensors • Python",
            imgClass: "bg-plant",
            desc: "An automated smart-environment project that monitors and maintains plant health using sensor data.",
            features: [
                "Integration with soil moisture and light sensors",
                "Automated watering logic via Python scripts",
                "Data visualization dashboard",
                "Low-latency hardware-software communication"
            ],
            impact: "Brought physical and digital worlds together, preventing the wilting of several indoor plants."
        }
    };

    const modalOverlay = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalContent");
    const modalClose = document.querySelector(".modal-close");
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project");
            const data = projectData[projectId];
            
            if(data) {
                // Generate HTML for modal in a split layout
                modalContent.innerHTML = `
                    <div class="modal-split">
                        <div class="modal-left ${data.imgClass}"></div>
                        <div class="modal-right">
                            <div class="modal-header">
                                <h2>${data.title}</h2>
                                <span class="tech-stack">${data.tags}</span>
                                <p class="modal-desc mt-4">${data.desc}</p>
                            </div>
                            
                            <div class="modal-tabs">
                                <button class="tab-btn active" data-tab="overview">Overview</button>
                                <button class="tab-btn" data-tab="features">Features</button>
                                <button class="tab-btn" data-tab="impact">Impact</button>
                            </div>
                            
                            <div class="tab-content active" id="tab-overview">
                                <p>${data.desc}</p>
                                <div style="margin-top:20px;">
                                    <a href="https://github.com/savoss-28" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View Repository</a>
                                </div>
                            </div>
                            
                            <div class="tab-content" id="tab-features">
                                <ul style="padding-left: 20px; line-height: 2;">
                                    ${data.features.map(f => `<li><span style="color:var(--neon-green);"><i class="fa-solid fa-check"></i></span> ${f}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="tab-content" id="tab-impact">
                                <p style="border-left: 3px solid var(--neon-blue); padding-left: 15px; font-style: italic;">
                                    "${data.impact}"
                                </p>
                            </div>
                        </div>
                    </div>
                `;

                // Add tab listeners
                const tabBtns = modalContent.querySelectorAll(".tab-btn");
                const tabContents = modalContent.querySelectorAll(".tab-content");

                tabBtns.forEach(btn => {
                    btn.addEventListener("click", () => {
                        // Remove active class
                        tabBtns.forEach(b => b.classList.remove("active"));
                        tabContents.forEach(c => c.classList.remove("active"));
                        
                        // Add active class to clicked
                        btn.classList.add("active");
                        modalContent.querySelector(`#tab-${btn.getAttribute("data-tab")}`).classList.add("active");
                    });
                });

                modalOverlay.classList.add("active");
            }
        });
    });

    modalClose.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });

    // Close on overlay click
    modalOverlay.addEventListener("click", (e) => {
        if(e.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });

    /* --- Simple Smooth Scroll highlighting (optional) --- */
    // Add logic for navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 10, 16, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 10, 16, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});
