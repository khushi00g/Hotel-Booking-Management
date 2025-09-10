
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import contactImg from '../../imgs/contact.jpg';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';

const Contact = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            message: formData.get('message'),
        };
        console.log('Form submitted:', data);
        // Redirect to home page
        navigate('/about');
    };

    return (
        <div className='contactBody'>
            <section className='contactPage' style={{
                // backgroundImage: `url(${contactImg})`,
                backgroundSize: 'cover'
            }}>
                <div className='content'>
                    <h2 className='contact-us-hd'>Contact Us </h2>
                    <p className='contact-us-para'>Welcome to laxury hotel, where elegance meets convenience in the world of luxury hospitality. Our hotel booking management system is designed to offer seamless, efficient, and hassle-free reservations, ensuring that every guest enjoys a premium experience from booking to check-out. Whether you're traveling for leisure or business, our platform provides a user-friendly interface to explore and reserve exquisite rooms and suites tailored to your needs.</p>
                </div>

                <div className='mycontainer'>
                    <div className='contactInfo'>
                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-map-marker' aria-hidden="true"></i>
                            </div>
                            <div className='text'>
                                <h3>Address</h3>
                                <p>Nana Mauva Road , <br />9Square, laxury Hotel<br />55060</p>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-phone' aria-hidden="true"></i>
                            </div>
                            <div className='text'>
                                <h3>Phone</h3>
                                <p>998-877-6605</p>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-envelope-o' aria-hidden="true"></i>
                            </div>
                            <div className='text'>
                                <h3>Email</h3>
                                <p>laxuri506@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className='contactForm'>
                        <form onSubmit={handleSubmit}>
                            <h2>Send Message</h2>
                            <div className='inputBox'>
                                <input type="text" name="fullName" required="required" className="contact-input" />
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="text" name="email" required="required" className="contact-input" />
                                <span>Email</span>
                            </div>
                            <div className='inputBox'>
                                <textarea name="message" required="required" className="contact-input"></textarea>
                                <span>Type your message ....</span>
                            </div>
                            <div className='inputBox'>
                                <input type="submit" name="send" value="Send" className="contact-input" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <MyFooter />
            <MyCopyright />
        </div>
    );
}

export default Contact;
