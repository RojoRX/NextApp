import Link from 'next/link'

const Layout = ({ children }:any) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>© 2021 My Site</footer>
    </div>
  )
}

export default Layout
