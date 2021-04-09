import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import { HomeButton } from '../Button/HomeButton';
import { CustomButton } from '../Button/Button';

import { ReturnButton } from '../Button/ReturButton';

import './NavBarContainer.scss';

const NavBarContainer = () => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div className="NavContainer">
			<Navbar color="faded" dark>
			<ReturnButton />
				<NavbarToggler onClick={toggleNavbar} className="mr-2" />
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<HomeButton />
						</NavItem>
						<NavItem>
							<CustomButton tag={Link} to="/controls" className="btn"><span>Controles</span></CustomButton>
						</NavItem>
						<NavItem>
						<CustomButton tag={Link} to="/rules" className="btn"><span>Regles</span></CustomButton>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBarContainer;
