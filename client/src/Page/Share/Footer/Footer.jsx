import { useEffect, useState } from "react";

const Footer = () => {
    // set year as dynamic
    const [year, setYear] = useState(new Date().getFullYear())

    useEffect( () =>{
        setYear(new Date().getFullYear())
    },[])
    return (
        <footer>
            <div className="footer p-10 bg-neutral text-neutral-content">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>

            </div>
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright &copy; {`${year}`} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;