import React from 'react';

import { ReactComponent as LinkedInIcon } from '../../assets/linkedin.svg';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import { ReactComponent as MailIcon } from '../../assets/envelope.svg';

const Contact = () => {
    return (
        <div>
            <div className='text-center mt-16 mb-8 text-4xl'>
                Lets Get in Touch!
            </div>
            <div className='flex justify-center'>
                <div className='flex'>
                    <a href="https://www.linkedin.com/in/alejandrommatamoros/" target="_blank" rel="noreferer" className='mx-3'>
                        <LinkedInIcon className='h-10 w-10'/>
                    </a>
                    <a href="https://github.com/AlexManuel1" target="_blank" rel="noreferer" className='mx-3'>
                        <GithubIcon className='h-10 w-10'/>
                    </a>
                    <a href="mailto:AlexMatamoros10@gmail.com" rel="noreferer" className='mx-3'>
                        <MailIcon className='h-10 w-10'/>
                    </a>
                </div>
            </div>
            <div className='mt-8 md:w-3/5 m-auto text-center'>
                Feel free to contact me using any of the above socials.
            </div>
        </div>
    );
};

export default Contact;