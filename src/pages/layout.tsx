import Link from 'next/link'

const Layout = ({ children }:any) => {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <Link className="navbar-brand col-lg-3 me-0 text-white fs-2" href="#">Blog Fundation</Link>
          
        </div>
      </div>
    </nav>
  )
}

export default Layout
