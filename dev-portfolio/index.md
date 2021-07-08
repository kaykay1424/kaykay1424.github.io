---
layout: default
---

<h2> About Me </h2>
<img id="about-me-img" src="images/kayla-on-beach.jpeg" alt="[image of Kayla on beach" > 
Traveling around the world to places, like South Korea and Costa Rica, as a military brat and a college student, I discovered my passion for learning foreign languages. However, it was not until the fall of 2016 when I decided to pursue a longtime interest in computer related fields that I discovered that passion extended to learning computer languages as well. After going through a few online Web Development lessons, I realized I really enjoyed being able to create programs using programming languages, like JavaScript, to do an infinite number of things and the challenge of solving problems to make those programs function. Since then I have continued to utilize online courses, like Free Code Camp and Codecademy, to learn Web Development skills and apply those skills by doing projects. I am currently looking for any opportunities in Front-end Development.

<hr>

<h2>Skills </h2>
<p class="subheader">Languages</p>
*   HTML5, CSS3, SCSS, JavaScript, PHP, SQL

<p class="subheader">Frameworks/Libraries</p>
*   Bootstrap, jQuery, React

<p class="subheader">Technologies</p>
*   Git, Github, AJAX, Slack, MySQL, Node.js, CSS Grid, Flexbox, MongoDB 

<hr>

<h2>Education/Certificates </h2>

<p class="subheader">CareerFoundry (2021)</p>
*   <a target="_blank" href="CareerFoundry_Certificate_Michaela Clements.pdf" >Intro to Frontend Development</a>

<p class="subheader">Testdome (2018)</p>
*   <a target="_blank" href="https://www.testdome.com/cert/1ed0272bf30840f1893133180c18f4c4">JavaScript and SQL Certificate</a>		
*   <a target="_blank"  href="https://www.testdome.com/cert/1a1ad583155e48cdb9a4217155acdad3">HTML/CSS, JavaScript, PHP, and SQL Certificate</a> 		
*   <a target="_blank" href="https://www.testdome.com/cert/44b6e14667074acbb144982f7c127542">HTML/CSS and Bootstrap Certificate</a>		
*   <a target="_blank"  href="https://www.testdome.com/cert/9d35e07389ce4657bf408f02a1676e04">JavaScript with jQuery Certificate</a>  

<p class="subheader">Freecodecamp (2016-2018)</p>
*   <a target="_blank" href="https://www.freecodecamp.org/certification/kaykay1424/javascript-algorithms-and-data-structures" >JavaScript Algorithms and Data Structures Certificate</a>
*   <a target="_blank" href="https://www.freecodecamp.org/certification/kaykay1424/responsive-web-design">Responsive Web Design Certificate </a>
*   <a target="_blank" href="https://www.freecodecamp.org/certification/kaykay1424/front-end-libraries">Frontend Libraries Certificate</a>
*   <a target="_blank" href="https://www.freecodecamp.org/certification/kaykay1424/apis-and-microservices">APIs and Microservices Certificate</a>
*   <a target="_blank"  href="https://www.freecodecamp.org/kaykay1424/front-end-certification">Frontend Certificate</a> 

<hr>

<h2>Projects </h2>

<div id="projects-section"></div>

<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-transition-group/dist/react-transition-group.js"></script>

  

<script type="text/babel">
    const {useState} = React;
    const {CSSTransition} = ReactTransitionGroup;
    const {TransitionGroup} = ReactTransitionGroup;
    const projectsInfo = [
        {
            title: 'JS Calculator',
            img: 'javascript-calculator.jpg',
            description: 'The JavaScript Calculator can solve operations involving multiplication, division, subtraction, and addition.',
            code_link: 'https://github.com/kaykay1424/js-calculator',
            project_link: 'https://kaykay1424.github.io/js-calculator/',
            frontend_skills: ['HTML','CSS','JavaScript','jQuery'],
            backend_skills: []
        },
        {
            title: 'Tic Tac Toe',
            img: 'tic-tac-toe.jpg',
            description: 'The Tic Tac Toe game lets users choose whether to play alone with the computer or play with someone else and whether to play as X or O. The player that gets 3 Xs or Os in a row wins. If all the squares are filled and no player has gotten 3 in a row, that results in a tie and the game will restart.',
            code_link: 'https://github.com/kaykay1424/tic-tac-toe',
            project_link: 'https://kaykay1424.github.io/tic-tac-toe/',
            frontend_skills: ['HTML','CSS','JavaScript','jQuery'],
            backend_skills: []
        },
        {
            title: 'Wikipedia Viewer',
            img: 'wikipedia-viewer.jpg',
            description: 'The Wikipedia Viewer allows users to search for a Wikipedia article and choose the amount of articles to be returned. Users can bookmark an article to read later or favorite an article, which will then be stored in the browser\'s local storage.',
            code_link: 'https://github.com/kaykay1424/wikipedia-viewer',
            project_link: 'https://kaykay1424.github.io/wikipedia-viewer',
            frontend_skills: ['HTML','CSS','Bootstrap','JavaScript','jQuery'],
            backend_skills: ['API']
        },        
        {
            title: 'Drum Machine',
            img: 'drum-machine.jpg',
            description: 'The Drum Machine lets users play various drum sounds by clicking on a drum pad or pressing a key on a keyboard that matches the letter of one of the drum pads.',
            code_link: 'https://github.com/kaykay1424/drum-machine',
            project_link: 'https://kaykay1424.github.io/drum-machine/',
            frontend_skills: ['CSS','JavaScript','React'],
            backend_skills: []
        },
        {
            title: 'Markdown Previewer',
            img: 'markdown-previewer.jpg',
            description: 'The Markdown Previewer allows users to type in some markdown and preview the output.',
            code_link: 'https://github.com/kaykay1424/markdown-previewer',
            project_link: 'https://kaykay1424.github.io/markdown-previewer/',
            frontend_skills: ['CSS','JavaScript','React'],
            backend_skills: []
        },
        {
            title: 'The Electronics Store',
            img: 'electronics-store.jpg',
            description: 'The Electronics Store is an example e-commerce site where users can add products, like TVs and cameras, to their shopping cart or wish list, search for products by name, price, discount, brand, or category, purchase products through Paypal, and contact the store. It also includes an admin panel to manage products and customers.',
            code_link: '',
            project_link: 'https://the-electronics-store.herokuapp.com/',
            frontend_skills: ['HTML','CSS','Bootstrap','JavaScript','jQuery'],
            backend_skills: ['SQL','MySQL','PostgreSQL','PHP']
        }
    ];

     let skills = [
        'HTML','CSS','Bootstrap','JavaScript','jQuery','React','SQL','MySQL','PostgreSQL','PHP','API'
    ];

    const ProjectFilters = ({addFilters,checkedFilters,projectFilters,clearAllFilters,selectAllFilters,skills}) => {
        return (
            <div className="project-filters">
                {skills.map((filter) => (
                    <div className="project-filter">{filter}
                        <input type="checkbox"
                        onChange={(e) => addFilters(e,filter)
                        }
                        checked={projectFilters.includes(filter) ? true : false}
                        /> 
                    </div>
                ))}
                <div>
                    <button id="select-all-filters-btn" onClick={selectAllFilters}>Select All</button>
                    <button id="clear-all-filters-btn"  onClick={clearAllFilters}>Clear All</button>
               </div>
            </div>
        )
    }

    const Project = ({project}) => {
        return (
            <div className="project">
                <p class="project-title">{project.title}</p>
                <p><img class="project-img" src={`images/${project.img}`}  alt={`image of ${project.title}`} />
                {project.description}
                </p>
                <p class="project-links"><a target="_blank" href={project.project_link} >View project</a>
                { project.code_link ? <> | <a target="_blank" href={project.code_link}>View code</a></>: null}</p> 
                {project.frontend_skills.map((skill) => (
                    <div class="label frontend-label  ">{skill}</div>
                ))}
                {project.backend_skills.map((skill) => (
                    <div class="label backend-label " > {skill} </div>
                ))}
            </div>
        )
    }

    class ProjectsSection extends React.Component {
        state = {
            checkedFilters: [],
            projectFilters: [],
            skills: [
                'HTML','CSS','Bootstrap','JavaScript','jQuery','React','SQL','MySQL','PostgreSQL','PHP','API'
            ]
        }

        addFilters = (e,filter) => {
            let filters = this.state.projectFilters;
            let checked = e.target.checked;
            if (checked) {
                filters.push(filter);
            } else {
                let index = filters.indexOf(filter);
                filters.splice(index,1);
            }
            this.setState({
                projectFilters: filters
            })             
        }

        clearAllFilters = () => {
            this.setState({
                projectFilters: []
            })
        }

        selectAllFilters = () => {
            let filters = skills
            this.setState({
                projectFilters: [
                    'HTML','CSS','Bootstrap','JavaScript','jQuery','React','SQL','MySQL','PostgreSQL','PHP','API'
                ]
            })           
        }

        render() {
                let projects = 
                <TransitionGroup component={null}>
                {projectsInfo.map((project,i) => {
                    if (this.state.projectFilters.length > 0 ) {
                    let showProject = false;
                    this.state.projectFilters.map((filter) => {                     
                        if (project.frontend_skills.includes(filter) || project.backend_skills.includes(filter))    {
                            showProject = true;
                        }
                    })
                    if (showProject) {                  
                      return <CSSTransition
                            key={i}
                            classNames="fade"
                            timeout={500}
                        >
                            <Project                
                                project={project} 
                            />
                        </CSSTransition>
                    } 
                    } else {
                        return <CSSTransition
                            key={i}
                            classNames="fade"
                            timeout={500}
                        >
                            <Project                
                                project={project} 
                            />
                        </CSSTransition>
                    }
                    
                })
                }
                </TransitionGroup>               
            return(
                <>
                <div className="project-filters-section">
                <p>Search projects by skill </p>
                <ProjectFilters 
                addFilters={this.addFilters}
                checkedFilters={this.state.checkedFilters}
                projectFilters={this.state.projectFilters}
                clearAllFilters={this.clearAllFilters}
                selectAllFilters={this.selectAllFilters}
                skills={skills} />
                </div>
                <div className="projects">
                    {projects}
                </div>
                </>
            )
        }
    }
    ReactDOM.render(<ProjectsSection />, document.getElementById('projects-section'))
</script>