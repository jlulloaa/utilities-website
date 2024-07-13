import Card from './card';
import { ApiURL } from '../utils/tools';

const thisYear = new Date().getFullYear();
const header = <h3>ABOUT HUM</h3>;
const API_DOCS_URL = ApiURL + "/api-docs";

const title = <><a href="https://github.com/jlulloaa/utilities-website-frontend" target="_blank" rel="noreferrer">
    <button className="btn btn-warning">
    HUM on GitHub
    </button>
    </a><hr/>
    <h5>HUM</h5> 
    </>;
const about = <> 
    Fullstack single-page web application (SPA) to help manage your home utilities.
    <br/><br/>
    Web application under development
    <hr/>
    Frontend under development in <a href="https://reactjs.org" target="_blank" rel="noreferrer" >
            <img src="reactIcon.svg" alt='React Icon' height="16"></img>
        </a> React and styled with 
    <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
    <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bootstrap-5-logo-icon.png" alt='Bootstrap Icon' height="16"></img>
    </a>
    Bootstrap, using <a href="https://bootswatch.com" target="_blank" rel="noreferrer">
    <img src="https://bootswatch.com/_assets/img/logo-dark.svg" alt='Bootswatch Icon' height="16"></img>
    </a>
    Bootswatch theme's <a href="https://bootswatch.com/spacelab" target="_blank" rel="noreferrer" className="btn btn-primary" alt='SpaceLab Icon'>Spacelab</a>
    <hr/>
    Backend under development in <a href="https://nodejs.org/en" target="_blank" rel="noreferrer" ><img src="icons8-nodejs-64.png" alt='NodeJS Icon' height="24"></img></a>Node.js
    <br/>
    <a href={API_DOCS_URL} target="_blank" rel="noopener noreferrer">
        <button className="btn btn-primary"> 
            Click here to access the API documentation
        </button>
    </a>
    <hr/>
    </>;

const body = <>
    <a href="https://jlulloaa.github.io" target="_blank" rel="noreferrer" alt='GitHub Icon'><button className="btn btn-outline-success" data-bs-toggle="tooltip" data-bs-placement="left" title="Click to see my other projects" > &copy; {thisYear} Jose L. Ulloa <img src="./logo192.png" height="16" alt='iSANDEx Logo'></img></button></a>
    </>

function About() {
    return (
        <Card 
            bgcolor="primary"
            txtcolor="white"
            header={header}
            title={title}
            text={about}
            body = {body}
         />
    );
}

export default About;

