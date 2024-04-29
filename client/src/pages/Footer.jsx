import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsGithub, BsTwitter, BsLinkedin} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                sadar's
              </span>
              blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 Js Projects
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sadar's blog About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                   rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href='#'
                   rel="noopener noreferrer"
                >
                  Term &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/sadar786"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/%E2%9C%A8sadar-ullah-khan%E2%9C%A8-989713267/overlay/about-this-profile/'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Sadar's blog" year={new Date().getFullYear()}/>
      <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
        <Footer.Icon href="#" icon={BsFacebook}/>
        <Footer.Icon href="#" icon={BsGithub}/>
        <Footer.Icon href="#" icon={BsInstagram}/>
        <Footer.Icon href="#" icon={BsTwitter}/>
        <Footer.Icon href="#" icon={BsLinkedin}/>
      </div>
        </div>
      </div>
    </Footer>
  );
}
