import Link from "next/link"
import { MdAddCard } from 'react-icons/md'

const Navbar = () => {
  return (
    <nav className="bg-emerald-400 p-4 rounded-t-md mt-2">
      <ul className="flex justify-between items-center text-white font-bold text-xl">
        <li>
          <Link href='/'>Todo</Link>
        </li>
        <li>
          <Link href='/new'>
            <MdAddCard size={24}/>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar