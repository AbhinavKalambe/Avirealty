// ============================================================
// DATA STORE
// ============================================================
const PROJECTS = [
    {
        id: 'p1',
        name: 'Green Valley Urse',
        location: 'Urse, Pune',
        type: 'Premium NA Plots',
        price: 'Starting ₹25 Lacs',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Exclusive NA plots surrounded by lush greenery. Perfect for your dream farmhouse or weekend home. Excellent connectivity to the Mumbai-Pune Expressway.',
        features: ['Clear Title & PMRDA Approved', 'Internal Tar Roads', 'Water & Electricity Connection', '24/7 Security & Gated Community'],
        mapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p2',
        name: 'Sunrise Estate',
        location: 'Urali Kanchan',
        type: 'Agricultural Land',
        price: 'Starting ₹15 Lacs',
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Fertile agricultural land ideal for long-term investment, organic farming, or building a serene countryside retreat.',
        features: ['Rich Soil Quality', 'Proximity to Highway', 'High Appreciation Potential', 'Immediate Possession'],
        mapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p3',
        name: 'Nasarapur Hills',
        location: 'Degoan Nasarapur',
        type: 'Development Project',
        price: 'Starting ₹35 Lacs',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'A premium upcoming gated community offering scenic hill views and modern amenities woven into nature.',
        features: ['Clubhouse & Swimming Pool', 'Landscaped Gardens', 'Vastu Compliant Layouts', 'Clear Legal Titles'],
        mapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

// ============================================================
// HERO SLIDER  (Bug 2 fix: function defined and called here;
//               Bug 3 fix: interval saved so it can be restarted)
// ============================================================
let sliderInterval = null;

function initHeroSlider() {
    const slides = document.querySelectorAll('.slide-css');
    if (slides.length === 0) return;

    let currentSlide = 0;

    // Clear any existing timer before starting a new one (Bug 3 fix)
    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    document.getElementById('year-main').textContent    = new Date().getFullYear();
    document.getElementById('year-landing').textContent = new Date().getFullYear();

    renderHomeLocations();
    renderProjectsList();

    // Bug 2 fix: actually call initHeroSlider on page load
    initHeroSlider();
});

// ============================================================
// NAVIGATION & ROUTING
// ============================================================
function navigate(pageId, projectId = null) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (!targetPage) return;
    targetPage.classList.add('active');

    // Handle header/footer visibility (hide on landing page)
    const mainNav     = document.getElementById('main-nav');
    const mainFooter  = document.getElementById('main-footer');
    const landingHeader = document.getElementById('landing-header');
    const mainContent = document.getElementById('main-content');

    if (pageId === 'landing') {
        mainNav.classList.add('hidden');
        mainFooter.classList.add('hidden');
        landingHeader.classList.remove('hidden');
        mainContent.classList.remove('pt-[72px]');
    } else {
        mainNav.classList.remove('hidden');
        mainFooter.classList.remove('hidden');
        landingHeader.classList.add('hidden');
        mainContent.classList.add('pt-[72px]');
    }

    // Update active nav link styling
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.target === pageId) {
            link.classList.remove('text-stone-200', 'border-transparent');
            link.classList.add('text-amber-500', 'border-amber-500');
        } else {
            link.classList.remove('text-amber-500', 'border-amber-500');
            link.classList.add('text-stone-200', 'border-transparent');
        }
    });

    // Load project detail data if navigating to that page
    if (pageId === 'project-detail' && projectId) {
        loadProjectDetails(projectId);
    }

    // Bug 3 fix: restart slider when returning to home so images keep cycling
    if (pageId === 'home') {
        initHeroSlider();
    }

    window.scrollTo(0, 0);
    lucide.createIcons();
}

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================
function renderHomeLocations() {
    const container = document.getElementById('home-locations-grid');
    if (!container) return;

    const locations = ['Urse', 'Urali Kanchan', 'Degoan Nasarapur'];
    let html = '';

    locations.forEach((loc, i) => {
        html += `
        <div class="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer" onclick="navigate('projects')">
            <img src="${PROJECTS[i].image}" alt="${loc}" class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
                <h3 class="text-2xl font-bold text-white mb-2">${loc}</h3>
                <p class="text-amber-500 flex items-center font-semibold">
                    View Projects <i data-lucide="chevron-right" class="ml-1 w-4 h-4"></i>
                </p>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

function renderProjectsList() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    let html = '';

    PROJECTS.forEach(project => {
        html += `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-2xl transition-all group cursor-pointer"
             onclick="navigate('project-detail', '${project.id}')">
            <div class="relative h-64 overflow-hidden">
                <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4 bg-amber-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${project.type}
                </div>
            </div>
            <div class="p-8">
                <div class="flex items-center text-stone-500 text-sm mb-3">
                    <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> ${project.location}
                </div>
                <h3 class="text-2xl font-bold text-emerald-950 mb-3">${project.name}</h3>
                <p class="text-emerald-700 font-bold text-xl mb-6">${project.price}</p>
                <button class="w-full border-2 border-emerald-900 text-emerald-900 font-bold py-3 rounded-lg hover:bg-emerald-900 hover:text-white transition flex justify-center items-center">
                    View Details <i data-lucide="arrow-right" class="ml-2 w-4 h-4"></i>
                </button>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

function loadProjectDetails(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    document.getElementById('pd-image').src               = project.image;
    document.getElementById('pd-type').textContent        = project.type;
    document.getElementById('pd-title').textContent       = project.name;
    document.getElementById('pd-location').textContent    = project.location;
    document.getElementById('pd-desc').textContent        = project.description;
    document.getElementById('pd-price').textContent       = project.price;
    document.getElementById('pd-map').src                 = project.mapUrl;

    const featuresContainer = document.getElementById('pd-features');
    let featuresHtml = '';
    project.features.forEach(feat => {
        featuresHtml += `
        <div class="flex items-center p-4 bg-stone-50 rounded-lg border border-stone-100">
            <i data-lucide="check-circle-2" class="w-6 h-6 text-amber-500 mr-3 shrink-0"></i>
            <span class="font-semibold text-emerald-950">${feat}</span>
        </div>`;
    });
    featuresContainer.innerHTML = featuresHtml;
}

// ============================================================
// FORM HANDLING
// ============================================================
function handleFormSubmit(e, form) {
    e.preventDefault();
    const successDiv = form.nextElementSibling;

    form.classList.add('hidden');
    successDiv.classList.remove('hidden');

    // Reset form and hide success message after 4 seconds
    setTimeout(() => {
        form.reset();
        form.classList.remove('hidden');
        successDiv.classList.add('hidden');
    }, 4000);
}