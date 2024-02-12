import React from "react";
import Container from "./Container";
import { BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container fluid={true} extraclass=" hidden md:block border-t-[2px] border-b-[2px] py-4 my-5">
      <Container extraclass="py-4">
        <div className="md:grid  grid-cols-3 gap-5 px-4 md:px-3">
          <div>
            <div className="my-3">
              <img src="img/ishop.svg" alt="" />
            </div>
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever.Since the 1500s, when an unknown printer.
              </p>
            </div>
          </div>

          <div>
            <div className="fw-bold fs-5 my-3">Follow Us</div>
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been .
              </p>
            </div>
            <div className="flex gap-4 fs-4 mt-3">
              <div className="text-blue-800 cursor-pointer">
                <Link to={"/only-multi-file-upload"}><BiLogoFacebook /></Link>
              </div>
              <div className="text-blue-400 cursor-pointer">
                <Link to={"/multi-file-form"}><BiLogoTwitter /></Link>
              </div>
            </div>
          </div>

          <div>
            <div className="fw-bold fs-5 my-3">Contact Us</div>
            <div>
              <p>
                iShop: address @building 124 <br /> Call us now: 0123-456-789{" "}
                <br /> Email: support@whatever.com
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Bottom />
    </Container>
  );
}

export default Footer;

const Bottom = () => {

  return (
    <Container extraclass={'pt-4'}>
      <div className="grid grid-cols-3 p-4 md:p-0 lg:grid-cols-6 pt-4 md:pt-5 border-t-[2px] gap-5">
        <div>
          <div className="fw-bold">Information</div>
          <Footerul/>
        </div>
        <div>
          <div className="fw-bold">Service</div>
          <Footerul/>
        </div>
        <div>
          <div className="fw-bold">Extra</div>
          <Footerul/>
        </div>
        <div>
          <div className="fw-bold">My Account</div>
          <Footerul/>
        </div>
        <div>
          <div className="fw-bold">Useful Links</div>
          <Footerul/>
        </div>
        <div>
          <div className="fw-bold">Our Offers</div>
          <Footerul/>
        </div>
      </div>
    </Container>
  );
};

const Footerul = () => {
  return (
    <ul className="my-2">
      <li className="my-2">About US</li>
      <li className="my-2">Informatin</li>
      <li className="my-2">Privacy Policy</li>
      <li className="my-2">Term & Condition</li>
    </ul>
  );
};
