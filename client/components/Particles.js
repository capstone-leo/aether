import Particles from 'react-particles-js';
import React from 'react';

const BackgroundParticles = () => {
	return (
		<div>
			<Particles
				id='particles-js'
				params={{
					particles: {
						line_linked: {
							shadow: {
								enable: true,
								color: `${randomColor}`,
								blur: 1.5
							}
						},
						interactivity: {
							detect_on: 'canvas',
							events: {
								onhover: {
									enable: true,
									mode: 'grab'
								},
								resize: true
							},
							modes: {
								grab: {
									distance: 400,
									line_linked: {
										opacity: 1
									}
								}
							}
						},
						move: {
							enable: true,
							speed: 0.6,
							direction: 'bottom-left',
							random: false,
							straight: false,
							out_mode: 'bounce',
							bounce: false,
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200
							}
						},
						retina_detect: true
					}
				}}
			/>
		</div>
	);
};
// Helper Function
const randomColor = Math.floor(Math.random() * 16777215).toString(16);

export default BackgroundParticles;
