
import Link from 'next/link'
import classes from './fotter.module.css'
export default function Fotter(){
    return(
        <footer id="fotter" className={classes.fotter}>
            <hr />
            <p>@made with ❤️ Gcodes</p>
            <div>
                <div>
                    <h3>Important Links</h3>
                    <Link href="/">Home</Link>
                    <Link href="my-work">My Work</Link>
                    <a href='/#about-me'>About Me</a>
                </div>
                <div>
                    <h3>Social</h3>
                    <a href="https://github.com/THEMEGATRON76" target="_blank">Github</a>
                    <a href='https://www.instagram.com/rathoregeetansh/'target="_blank">Instagram</a>
                    <a href='https://www.linkedin.com/in/geetansh-rathore-078579140/' target="_blank">LinkedIn</a>
                </div>
                <div>
                    <h3>Other</h3>
                    <a href="">What I use</a>
                    <Link href="contact-me">Contact</Link>
                    <a href='/#recentProjects'>Recent projects</a>
                </div>
            </div>
        </footer>
    )
}