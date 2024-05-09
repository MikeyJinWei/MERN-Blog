import Container from "./Container";
import Button from "./Button";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaBehanceSquare,
  FaDribbbleSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="left-0 right-0 border-t-[1px] border-borderSecondary/40">
      <Container className="my-0 py-6 md:py-9">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* About */}
          <ul className="col-span-1 flex flex-col gap-3 p-1">
            <h3 className="text-lg font-medium">About</h3>
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-500 transition-all duration-300 ease-in-out"
              >
                About this blog
              </Link>
            </li>
          </ul>

          {/* Legal */}
          <ul className="col-span-1 flex flex-col gap-3">
            <h3 className="text-lg font-medium">Legal</h3>
            <li>
              <Link
                to="https://github.com/MikeyJinWei?tab=repositories"
                className="hover:text-indigo-500 transition-all duration-300 ease-in-out"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/MikeyJinWei?tab=repositories"
                className="hover:text-indigo-500 transition-all duration-300 ease-in-out"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>

          {/* Contact */}
          <div className="col-span-3 md:col-span-1 flex flex-col gap-3">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="flex gap-3 md:gap-5 text-2xl">
              {/* GitHub */}
              <li>
                <Link
                  to="https://github.com/MikeyJinWei?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<FaGithub />}
                    className="py-0 px-0 xl:py-0 xl:px-0 hover:bg-transparent hover:text-neutral-400 hover:opacity-100 border-none"
                  />
                </Link>
              </li>

              {/* FB */}
              <li>
                <Link
                  to="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<FaFacebook />}
                    className="py-0 px-0 xl:py-0 xl:px-0 hover:text-blue-600 hover:bg-transparent hover:opacity-100 border-none"
                  />
                </Link>
              </li>

              {/* Dribbble */}
              <li>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<FaDribbbleSquare />}
                    className="py-0 px-0 xl:py-0 xl:px-0 hover:text-pink-400 hover:bg-transparent border-none"
                  />
                </Link>
              </li>

              {/* Behance */}
              <li>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<FaBehanceSquare />}
                    className="py-0 px-0 xl:py-0 xl:px-0 hover:text-blue-500 hover:bg-transparent border-none"
                  />
                </Link>
              </li>

              {/* Twitter */}
              <li>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<FaTwitter />}
                    className="py-0 px-0 xl:py-0 xl:px-0 hover:text-sky-300 hover:bg-transparent border-none"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* copyright */}
          <div className="col-span-3 text-center">
            <hr className="my-4 border-borderSecondary" />
            <Link to="/">
              <span>© {new Date().getFullYear()} Elements </span>
            </Link>
          </div>
          {/*  */}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
