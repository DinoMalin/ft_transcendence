import 'vite/modulepreload-polyfill';
import './style.css';
import { render } from 'preact';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';

import { Navbar } from './components/Navbar/Navbar.jsx';
import { Play } from './pages/Play/index.jsx';
import { Tournament } from './pages/Tournament/index.jsx';
import { Shop } from './pages/Shop/index.jsx';
import { Login } from './pages/Auth/Login.jsx';
import { NotFound } from './pages/_404.jsx';
import { BVAmbient } from './scripts/bvambient.js';
import { Profile } from './pages/Profile/index.jsx';
import { Signup } from './pages/Auth/Signup';
import { Pong } from './pages/Games/Pong';
import { Bonk } from './pages/Games/Bonk';
import { useEffect, useState } from 'preact/hooks';

export function App() {
	const [profile, setProfile] = useState(null);
		
	useEffect(() => {
		if (profile == null) {
			fetch("/api/me").then(res => res.json().then(data => {
				setProfile(data);
			}));
		}

		var particles = new BVAmbient({
			selector: "#ambient",
			fps: '60',
			max_transition_speed: 20000,
			min_transition_speed: 10000,
			particle_number: '100',
			particle_maxwidth: '30',
			particle_minwidth: '10',
			particle_radius: '50',
			particle_opacity: true,
			particle_colision_change: false,
			particle_background: "#331e4b",
		});
	}, []);

	return (
		<div id={navigator.userAgent.includes("Firefox") ? "" : "ambient"} className="w-screen h-full min-h-screen bg-gradient-to-br from-[#0D011D] to-black p-8 background-animate flex flex-col items-center overflow-hidden">
			<LocationProvider>
				<Navbar profile={profile} />
				<main className="w-screen h-full z-50 flex-1 flex flex-col justify-center items-center px-10">
					<Router>
						<Route path="/" component={Play} />
						<Route path="/login" component={Login} />
						<Route path="/tournament" component={Tournament} />
						<Route path="/shop" component={Shop} />
						<Route path="/profile" component={() => <Profile profile={profile} />} />
						<Route path="/signup" component={Signup} />
						<Route path="/pong" component={Pong} />
						<Route path="/bonk" component={Bonk} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</LocationProvider>
		</div>
	);
}

render(<App />, document.getElementById('app'));
