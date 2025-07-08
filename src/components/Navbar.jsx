import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
    <h1 className="text-xl font-bold">📸 SnapVerse</h1>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/upload" className="hover:underline">Upload</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </div>
  </nav>
);

export default Navbar;
