import Link from "next/link";


export default ({currentUser}) => {

    const links = [
        !currentUser && {label: 'Sign up', href:"/auth/signup"},
        !currentUser && {label: 'Log in', href:"/auth/signin"},
        currentUser && {label: 'Log out', href:"/auth/signout"},
    ]
    .filter(linkConfig => linkConfig)
    .map(({label, href}) => {
        return (
            <li key={href} className="nav-item">
                <Link href={href}>
                    <a className="nav-link">{label}</a>
                </Link>
            </li>
        )
    });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand text-info" style={{marginLeft: "30px"}}><b>TicketHub</b></a>
            </Link>
            <div className="d-flex justify-content-end" style={{marginRight: "10px"}}>
                <ul className="nav d-flex align-items-center text-info">
                    {/* {currentUser ? 'Log out' : 'Log in'} */}
                    {links}
                </ul>
            </div>
        </nav>
    )
};