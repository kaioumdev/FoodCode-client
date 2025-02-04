const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto">

        {/* Footer Sections */}
        <div className="flex flex-col md:flex-row justify-between">

          {/* Contact Section */}
          <div className="bg-gray-800 p-6 w-full md:w-1/2 text-center">
            <h3 className="text-lg font-semibold">CONTACT US</h3>
            <p className="mt-2 text-gray-300">123 ABS Street, Unit 21, Bangladesh</p>
            <p className="text-gray-300">+88 123456789</p>
            <p className="text-gray-300">Mon - Fri: 08:00 - 22:00</p>
            <p className="text-gray-300">Sat - Sun: 10:00 - 23:00</p>
          </div>

          {/* Social Media Section */}
          <div className="bg-gray-700 p-6 w-full md:w-1/2 text-center">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <p className="mt-2 text-gray-300">Join us on social media</p>
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-gray-400 border-t border-gray-700 pt-4">
          <p>Copyright © CulinaryCloud. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;