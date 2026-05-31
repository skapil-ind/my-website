import './App.css';
import myphoto from './assets/mypicbw.jpg';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const colors: string[] = [
      'rgba(77,182,172,0.25)',     // soft teal
      'rgba(124,77,255,0.25)',     // soft purple
      'rgba(148, 148, 148, 0.25)',   // soft white
      'rgba(51, 56, 133, 0.25)',     // soft blue
    ];
    let colorIndex = 0;

    // Explicitly casting types to tell TS these are HTML Elements (or null)
    const spotlight1 = document.getElementById('spotlight1') as HTMLElement | null;
    const spotlight2 = document.getElementById('spotlight2') as HTMLElement | null;
    let active: HTMLElement | null = spotlight1;

    // Explicitly typing 'e' as a native MouseEvent
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) { 
        [spotlight1, spotlight2].forEach(el => {
          if (el && el.dataset.color) {
            el.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, ${el.dataset.color} 0%, transparent 120px)`;
          }
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const colorInterval = setInterval(() => {
      // Robust null checks to keep TypeScript happy
      if (!spotlight1 || !spotlight2 || !active || window.innerWidth < 768) return;
      
      colorIndex = (colorIndex + 1) % colors.length;
      const next = active === spotlight1 ? spotlight2 : spotlight1;
      if (!next) return;

      const nextColor = colors[colorIndex];
      next.dataset.color = nextColor;
      
      const activeColor = active.dataset.color || '';
      if (active.style.background && activeColor) {
        next.style.background = active.style.background.replace(activeColor, nextColor);
      }

      active.classList.remove('active');
      active.classList.add('inactive');
      next.classList.remove('inactive');
      next.classList.add('active');

      active = next;
    }, 5000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 position-relative target-wrapper">
      <div id="spotlight1" className="spotlight active" data-color="rgba(77,182,172,0.25)"></div>
      <div id="spotlight2" className="spotlight inactive" data-color="rgba(255,64,129,0.25)"></div>
      
      {/* Navbar */}
      <nav className='navbar navbar-dark bg-dark py-3'>
        <div className='container px-4 px-md-5'>
          <a className='navbar-brand text-white nav-text' href="#home">
            <span className="navbar-title">Sukrit Kapil</span>
          </a>
        </div>
      </nav>

      {/* Main Content Body */}
      <div className='container px-4 px-md-5 py-5 flex-grow-1'>
        <div className='row g-4 g-lg-5'>

          {/* About & Core Professional Profile */}
          <div className='col-12 col-md-8 order-2 order-md-1'>
            <section className="mb-5">
              <h3>About Me</h3>
              <p>
                I work as a Software Engineer, working primarily with 
                <strong> .NET, MVC, React, and clean architecture</strong>. My focus has been on improving project 
                architectures using <strong>SOLID principles</strong>, ensuring codebases are maintainable, 
                modular, and scalable.
              </p>
              <p>
                I have a strong passion for <strong>Data Science</strong> as well. I’ve got the chance to work on projects 
                involving data preparation, agentic systems, and retrieval-augmented generation (RAG). 
                I am well-versed in <strong>Python</strong> and enjoy building intelligent, data-driven solutions.
              </p>
              <p>I have been actively involved in android development. An app I made during college days for tracking DSA preparation progress is live on Google Play with around 10k+ downloads. Check it out in the links!</p>
              <p><strong>The true purpose is to realize our real identity, make others realize theirs and I love technology because it's a great tool to be used for the same!</strong></p>
              <p>If you share similar interests or have any projects you'd like to collaborate on, feel free to reach out!</p>
            </section>

            <section className="mt-4 mt-md-5">
              <h3>Education & Career</h3>
              <div className="education-career">
                <div className="mb-4">
                  <span className="d-block fw-bold text-white">Computer Science @ BITS Pilani Hyderabad Campus</span>
                  <span className='text-dull text-small'>2018-2022</span>
                </div>
                <div>
                  <span className="d-block fw-bold text-white">Senior Software Engineer @ Micron Technology Inc.</span>
                  <span className='text-dull text-small'>2022-Current</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Top Showcase on Mobile Viewports */}
          <div className="col-12 col-md-4 order-1 order-md-2 d-flex flex-column align-items-center">
            <div className="profile-image mb-4">
              <img src={myphoto} alt="Sukrit Kapil" />
            </div>

            <div className="interests w-100 mb-4">
              <h3>Links</h3>
              <hr />
              <ul>
                <li><a href="https://github.com/skapil-ind" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/sukrit-kapil-b9b1172a9/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="mailto:skapil.ind@gmail.com">Email</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.dsa.final450&hl=en_IN" target="_blank" rel="noreferrer">DSA 450 Tracker</a></li>
              </ul>
            </div>

            <div className="interests w-100 mb-4">
              <h3>Interests & Goals</h3>
              <hr />
              <ul>
                <li>System design and architectures</li>
                <li>Advancing expertise in Data Science</li>
                <li>Working on complex and impactful problems</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Accessible High-Contrast Sticky Footer */}
      <footer className='text-center p-3 bg-dark text-white-50 mt-auto'>
        <small>© 2026 Sukrit Kapil | Built with React & Bootstrap</small>
      </footer>
    </div>
  );
}

export default App;